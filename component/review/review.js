// component/review/review.js
import {getPicture} from "../../apis/apis.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    guestName:String,
    reviewName:String,
    reviewUrl:String,
    term:Number,
    status:Number,
    reviewOfficialAccountUrl:String
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

    intoNewReviewLecture(){
      wx.navigateTo({
        url: `/home/pages/page/page?url=${this.data.reviewOfficialAccountUrl}&newTweetTitle=${this.data.reviewName}`,
      })
    },

    goTo(){
      wx.navigateTo({
        url: `/home/pages/page/page?url=${this.data.link}&newTweetTitle=${this.data.title}`,
      })
    },
    async useGetPicture(){
      let res= await getPicture(this.properties.reviewUrl);
      console.log(res);

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
