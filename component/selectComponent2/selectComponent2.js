// component/selectComponent/selectComponent.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    options: Array,
    showFieldName: "select_name",
    keyFieldName: "select_code",
    lastSelectPositionName:String
  },
  /**
   * 声明调用的form表单可以感知到input内容
   */
  behaviors: ['wx://form-field-group'],
  /**
   * 组件的初始数据
   */
  data: {
    result: Array,
    keyFieldVal: "",
    showFieldVal: "",
    isShow: false,
    lastSelectPositionName:""
  },
 
  /**
   * 组件的方法列表
   */
  methods: {

    // 向父组件传递选到的数据：

    clickSelect: function(e){
      console.log(e);
      
      this.setData({
        keyFieldVal: e.currentTarget.dataset.id,
        showFieldVal: e.currentTarget.dataset.value,
        isShow: false
      });
      this.triggerEvent('sendshowFieldVal', {
        keyFieldName:this.data.keyFieldVal
      })
     
    },
 
    openClose: function(){
      this.setData({
        isShow: !this.data.isShow
      })
    },
 
 
    close() {
      this.setData({
        isShow: false
      })
    }
  },
  ready(){
    this.setData({
      lastSelectPositionName:this.properties.lastSelectPositionName,
      keyFieldVal:this.data.lastSelectPositionName
    })
  },
  lifetimes: {
    attached() {
      var pp = new Array();
      for(let item of this.data.options){
        var ob = {};
        for(var colum in item){
          if(colum === this.data.keyFieldName){
            ob.id=item[colum];
          }else if(colum === this.data.showFieldName){
            ob.name=item[colum];
          }
        }
        pp.push(ob);
      };
      this.setData({
        result: pp
      })
    }
  }
  
})
