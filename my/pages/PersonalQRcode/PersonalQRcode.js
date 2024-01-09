// my/pages/PersonalQRcode/PersonalQRcode.js
var app = getApp();
import {
  getPersonalQRcode
} from "../../../apis/apis.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personalQRcode:""
  },
  // async getQRcode() {
  //   let res=await getPersonalQRcode();

  // },
  /**
   * 生命周期函数--监听页面加载
   */
  getQRcode() {
    wx.request({
      url: 'https://gq.dgut.edu.cn/user/myQRCode',
      header: {
        token: app.globalData.token
      },
      responseType: 'arraybuffer',
      success: (res) => {
        console.log(res);
        const base64 = wx.arrayBufferToBase64(res.data);
        const personalQRcode = 'data:image/jpeg;base64,' + base64;
        this.setData({
          personalQRcode: personalQRcode
        });
        console.log(personalQRcode);
      },
    });
  },
  onLoad(options) {
    console.log(app.globalData.token)
    this.getQRcode()
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