// my/pages/ticket/ticket.js
import {getMyLecture} from "../../../apis/apis.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pageSize: 10,
    lectures: [],
    lectures1: [],
    array:["全部" ,"未签到"," 已签到 "],
    objectArray: [
      {key:"1",value:"全部"},
      { key: "2", value: "未签到" },
      { key: "3", value: "已签到" },
    ],
    index:"0"
  },

  async useGetMyLecture() {
    let data = {
      page: this.data.page,
      pageSize: this.data.pageSize
    }
    let res = await getMyLecture(data);
    console.log(res)
    if (res.code==3002) {
      console.log("77777")
      wx.navigateTo({
        url:'../../../pages/schoolCentralCertification/schoolCentralCertification'
      })
      console.log("8888")
    }

    this.setData({
      lectures: res.data.list,
      lectures1:res.data.list
    })
    console.log(this.data.lectures)

    
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    const lectures=this.data.lectures1
    console.log(e.detail.value)
    if(e.detail.value=="1"){
      const filteredLectures = lectures.filter(lectures => lectures.status+1 == e.detail.value);
      console.log("000",filteredLectures)
      this.setData({
        index: e.detail.value,
        lectures:filteredLectures
      })
    }else if(e.detail.value=="0"){
      console.log("111")
      this.setData({
        index:e.detail.value,
        lectures:this.data.lectures1
      })
    }else{
      const filteredLectures = lectures.filter(lectures => lectures.status >= e.detail.value);
      console.log("111",filteredLectures)
      this.setData({
        index: e.detail.value,
        lectures:filteredLectures
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.useGetMyLecture();
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