// pages/my/my.js
import {
  toSchool,getPosterTweet
} from "../../apis/apis.js"


var app = getApp();
import {
  getMyMessage,
  LectureSignIn,
  LectureSignOff,
  getUnStartLecture,
  adminScan
} from "../../apis/apis.js"

// const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const defaultAvatarUrl = 'https://img.js.design/assets/img/64103cd369f6462f6765456b.png#c46744fc3ea02ad7380287e40bad5db8'

Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 推文
    tweet:{
      link:"",
      pictureSrc:"",
      title:"",
    },

    "h": app.globalData.h, //胶囊高度
    "s": app.globalData.s, //状态栏高度
    'n': app.globalData.n, //导航栏高度
    tweetLink: "",
    userInfo: {},
    id:"",

    // 用户信息
    myMessage: {},

    // 微信头像
    avatarUrl: defaultAvatarUrl,
  },

  async getTweet(){
    let {data} =await getPosterTweet(1);
    let tweet={
      link:data.officialAccountUrl,
      pictureSrc:data.image,
      title:"",
    }
    this.setData({
      tweet:tweet
    })
  },
  

  // 获取用户微信头像
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
  },


  async useToSchool() {
    let data = {
      service: "https://gq.dgut.edu.cn/user/getUserInfo"
    }
    let res = await toSchool(data);
    this.setData({

    })
    console.log(this.data)
  },


  async useGetMyMessage() {
    let data = {}
    let res = await getMyMessage(data);
    console.log(res)
    this.setData({
      myMessage: res.data

    })
    console.log(this.data.myMessage)
  },
  async useGetUnStartLecture() {
    let res = await getUnStartLecture();
    console.log("最新讲座信息",res.data)
    this.setData({
      id:res.data.id
    })
    console.log(this.data.id)
  },
  scan() {
    console.log("____________",this.data.id)
    wx.scanCode({
      success: async (res) => {
        console.log(res)
        // const id = app.getId();
        // console.log(id);
        // console.log("----------")
        const id=this.data.id
        var path=res.result
        if(path.indexOf("in")!==-1){
          let result=await LectureSignIn(id);
          console.log(result.message)
          wx.showToast({title: result.message,icon:"none"})
        }else if(path.indexOf("out")!==-1){
          let result=await LectureSignOff(id);
          console.log(result)
          wx.showToast({title: result.message,icon:"none"})
        }else{
          let result=await adminScan(id,path)
          console.log(result)
          wx.showModal({
            title: '提示',
            content:result.message ,
            showCancel: false
          })
        }
        
      },
      fail: async (e) => {
        wx.showToast({
          title: '请重试',
          icon:'error'
        })
      }
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
        })
      }
    })
  },

  tapCenterCard(e) {
    if (e.currentTarget.dataset.cardnumber == 1) {
      wx.navigateTo({
        url: `/my/pages/PersonalQRcode/PersonalQRcode`,
      })
    }
    if (e.currentTarget.dataset.cardnumber == 2) {
      // this.useToSchool();

      // wx.navigateTo({
      //   url: '../../pages/schoolCentralCertification/schoolCentralCertification',
      // })


      // wx.request({
      //    url: 'https://webvpn.dgut.edu.cn/rump_frontend/connect/?target=https&id=https://gq.dgut.edu.cn/user/getUserInfo', 
      //   // url: 'https://webvpn.dgut.edu.cn/rump_frontend/connect',
      //   data: {
      //     // target: "https",
      //     // id: encodeURIComponent('https://gq.dgut.edu.cn/user/getUserInfo')
      //     // id:'https://gq.dgut.edu.cn/user/getUserInfo'
      //   },
      //   method: 'GET',
      //   header: {
      //     // 'Content-Type': 'application/json',
      //     'token': app.globalData.token
      //   },
      //   success(res) {
      //     console.log(res.data)
      //   }
      // })

      // 跳转投递简历页面
      wx.navigateTo({
        url: '/my/pages/resume/resume',
      })
    }
    if (e.currentTarget.dataset.cardnumber == 3) {
      wx.navigateTo({
        url: '/my/pages/ticket/ticket',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    // console.log(options.query)
    // const eventChannel = this.getOpenerEventChannel()
    // eventChannel.emit('acceptDataFromOpenedPage', {data: 'test'});
    // eventChannel.emit('someEvent', {data: 'test'});
    // // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    // eventChannel.on('acceptDataFromOpenerPage', function(data) {
    //   console.log(data)
    // })


    this.useGetMyMessage();
    this.getTweet(); 
    this.useGetUnStartLecture()
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
    this.useGetMyMessage();
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