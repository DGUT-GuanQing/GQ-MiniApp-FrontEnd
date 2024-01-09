// app.js
//request请求promise化
// import { promisifyAll, promisify } from 'miniprogram-api-promise';
// // // 添加一个wx.p的属性，并将地址保存至wxp
// const wxp = wx.p = {}
// // 将wx 的属性转换成可以使用promise的属性 并保存到wxp中
// // 同时不会影响到 wx
// promisifyAll(wx,wxp)
App({
  onLaunch() {  
    //获取系统信息
    wx.getSystemInfo({
      success: res => {
        this.system = res
      }
    })
     //获取胶囊信息
     this.menu = wx.getMenuButtonBoundingClientRect()
    // 获取页面参数
    this.globalData.s= this.system.statusBarHeight //状态栏高度
    this.globalData.n= (this.menu.top - this.system.statusBarHeight) * 2 + this.menu.height, //导航栏高度
    this.globalData.h= this.menu.height //胶囊高度
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
  },
  async WXlogin(){
    var code=  await  this.getCode();
    var token=  await this.getToken(code);
    return token;
  },
  // 获取code
  // async getCode(){
  //   var res=  await wx.login({})
  //   await console.log("获取code成功",res)
  //   return res.code
  // },
  // // 获取token
  async getToken(code){
    wx.request({
      url:'https://historyhangqin.com:8085/user/wxLogin/'+code,
      method:'POST',
      data:{
      },
      success:(e)=>{
        this.globalData.token=e.data.data
        console.log("token :",e.data.data)
        wx.setStorage({
          key:'token',
          data:this.globalData.token
        })
      }
    })  
    return this.globalData.token;
  },

  getToken(){
     wx.login({
       success: (res)=>{
           wx.request({
              url:'https://historyhangqin.com:8085/user/wxLogin/'+res.code,
              method:'POST',
              data:{
              },
                success: (e)=>{
                this.globalData.token=e.data.data
                console.log("token :",e.data.data)
                wx.setStorage({
                  key:'token',
                  data:this.globalData.token
                })
                
              }
            })
      }
    }) 
  },

  // 定义一个方法用来设置全局数据
  setId: function (data) {
    this.globalData.id = data;
  },
  // 定义一个方法用来获取全局数据
  getId: function () {
    return this.globalData.id;
  },
  globalData: {
    id:"",
    token:"",
    s:0, //状态栏高度
    n:0, //导航栏高度
    h:0, //胶囊高度 
    userInfo: null,
    currentPage: null //用于中央认证跳转
  }
})
