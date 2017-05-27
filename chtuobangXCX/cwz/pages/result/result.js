// pages/result/result.js
Page({
  data:{
    array:[],
    hidden:false,
    plate:"车托帮查违章"
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    wx.getStorage({
      key: 'uid',
      success: function(res){
        var uid=res.data;
         wx.request({
      url: "https://appletcwz.chetuobang.com:9090/chetuobang/qwz/"+uid+"/violate",
      data: {
        uid:uid
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        console.log(res.data.message);
                 if(res.data.message){
                 var arr=JSON.parse(res.data.message);                that.setData({
                   array:arr,
                   hidden:true
                 })
                 }else{
                   hidden:false
                 }
                 console.log(that.data.array)
      },
    })
      }
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