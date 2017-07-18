//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //发送请求获取用户的openID
    var that=this;
    var vateLime;
    wx.login({
      success: function (res) {
        wx.request({
          url: "https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code",
          data: {
            appid: "wx8ce8b2399f2ba238",
            secret: "0184d8a260d0c9a980ce00014b6af65a",
            js_code: res.code,
            grant_type: "authorization_code"
          },
          success: function (res) {
            console.log(res.data)
            that.globalData.vateLime = res.data.openid 
          },
        })
      }
    })//login结尾
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    vateLime:null
  }
})