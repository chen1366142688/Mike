
var app = getApp()
Page({
 data:{
  selectPerson:true,
  firstPerson:'京',
  selectArea:false,
  plate:"",
  engin:"",
  evin:"",
   hander:"",
   openidInfo:{}
  },
 //点击选择类型
 clickPerson:function(){
  var selectPerson = this.data.selectPerson;
  if(selectPerson == true){
   this.setData({
   selectArea:true,
   selectPerson:false,
 })
  }else{
   this.setData({
   selectArea:false,
   selectPerson:true,
 })
  }
 } ,
 //点击切换
 mySelect:function(e){
  this.setData({
   firstPerson:e.target.dataset.me,
   selectPerson:true,
   selectArea:false,
  })
 },
 //车牌号认证
play:function(e){
    var p=e.detail.value;
    if(p=="车牌号不正确" || p=="请输入车牌号"){
      this.setData({
        plate:" "
      })
    }
 },
 plate:function(e){
   var pl=e.detail.value;
   console.log(pl);
   if(pl==""){
      console.log("输入不正确");
   }else{
       console.log("车牌正确");
     this.setData({
       plate:pl
     })
     }
 },
 //车架号认证
  eng:function(e){
    var that=this;
    var en=e.detail.value;
    if(en=="车架号不正确" || en=="请输入车架号"){
      that.setData({
        engin:" "
      })
    }
 },
 engin:function(e){
   var en=e.detail.value;
   var that=this;
   if(en==""){
     console.log("车架号不正确");
   }else{
     console.log("车架号正确");
     this.setData({
       engin:en
     })
   }
 },
 //发动机号认证
 ev:function(e){
    var that=this;
    var e=e.detail.value;
    if(e=="发动机号不正确" || e=="请输入发动机号"){
      that.setData({
        evin:" "
      })
    }
 },
 evin:function(e){
    var ev=e.detail.value;
   var that=this;
   if(ev==""){
     console.log("车架号不正确");
   }else{
     console.log("车架号正确");
     this.setData({
       evin:ev
     })
   }
 },
 //车型认证
 hand:function(e){
    var that=this;
    var h=e.detail.value;
    if(h=="请输入车型"){
      that.setData({
        hander:" "
      })
    }
 },
 hander:function(e){
    var han=e.detail.value;
   var that=this;
   if(han==""){
     console.log("车架号不正确");
   }else{
     console.log("车架号正确");
     this.setData({
       hander:han
     })
   }
 },
 //提交判断所有值
 submit:function(e){
   var that=this;
   var first=this.data.firstPerson;
   var che=this.data.plate;
   var chePai=first+che;
    chePai = chePai.split(' ');//先按照空格分割成数组
    chePai = chePai.join('');//在拼接成字符串
   var cheJia=this.data.engin;
   var faDong=this.data.evin;
   var cheXing=this.data.hander;
   if(chePai==""||chePai=="请输入车牌号"||cheJia==""||cheJia=="请输入车架号"||faDong==""||faDong=="请输入发动机号"||cheXing==""||cheXing=="请输入车型"){
      return false;
   }else{
     var uid = that.data.openidInfo.data.openid;
         wx.request({
       url: "https://appletcwz.chetuobang.com/chetuobang/qwz/"+uid+"/plate",
       data: {
         "plate": chePai,
          "engine": cheJia,
          "evin": faDong,
          "brand": cheXing
       },
       method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {"application":"json"}, // 设置请求的 header
       success: function(res){
         // success
         console.log(res.data);
         wx.navigateTo({
          url: '../index/index'
        })
       },
     })  
   }
 },
 onLoad:function(options){
  // 页面初始化 options为页面跳转所带来的参数
   console.log(app.globalData)
  var that=this;
  that.setData({
    openidInfo:app.globalData.vateLime
  })
  console.log(that.data.openidInfo.data.openid)
  var plate=options.plate;
  var chePai=plate.slice(1,8);
  var ch=plate.slice(0,1);
  var engine=options.engine;
  var evin=options.evin;
  var brand=options.brand;
  console.log(chePai);
  console.log(engine);
  console.log(evin);
  console.log(brand);
  console.log(ch);
  console.log(this.data)
  that.setData({
     plate:chePai,
     engin:engine,
     evin:evin,
     hander:brand,
     firstPerson:ch
  })
 },
 onReady:function(){
  // 页面渲染完成
 },
 onShow:function(){
  // 页面显示
 },
 onHide:function(){
  // 页面隐藏
 },
 onUnload:function(){
  // 页面关闭
 }
})