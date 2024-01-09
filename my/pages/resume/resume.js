// my/pages/resume/resume.js
import {
  getMyMessage,
  uploadFile,
  getDepartment,
  getPosition,
  updateSaveCurriculumVitae,
  getMyCurriculumVitae
} from "../../../apis/apis.js"


Page({

  /**
   * 页面的初始数据
   */
  data: {
    className: "",
    phoneNumber: "",
    wxNumber: "",
    text: 0,

    // 调剂
    checked: false,
    // 校区
    campus: 0,
    showFieldName: "selectName",


    // 文件
    fileList: [


    ],
    fileUrl: "",
    fileUrlEnd: "", //文件后缀

    // 个人信息
    myMessage: {},
    // 部门信息
    department: [],
    // 部门id
    departmentId: "",
    // 职位信息
    position: [],
    // 职位id
    positionNameId: "",



    isShow: true,
    isShowPosition: true,

    radioSelected: "0",

    // 之前选择的
    lastSelectDepartmentName:"",
    lastSelectPositionName:"",
    havelastID:0  //有没有之前选的部门职位
  },

  // 获取之前填写过的简历信息

  async useGetMyCurriculumVitae() {
    let data = {}
    let res = await getMyCurriculumVitae(data);
    console.log(res.data)

    if (res.data.isAdjust == 1) {
      this.setData({
        checked: true
      })
    }
    if (res.data.campus == 1) {
      this.setData({
        radioSelected: "1"
      })
    }


    this.setData({
      className: res.data.naturalClass,
      phoneNumber: res.data.phone,
      wxNumber: res.data.wechat,
      lastSelectDepartmentName:res.data.departmentName,
      lastSelectPositionName:res.data.positionName,
    })



  },

  // 确认提交表单
  submit() {
    console.log("班级", this.data.className, "部门id", this.data.departmentId, '职位', this.data.positionNameId, "调剂", this.data.checked, "校区", this.data.campus, "手机号", this.data.phoneNumber, "微信号", this.data.wxNumber, "文件号", this.data.fileUrl)

    // this.setData({
    //   campus: parseInt(this.data.campus)
    // })
    if (this.data.checked == true) {
      this.setData({
        checked: 1
      })
    } else {
      this.setData({
        checked: 0
      })
    }

    if (this.data.lastSelectDepartmentName != "" && this.data.lastSelectPositionName!="") {
      this.setData({
        havelastID:1
      })
    }
    console.log("班级", this.data.className, "部门id", this.data.departmentId, '职位', this.data.positionNameId, "调剂", this.data.checked, "校区", this.data.campus, "手机号", this.data.phoneNumber, "微信号", this.data.wxNumber, "文件号", this.data.fileUrl)


    var that = this;
    const regex = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
    // 校验数据：是否为空，是否合法
    if (that.data.phoneNumber == "" || that.data.wxNumber == "") {
      wx.showModal({
        title: '提示',
        content: '请将信息填写完整',
        showCancel: false
      })
    }else if ((that.data.departmentId == "" && that.data.lastSelectDepartmentName == "") || (that.data.positionNameId == "" && that.data.lastSelectPositionName == "")){
      wx.showModal({
        title: '提示',
        content: '请将信息填写完整',
        showCancel: false
      })
    }
     else if (that.data.className == "") {
      wx.showModal({
        title: '提示',
        content: '请输入班级',
        showCancel: false
      })
    } else if (that.data.phoneNumber.length !== 11 || !regex.test(that.data.phoneNumber)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号',
        showCancel: false
      })
    } else if (that.data.fileUrlEnd != "" && that.data.fileUrlEnd != "pdf") {
      wx.showModal({
        title: '提示',
        content: '请上传pdf文件',
        showCancel: false
      })
    } else {
      // 上面全部校验成功才会执行
      // 和服务器交互部分（将数据给服务器）
      this.useUpdateSaveCurriculumVitae();

    }
  },

  tapSelect() {
    console.log(this.data.options);
    console.log(this.data.department);
    console.log("111111111");

  },
  // 预览简历
  buttonToPreviewResume() {
    wx.navigateTo({
      url: '../myMessage/myMessage'
    })
  },
  // 导入简历
  buttonToImportResume() {
    wx.showModal({
      title: '提示',
      content: '该功能敬请期待',
      showCancel: false
    })
  },
  // 选择校区
  bindSelectCampus(e) {
    var val = e.detail.value; //获取radio值，类型：字符串
    var val2 = parseInt(val); //将字符串转换为number
    this.setData({
      radioSelected: e.detail.value,
      campus: val,
    })
    console.log(this.data.campus)
  },

  // 调用更改简历的api
  async useUpdateSaveCurriculumVitae() {
    console.log("职位id", this.data.positionId)
    let data;
    if (this.data.fileUrl == "") {
      if (this.data.havelastID==0 || (this.data.havelastID==1 && this.data.departmentId!="")) {
        data = {
          "campus": this.data.campus,
          "departmentId": this.data.departmentId,
          "isAdjust": this.data.checked,
          "naturalClass": this.data.className,
          "phone": this.data.phoneNumber,
          "positionId": this.data.positionNameId,
          "wechat": this.data.wxNumber
        }
      }else{
        data = {
          "campus": this.data.campus,  
          "isAdjust": this.data.checked,
          "naturalClass": this.data.className,
          "phone": this.data.phoneNumber,
          "wechat": this.data.wxNumber
        }
      }
      
    } else {
      if (this.data.havelastID==0 || (this.data.havelastID==1 && this.data.departmentId!="")) {
        data = {
          "campus": this.data.campus,
          "departmentId": this.data.departmentId,
          "fileUrl": this.data.fileUrl,
          "isAdjust": this.data.checked,
          "naturalClass": this.data.className,
          "phone": this.data.phoneNumber,
          "positionId": this.data.positionNameId,
          "wechat": this.data.wxNumber
        }
      }else{
        data = {
          "campus": this.data.campus,
          "fileUrl": this.data.fileUrl,
          "isAdjust": this.data.checked,
          "naturalClass": this.data.className,
          "phone": this.data.phoneNumber,
          "wechat": this.data.wxNumber
        }
      }

    
    }


    let res = await updateSaveCurriculumVitae(data);
    console.log(res)
    wx.showModal({
      title: res.message,
      showCancel: false,
    })
    // if (res.message == "修改成功") {
    //   wx.showModal({
    //     content: res.message,
    //     showCancel: false,
    //     complete: (res) => {
    //       // 提交完跳转回我的页面 
    //       // wx.navigateBack({
    //       //   delta: 1
    //       // })
    //     }
    //   })
    // }
  },

  // 调用获取职位信息的api
  async useGetPosition() {
    let data = {
      departmentId: this.data.departmentId,
    }
    let res = await getPosition(data);
    console.log("职位查询结果")
    console.log(res)
    this.setData({
      isShowPosition: false
    })
    this.setData({
      position: res.data
    })
    this.setData({
      isShowPosition: true
    })
    console.log(this.data.position)
  },
  // 调用获取部门信息的api
  async useGetDepartment() {
    let data = {}
    let res = await getDepartment(data);
    console.log(res)
    // this.setData({isShow:false})
    this.setData({
      department: res.data
    })
    this.setData({
      isShow: true
    })
    console.log(this.data.department)

  },

  // 调用“获取个人信息”api
  async useGetMyMessage() {
    let data = {}
    let res = await getMyMessage(data);
    console.log(res)
    this.setData({
      myMessage: res.data
    })
    console.log(this.data.myMessage)
  },


  // 父组件接收子组件选项中的数据
  sendshowFieldVal(event) {
    console.log(event.detail)
    console.log(event.detail.keyFieldName)
    this.setData({
      departmentId: event.detail.keyFieldName
    });
    console.log(this.data.departmentId);

    // 通过部门id获取职位信息
    this.useGetPosition();
  },
  // 父组件接收子组件2选项中的数据
  sendshowFieldValPosition(event) {
    console.log(event.detail)
    console.log(event.detail.keyFieldName)
    this.setData({
      positionNameId: event.detail.keyFieldName
    });
    console.log(this.data.positionNameId);

  },

  // 读取文件
  afterRead(event) {
    const {
      file
    } = event.detail;

    let res = uploadFile(file);
    console.log(this.data.fileList);
    console.log(res);


    // 处理文件后缀
    res.then((result) => {
      console.log("result", result);
      let arr = result.split('"');
      // console.log(arr)
      // console.log(arr[9])


      this.setData({
        fileUrl: arr[9],
      })
      console.log(this.data.fileUrl)

      // 提示用户文件上传成功
      if (this.data.fileUrl != "") {
        wx.showModal({
          title: '提示',
          content: '上传文件成功（注：只能上传一个文件，后面上传的会对前面的进行覆盖）',
          showCancel: false
        })
      }

      arr = arr[9].split('.');
      this.setData({
        fileUrlEnd: arr[1]
      })
      console.log(this.data.fileUrlEnd)

    })



  },

  // 输入
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },

  // Switch按钮
  switchonChange({
    detail
  }) {
    // 需要手动对 checked 状态进行更新
    this.setData({
      checked: detail
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.useGetMyCurriculumVitae();
    this.useGetMyMessage();
    this.useGetDepartment();

    setTimeout(() => {
      // this.selectComponent('#departmentNameSelect').init({
      //   department:this.data.department
      // })
      this.setData({
        isShow: false
      })

      this.setData({
        isShow: true
      })
      console.log(this.data.department)

    }, 400)

    // setTimeout(()=>{
    // this.selectComponent('#departmentNameSelect').refresh();
    // },1000)


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