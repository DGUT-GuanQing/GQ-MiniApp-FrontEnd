// 3.api.js 我们所使用接口的业务封装
// 引入封装请求
const app = getApp();
const {
  request,
  requestPOST
} = require('./request')


// 基于业务封装
module.exports = {
  // getToken:()=>{
  //   return request("user/wxLogin/","GET",data,false);
  // },

  // 获取正在进行的讲座信息
  getUnStartLecture: (data) => {
    return request("lecture/unStartLecture", "GET", data, false);
  },
  
  // 零时：

  getUserlnfo: (data) => {
    return request("user/getUserInfo", "GET", data, false);
  },
  

  // 获取我的简历
  getMyCurriculumVitae: (data) => {
    return request("recruitment/getMyCurriculumVitae", "POST", data, false);
  },

  // 获取用户id
  getId: (data) => {
    return request("user/getId", "GET", data, false);
   
  },

  // 上传或修改简历
  updateSaveCurriculumVitae: (data) => {
    return request("recruitment/updateSaveCurriculumVitae", "POST", data, false);
  },

  // 获取职位信息
  getPosition: (data) => {
    return requestPOST("recruitment/getPosition", "POST", data, false);
  },
  // 获取部门信息
  getDepartment: (data) => {
    return requestPOST("recruitment/getDepartment", "POST", data, false);
  },


  // 上传文件
  uploadFile: (data) => {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        // url: 'https://historyhangqin.com:8085/common/upload',
        url: 'https://gq.dgut.edu.cn/common/upload',
        filePath: data.url,
        name: 'file',
        // 用户未登录，加个token
        header: {
          'token': app.globalData.token,
        },
        // formData: {
        //   user: 'test'
        // },
        //成功回调
        success: (res) => {
          //成功抛出（无论成功失败都抛出，不对其本身做处理）
          console.log("token is ", app.globalData.token);
          console.log("上传文件结果", res)
          resolve(res.data)
        },
        //失败回调
        fail: () => {
          //失败抛出
          reject("请求失败")
        },
      })
    })
  },



  // 获取个人信息（投递简历页面）
  getMyMessage: (data) => {
    return request("user/me", "GET", data, false);
  },

  // 获取讲座回顾
  getAllLectureReview: (data) => {
    return request("lecture/allLectureReview", "GET", data, false);
  },

  // 获取我参加的讲座的信息（用于订票信息）
  getMyLecture: (data) => {
    return request("user/myLecture", "GET", data, false);
  },

  getAllLectureTrailer: (data) => {
    return request("lecture/allLectureTrailer", "GET", data, false);
  },

  // 获取首页/招新推文信息
  getPosterTweet: (type) => {
    return request("common/posterTweet/" + type, "GET", false);
  },

  // 下载图片
  getPicture: (src) => {
    console.log("src is ", src);
    return new Promise((resolve, reject) => {
      wx.request({
        // url: 'https://historyhangqin.com:8085/common/download',
        url: 'https://gq.dgut.edu.cn/common/download',
        
        method: "GET",
        data: {
          name: src,
          type: 0
        },
        header: {
          'token': app.globalData.token
        },
        responseType: 'arraybuffer',
        //成功回调
        success: (res) => {
          //成功抛出
          console.log("请求图片结果", res)
          resolve(res.data)
        },
        //失败回调
        fail: () => {
          //失败抛出
          reject("请求失败")
        },
      })
    })
  },

  //获取token
  getToken() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          let e = new Promise((resolve, reject) => {
            wx.request({
              // url: 'https://historyhangqin.com:8085/user/wxLogin/' + res.code,
              url: 'https://gq.dgut.edu.cn/user/wxLogin/' + res.code,
              method: 'POST',
              data: {},
              //成功回调
              success: (e) => {
                console.log("token :", e.data.data)
                app.globalData.token = e.data.data
                  //判断是否是黑名单
                  const IsBack = () => {
                    wx.request({
                      url: 'https://gq.dgut.edu.cn/user/isBlack',
                      method:'GET',
                      header:{
                        token:e.data.data
                      },
                      success:(e)=>{
                        if(e.data.data==true){
                          wx.showModal({
                            title: '提示',
                            content: '你已被拉入黑名单，请联系"honshen_hyj"(微信号)解封',
                            success (res) {
                              if (res.confirm) {
                                IsBack()
                              } else if (res.cancel) {
                                IsBack()
                              }
                            }
                          })
                        }
                      },
                      fail:(e)=>{
                        console.log("error1111")
                      }
                    })
                  };
    
                  // 开始发送 GET 请求
                  IsBack();
                resolve(e)
              },
              //失败回调
              fail: (e) => {
                //失败抛出
                reject("请求失败")
              },
            })
          })
          // 将包含token的promise对象抛出
          resolve(e)
        }
      })
    })
  },
  IsBack(){
    wx.request({
      url: 'https://gq.dgut.edu.cn/user/isBlack',
      method:'GET',
      header:{
        token:e.data.data
      },
      success:(e)=>{
        wx.showModal({
          title: '提示',
          content: '你已被拉入黑名单，请退出找管理员',
          success (res) {
            if (res.confirm) {
              this.IsBack()
            } else if (res.cancel) {
              this.IsBack()
            }
          }
        })
      },
      fail:(e)=>{
        console.log("error1111")
      }
    })
    },
  // 下载文件
  commonDownload: (data) => {
    return request("common/download", "GET", data, false);
  },

  //签到讲座
  LectureSignIn:(id)=>{
    return request("lecture/ScanCheckin/"+id,"POST",false)
  },
  //签退讲座
  LectureSignOff:(id)=>{
    return request("lecture/ScanCheckout/"+id,"POST",false)
  },
  //报名讲座
  LectureRegistration:(id,data)=>{
    return request("lecture/robTicket/"+id,"POST",data,false)
  },
  //获取个人二维码
  getPersonalQRcode:()=>{
    return request("user/myQRCode",'GET',false)
  },
  //管理员扫码签到
  adminScan:(id,path)=>{
    return request('user/SignIn?lectureId='+id+'&openid='+path,"POST",false)
  },






  // 封装商品列表
  gitGoodsList: (接收参数) => {
    return request("/shop/goods/list", "get", {
      参数
    }, true)
  },
  //项目导航数据
  getNavList: () => {
    return request('/shop/goods/category/all', "post", {}, true)
  },
  // 首页摘录数据
  getExtract: () => {
    return request('article/extract', 'GET', {}, false)
  },
  //获取飞花令关键字
  getFlyingFlowerOrderKey: () => {
    return request('getFlyingFlowerOrderKey', 'GET', {}, false)
  },
  // 飞花令对话
  flyingFlowerOrder: (content) => {
    return request(`flyingFlowerOrder/${content}`, 'GET', {}, false)
  },
  // 获取诗词接龙关键字
  getPoetrySolitaireKey: () => {
    return request('getPoetrySolitaireKey', 'GET', {}, false)
  },
  //诗词接龙对话
  poetrySolitaire: (content) => {
    return request(`poetrySolitaire/${content}`, 'GET', {}, false)
  },
  // 更改用户信息
  userUpdate: (data) => {
    return request('user/update', 'POST', data, false)
  },
}