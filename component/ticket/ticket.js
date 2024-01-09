// component/ticket/ticket.js
import {getPicture} from "../../apis/apis.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    guestName:String,
    image:String,
    lectureName:String,
    officialAccountUrl:String,
    term:Number,
    place:String,
    startTime:String,
    endTime:String,
    status:Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    pictureCode:"",
  },


  /**
   * 组件的方法列表
   */
  methods: {

    goTo(){
      wx.navigateTo({
        url: `/home/pages/page/page?url=${this.data.officialAccountUrl}&newTweetTitle=${this.data.lectureName}`,
      })
    },
    async useGetPicture(){
      let res= await getPicture(this.properties.image);
      // console.log(res);

      this.setData({
        pictureCode:wx.arrayBufferToBase64(res)
      })
      // console.log(this.data.pictureCode)

    }

  },
  
  lifetimes: {
    attached:  function() {
      this.useGetPicture();
      // 在组件实例进入页面节点树时执行
    }
}

})
