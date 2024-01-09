// pages/introduce/introduce.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:["莞青介绍","部门介绍","莞青说"],
    link:["https://mp.weixin.qq.com/s/h5cLGt2X8jJewCY-lPPzyQ",
    "https://mp.weixin.qq.com/s/f_lsV-2X8mi5vCA_Lt2ciQ",
    "https://mp.weixin.qq.com/mp/homepage?__biz=MjM5MzY1OTgyMA==&hid=3&sn=50984b84fc387b5063cbf001cb72b4b9&scene=18"
  ]

  },
  intoTweet(e){
    if(e.currentTarget.dataset.tweetname=="introduction"){
      wx.navigateTo({
        url: `/pages/webView/webView?url=${encodeURIComponent(JSON.stringify(this.data.link[0]))}&newTweetTitle=${this.data.title[0]}`
      })
    }
    if(e.currentTarget.dataset.tweetname=="department"){
      wx.navigateTo({
        url: `/pages/webView/webView?url=${encodeURIComponent(JSON.stringify(this.data.link[1]))}&newTweetTitle=${this.data.title[1]}`
      })
    }
    if(e.currentTarget.dataset.tweetname=="speak"){
      wx.navigateTo({
        url: `/pages/webView/webView?url=${encodeURIComponent(JSON.stringify(this.data.link[2]))}&newTweetTitle=${this.data.title[2]}`
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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