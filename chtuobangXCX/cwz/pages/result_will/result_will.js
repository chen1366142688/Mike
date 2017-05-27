// pages/result_will/result_will.js
Page({
  data:{
    plate:"车托帮的车，车托帮的帮",
    arr:[],
    hidden:false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    var plate=options.plate;
    console.log(typeof(plate))
    plate = plate.split(' ');//先按照空格分割成数组
    plate = plate.join('');//在拼接成字符串
     console.log(plate);
     wx.getStorage({
       key: 'uid',
       success: function(res){
         var u=res.data;
          wx.request({
              url: "https://appletcwz.chetuobang.com:9090/chetuobang/qwz/"+u+"/"+plate+"/violate",
              data: {
                uid:u,
                plate:plate
              },
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              // header: {}, // 设置请求的 header
              success: function(res){
                console.log(res.data);
                if(res.data.message){
                var arr=JSON.parse(res.data.message); 
                that.setData({
                  arr:arr,
                  hidden:true
                })
                }else{
                  hidden:false
                }
              
                console.log(that.data.arr)
              }
          })
       },
     })
              that.setData({
                  plate:plate
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