// my/pages/myMessage/myMessage.js
import {
  getMyCurriculumVitae
} from "../../../apis/apis.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myCurriculumVitae: {},
    isAdjust: "不接受",
    campus: "松山湖校区",
    isFile:"未上传",
  },

  async useGetMyCurriculumVitae() {
    let data = {}
    let res = await getMyCurriculumVitae(data);
    console.log(res.data)


    this.setData({
      myCurriculumVitae: res.data
    })
    console.log(this.data.myCurriculumVitae)
    if (res.data.isAdjust == 1) {
      this.setData({
        isAdjust: "接受"
      })
    }
    if (res.data.campus == 1) {
      this.setData({
        campus: "莞城校区"
      })
    }
    if (res.data.fileUrl !== "") {
      this.setData({
       isFile:"已上传"
      })
    }


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.useGetMyCurriculumVitae();
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