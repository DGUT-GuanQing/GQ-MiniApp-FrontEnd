// component/forecast/forecast.js
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
    intoNewForecastLecture(){
      wx.navigateTo({
        url: `/home/pages/page/page?url=${this.data.officialAccountUrl}&newTweetTitle=${this.data.lectureName}`,
      })
    },
    async useGetPicture(){
      let res= await getPicture(this.properties.image);
      console.log(res);

      this.setData({
        pictureCode:wx.arrayBufferToBase64(res)
      })
      // console.log(this.data.pictureCode)

    }
    
  },

  observers: {
    // 监听 src 数据的变化
    'src,link,title': function(){
      this.get64Code();
    }
  },

  lifetimes: {
    attached:  function() {
      this.useGetPicture();


      // 在组件实例进入页面节点树时执行
    }
}


})

