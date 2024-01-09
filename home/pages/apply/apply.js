// home/pages/apply/apply.js

import {
  getUnStartLecture,
  getPicture,
  LectureRegistration
} from "../../../apis/apis.js"
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // imgUrl:'https://img.js.design/assets/img/6411170a43ac48c069efd7f1.jpg#b70dfde42734fbb0cdeb9a748b5ca707'
    //  imgUrl:''
    image: "",
    // link: "https://mp.weixin.qq.com/s/CrJqqpl50Xib9wXt3MxnFQ",
    // 推文
    tweet: {
      id:"",
      link: "", //推文链接
      imgUrl: "",
      title: "",

      introduction: "", //导语
      startTime: "", //讲座开始
      endTime: "",
      grabTicketsStart: "", //开始抢票
      grabTicketsEnd: "",

      
      
    },
    timeDifference:"",//剩余时间戳
    isButtonEnabled: false, // 按钮是否可用
    remainingTime: "", // 剩余时间
    timeTipsIsShow:true,//倒计时提示开关
    textButton:"未开始"
  },

  //点击查看推文
  handleClick() {

    wx.navigateTo({
      url: `/home/pages/page/page?url=${this.data.tweet.link}&newTweetTitle=${this.data.tweet.title}`,
    })

  },




  // 获取正在进行的讲座信息
  async useGetUnStartLecture() {
    let data = {}
    let res = await getUnStartLecture(data);
    console.log("当前讲座信息获取成功", res.data)

    this.setData({
      image: res.data.image
    })
    this.get64Code()

    let tweet = {
      link: res.data.officialAccountUrl,
      imgUrl: this.data.image,
      title: res.data.lectureName,

      introduction: res.data.introduction,
      startTime: res.data.startTime,
      endTime: res.data.endTime,
      grabTicketsStart: res.data.grabTicketsStart,
      grabTicketsEnd: res.data.grabTicketsEnd,
      id:res.data.id
    }
    this.setData({
      tweet: tweet
    })
    const app = getApp();
    app.setId(res.data.id);
    console.log(this.data.tweet.imgUrl)
    {
// function calculateTimeDifference(timestamp1, timestamp2) {
    //   // 计算时间戳差值（正负值）
    //   console.log(timestamp1,timestamp2)
    //   var timeDifference = timestamp2 - timestamp1;
      
    //   // 获取正负号
    //   var sign = timeDifference < 0 ? -1 : 1;
      
    //   // 取绝对值以确保计算的是正数差值
    //   timeDifference = Math.abs(timeDifference);
    //   // 计算天、小时、分钟和秒
    //   var seconds = Math.floor((timeDifference / 1000) % 60);
    //   var minutes = Math.floor((timeDifference / 1000 / 60) % 60);
    //   var hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    //   var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    //   // 构建结果字符串
    //   var result = (sign === -1 ? "-" : "") + days + " 天, " + hours + " 小时, " + minutes + " 分钟, " + seconds + " 秒";
    //   return result;
    // }
    // var timestamp1 = Date.now();
    // var dateString = tweet.startTime;
    // var timestamp2 = Date.parse(dateString);
    // var timeDifference = calculateTimeDifference(timestamp1, timestamp2);
    // console.log("111"+timeDifference)
    }
    
  },
  // 计算剩余时间并更新页面
  calculateTime: function () {
    // var start="2023-09-12 20:46:10";
    // var end="2023-09-12 21:57:39"
    var startTime = new Date(this.data.tweet.grabTicketsStart).getTime();
    var endTime = new Date(this.data.tweet.grabTicketsEnd).getTime();
    //     var startTime = new Date(start).getTime();
    // var endTime = new Date(end).getTime();
    var currentTime = new Date().getTime();

    if (currentTime >= startTime && currentTime <= endTime) {
      // 当前时间在开始时间和结束时间区间内
      this.setData({
        isButtonEnabled: true, // 允许按钮按下
        timeTipsIsShow:false,
        textButton:"报名讲座"
      });
    } else if(currentTime<startTime){
      // 当前时间不在区间内
      var timeDifference=currentTime-startTime
      this.setData({
        isButtonEnabled: false, // 禁用按钮
        timeDifference:timeDifference,
        timeTipsIsShow:true,
        textButton:"未开始"
      });
      // textColor.node.style.backgroundColor = '#878787'; 
    }else{
      this.setData({
        isButtonEnabled: false, // 禁用按钮
        timeTipsIsShow:true,
        timeDifference:1,
        textButton:"已结束",
      });
    }

    var seconds = Math.floor((timeDifference / 1000) % 60)+1;
    var minutes = Math.floor((timeDifference / 1000 / 60) % 60)+1;
    var hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24)+1;
    var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))+1;
    var remainingTime = Math.abs(days) + " 天 " + Math.abs(hours) + " 小时 " + Math.abs(minutes) + " 分钟 " + Math.abs(seconds) + " 秒";
    this.setData({
      remainingTime: remainingTime,
    });
    // 设置定时器，每隔一秒钟重新计算一次时间
    setTimeout(this.calculateTime, 1000);
  },
  // 按钮点击事件
   onButtonClicked: async function () {
    console.log(this.data.timeDifference)
    console.log(this.data.remainingTime)
    if (this.data.isButtonEnabled) {
      // 执行按钮点击后的操作
      const id = app.getId();
      let data={};
      let result=await LectureRegistration(id,data);
      console.log(result)
      console.log("------")
      if(result.code==200){
        wx.showModal({
          title: '提示',
          content: result.message,
          showCancel: false
        });
      }
      else{
        wx.showModal({
          title: '提示',
          content: result.message,
          showCancel: false
        });
      }
    }else if(this.data.isButtonEnabled==false&&this.data.timeDifference<0){
      wx.showModal({
        title: '提示',
        content: "时间未到",
        showCancel: false
      });
    } else {
      wx.showModal({
        title: '提示',
        content: "时间已过",
        showCancel: false
      });
    }
  },
  //转化图片
  async get64Code() {
    // console.log("转换图片")
    // console.log("early src is ",this.data.image)
    let res = await getPicture(this.data.image);
    // console.log("res is",res);
    this.setData({
      image: wx.arrayBufferToBase64(res)
    })

    // console.log("转换結果",this.data.image)
  },
  methods: {


    //点击图片放大事件  
    clickImg: function (e) {
      console.log(e);
      var imgUrl = this.data.imgUrl;
      var current = e.currentTarget.dataset.src;
      wx.previewImage({
        urls: [imgUrl], //需要预览的图片http链接列表，注意是数组
        current: current, // 当前显示图片的http链接，默认是第一个
      })
    },
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("页面加载测试1")
    this.useGetUnStartLecture();
    this.calculateTime();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    console.log("页面加载测试3")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log("页面加载测试2")
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

})