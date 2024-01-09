// pages/schoolCentralCertification/schoolCentralCertification.js
import {
  getId
} from "../../apis/apis.js"
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: "",
    id:""
  },

  // 当导航成功时执行的方法
onNavigateSuccess: function(res) {
  console.log('导航成功', res)
},
// 当导航失败时执行的方法
onNavigateFail: function() {
  console.log('导航失败')
},

  msgHandler: function (e) { //(h5像小程序传递参数）
    console.log(e) //获取到来自也页面的数据
    console.log("111");
  },

  async useGetId() {
    let data = {
      token:this.data.token
    }
    let res = await getId(data);
    console.log(res)
    
    this.setData({
      id: res.data
    })
    console.log(this.data.id)

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    getApp().globalData.currentPage = this;

    this.setData({
      token: app.globalData.token
    })
    console.log("token", this.data.token)
    this.useGetId();
    
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