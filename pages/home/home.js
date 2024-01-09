// pages/home/home.js
import {getToken,getPosterTweet,getUserlnfo} from "../../apis/apis.js"
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tweet:{
      link:"",
      pictureSrc:"",
      title:"",
    },

    id:1656468559078903809
  },

  warn() {
    wx.showModal({
      title: '提示',
      content: '该功能仍在开发中，敬请期待...',
      showCancel: false
    })
  },

  //临时，调用跳转中央认证api
  async usegetUserlnfo() {
    let data = {
      id: this.data.id,
    }
    let res = await getUserlnfo(data);
    console.log("临时，调用跳转中央认证api")
    console.log(res)
    
  },
  
 
ipt(){
  wx.request({
    url: 'https://auth.dgut.edu.cn/authserver/login?service=https://gq.dgut.edu.cn/user/getUserInfo?id=1663932191886893058',
    method:'GET',
    data:{
    //  id:"1656468559078903809"
    },
    header:{
      'content-type': 'application/x-www-form-urlencoded',
    },
      success : (res) => {
      console.log(res.data)
      console.log("临时，调用跳转中央认证")
      console.log(res)
      }
  })
},

  // 跳转到大咖页面
  gotoInfoMasterPage(){

      wx.navigateTo({

        url: '../../home/pages/masterPage/masterPage',
      })

  },

  // 中间预告、宣传片等按钮转跳
  intoFunction(e){
    var targetPage=e.currentTarget.dataset.functionid
    if(targetPage==1){
      wx.navigateTo({
        url: `/home/pages/apply/apply`,
      })
    }
    if(targetPage==2){
      wx.navigateTo({
        url: `/home/pages/forecast/forecast`,
      })
    }
    if(targetPage==3){
      wx.navigateTo({
        url: `/home/pages/tenSeconds/tenSeconds`,
      })
    }
    if(targetPage==4){
      wx.navigateTo({
        url: `/home/pages/review/review`,
      })
    }
  },
  async getTweet(){
    let {data} =await getPosterTweet(0);
    let tweet={
      link:data.officialAccountUrl,
      pictureSrc:data.image,
      title:"",
    }
    this.setData({
      tweet:tweet
    })
  },
  
  
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) { 
    let res= await getToken();
    console.log(res);
    this.getTweet(); 

    // this.usegetUserlnfo();
    // this.ipt();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})