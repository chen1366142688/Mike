//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function(cb) {
    var that = this
    console.log("查看是否调用");
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  /**
   * 获取用户unionid
   * */
  getLimitInfo:function(cb){
    var that = this
    wx.login({
      success: function (res) {
        console.log(res);
        var code = res.code;//登录凭证
        console.log(code);
        //调用获取用户信息接口
        wx.getUserInfo({
          success: function (entrcyUserinfo) {
            console.log("用户加密信息")
            console.log(entrcyUserinfo);
            //请求自己的服务器，解密用户信息，获取unionid
            wx.request({
              url: 'https://wzcx.chetuobang.com/wz_api/?service=cyk.index',
              method: 'post',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                encryptedData: entrcyUserinfo.encryptedData,
                iv: entrcyUserinfo.iv,
                code: code
              },
              success: function (re) {
                //4.解密成功后 获取自己服务器返回的结果
                console.log(re.data)
                that.globalData.unionId = re.unionId;
                typeof cb == "function" && cb(that.globalData.unionId)
                var unionId = re.data.unionId;
                wx.setStorageSync('openId', re.data.openid)
                wx.setStorageSync('unionId', unionId)
                console.log(re.data.unionId)

              }
            })
          }
        })
      }
    })
  },

  globalData: {
    userInfo: null,
    unionId:null
  }
})
