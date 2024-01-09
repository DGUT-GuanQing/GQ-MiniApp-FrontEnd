// component/tweet/tweet.js
import {getPicture} from "../../apis/apis.js"
Component({
  /**
   * 组件的属性列表
   */
  /**
   * 组件的初始数据
   */
  data: {
    "pictureCode":"",
  },
  properties: {
    src:String,
    link:String,
    title:String
  },
  

  /**
   * 组件的方法列表
   */
  methods: {
    async get64Code(){
      console.log("early src is ",this.properties)
      let res =await getPicture(this.data.src);
      console.log("res is",res);
      this.setData({
        pictureCode:wx.arrayBufferToBase64(res)
      })
    },
    intoNewTweet(){
      wx.navigateTo({
        url: `/home/pages/page/page?url=${this.data.link}&newTweetTitle=${this.data.title}`,
      })
    },
  },
  observers: {
    // 监听 src 数据的变化
    'src,link,title': function(){
      this.get64Code();
    }
  },


  // lifetimes: {
  //   attached:  function() {
  //     this.get64Code();
  //     // 在组件实例进入页面节点树时执行
  //   },
  //   ready: function() {
  //     this.get64Code();
  //     // 在组件实例进入页面节点树时执行
  //   },
  // },

  pageLifetimes: {
    show:  function() {
      // this.get64Code();
      // 页面被展示
      // const that =this;
      // setTimeout(function(){
      //   that.get64Code();
      // },1000)
    },
  },

})
