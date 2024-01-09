// home/pages/review/review.js
import {getAllLectureReview} from "../../../apis/apis.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pageSize: 10,
    lectures: []
  },
  
  // 未开发的警告
  warn() {
    wx.showModal({
      title: '提示',
      content: '该功能仍在开发中，敬请期待...',
      showCancel: false
    })
  },
  
  async useGetAllLectureReview() {
    let data = {
      page: this.data.page,
      pageSize: this.data.pageSize
    }
    let res = await getAllLectureReview(data);
    console.log(res)
    this.setData({
      lectures: res.data.list[0]
    })
    console.log(this.data.lectures)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.useGetAllLectureReview();
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