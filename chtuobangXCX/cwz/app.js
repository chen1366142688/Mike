App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  // globalData: {
  //   result: [],
  //   mobile:""
  // },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
           wx.getUserInfo({
            success: function (res) {
            console.log(that.globalData.mobile);
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo,that.globalData.mobile,that.globalData.result)
            }
          }),
          //发起网络请求
          wx.request({
            url: "https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code",
            data: {
              appid	:"wx85df63382552c990",
              secret:"b9e0f0fa716d68a39b34ba559cd092e1",
              js_code:res.code,
              grant_type:"authorization_code"
            },
            success:function(res){   


 wx.request({
url:"https://appletcwz.chetuobang.com:9090/chetuobang/qwz/"+res.data.openid+"/mobile",
      data: {uid:res.data.openid},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      //header: {contentType:json}, // 设置请求的 header
      success: function(res){
        //如果用户没有绑定手机号的时候，
        //console.log(res.data.message)
        var m=JSON.parse(res.data.message)
        //console.log(m.mobile)
        if(m.mobile){ 
          console.log(m.mobile);
          that.globalData.mobile = m.mobile;
          console.log(that.globalData.mobile);
        }else{
          console.log(m.mobile);
          that.globalData.mobile = m.mobile;
          console.log(that.globalData.mobile);
        }
      }
    }),

 wx.request({
    url: "https://appletcwz.chetuobang.com:9090/chetuobang/qwz/"+res.data.openid+"/violatesublime",
    data: {uid:res.data.openid},
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function(res){
      if(res.data.message=="null"){
       console.log("用户还没有绑定车辆");
      }else{
        //console.log("用户已经绑定车辆填充到页面上");
          var che=JSON.parse(res.data.message); 
          //console.log(che);  
          that.globalData.result = che;
          console.log(that.globalData.result);
      }
    }
  })



              console.log(res.data.openid);
              wx.setStorage({
                key:"uid",
                 data:res.data.openid
                })
            },
            fail:function(){
              console.log("error");
            }
          })
        }
      })
    }
  },
  globalData:{
    result: [],
    userInfo:null,
    mobile:'',
    hid:false,
    carinfo:false,
  }
})