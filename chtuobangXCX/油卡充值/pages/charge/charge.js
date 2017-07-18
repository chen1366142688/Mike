var app=getApp();
// pages/charge/charge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carNumber:'',
    money:'',
    one:'',
    VerifyCode: "获取验证码",
    mobile: "",
    hide: true,
    btnIsClick: 'cannotclick',
    codeNum: 0,
    timeFlag: 0,
    userInfo: {},
    color:' ',
    yanz:true,
    Prompt: true,
    color:'#4d8ef1',
    yiBangDing:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var unionId = wx.getStorageSync('unionId');
    console.log("这里是用户unionID")
    console.log(unionId)
    that.setData({
      carNumber : options.carNum,
      money : options.money
    })
    var carNumber=that.data.carNumber;
    var r=0;
    var one = " ";
    for(var i in carNumber){
      one = carNumber[r];
    }
    console.log(one)
    if(one == 9){
      that.setData({
        one: '中石油加油卡'
      })
    }else if(one == 1){
      that.setData({
        one:'中石化加油卡'
      })
    }
    /**
     * 请求用户是否绑定手机号
    */
      wx.request({
         url: 'https://oilcard.chetuobang.com/oilcard_recharge/binded/' + unionId,
         method: 'GET',
         header: {'content-type': 'application/json'},
         data:{
           
         },
         success:function(res){
           console.log("用户是否绑定手机号")
           console.log(res.data.results.isBind)
           //用户没有绑定手机号
           if(res.data.results.isBind){
             console.log("用户绑定了手机号")
             that.setData({
               mobile: res.data.results.mobile,
               yiBangDing:true
             })
             
            
           } else if (res.data.results) {
             console.log("用户没有绑定")
             that.setData({
               yanz: false,
               yiBangDing:false
             })
           }
         },
         fail:function(info){
            console.log("请求用户手机绑定状态失败了哦")
         }
       })
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
          //更新数据
          that.setData({
            userInfo: userInfo
          })
        })
  },
  
  /**
   * 获取用户输入的手机号
  */
  mobileInputEvent: function (e) {
    var that = this;
    var mobiel_num = e.detail.value;
    console.log(mobiel_num)
    if (IsTel(mobiel_num)) {
      that.setData({
        btnIsClick: "",
        mobile: mobiel_num,
      })
    } else {
      wx.showToast({
        title: '请完善手机号输入',
      })
    }

  },
  vertifyCode: function (e) {//验证手机号，发送验证码
  var that=this;
    if (this.data.timeFlag == 1) {
      return false;
    }
    var mobileNum = this.data.mobile;
    mobileNum = parseInt(mobileNum);
  that.setData({
    color:'color'
  })

    var _Url = "https://sms.chetuobang.com/sms.php?sms_type=1";
    var total_micro_second = 60 * 1000;

    count_down(this, total_micro_second);
    wx.request({
      url: _Url,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        tel_phone: mobileNum
      },
      success: function (res) {
        var redata = res.data;

      },
      fail: function (res) {
        // console.log("error res=")
        // console.log(res.data)
      }
    });
  },
  saveCode: function (e) {
    var code = e.detail.value;
    this.setData({
      codeNum: code,
    })
  },
/**
 * 弹出用户说明
*/
  open:function(e){
    var that=this;
    that.setData({
      Prompt:false
    })
  },
  close: function (e) {
    var that = this;
    that.setData({
      Prompt: true
    })
  },
  icon:function(e){
    var that=this;
    if(that.data.color=='#ccc'){
      that.setData({ color:'#4d8ef1'})
    } else if (that.data.color == '#4d8ef1'){
      that.setData({
        color: '#ccc'
      })
    }
  },
 
  //点击确认购买的时候判断用户是否验证通过验证码，如果通过就直接调用后端充值接口
  bindMobile: function () {
  
    //验证码是否ok
    /**
     * 获取用户信息
    */
    var that=this;
     /**
   * 提交之前判断用户是否同意本活动服务为协议
  */
  if(that.data.color == '#ccc'){
    wx.showToast({
      title: '亲！您还没有同意服务协议，不能购买哦！',
      icon:'success',
      duration:2000
    })
    return false;
  }
    var unionId = wx.getStorageSync('unionId');
    //var openId = wx.getStorageSync('openId')
    var openId ='oXMGUjlDaY_8C1mkH4arXMpSw6rQ';
    var mobileNum = this.data.mobile;
    var topMoney=this.data.money;
    var vcode = this.data.codeNum;
    var carNumber = that.data.carNumber;
    var userInfo=that.data.userInfo;
    var channel=that.data.one;
    var host=0;
    if(channel == 1){
      host=0;
    }else if(channel == 9){
      host=2;
    }
    vcode = parseInt(vcode)
    mobileNum = parseInt(mobileNum);
    console.log('这是做验证的手机号')
    console.log(mobileNum)
    var yiBangDing=that.data.yiBangDing;
    //验证验证码
    /**
      *如果此时拿到的手机还好不为空的话，才发送验证，验证验证码 
      */
      if(yiBangDing == false){
    if (mobileNum != ""){
      var verifyUrl = "https://sms.chetuobang.com/sms.php?sms_type=2";
    wx.request({
      url: verifyUrl,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        tel_phone: mobileNum,
        verify_code: vcode,
      },
      success: function (res) {
        var redata = res.statusCode;
        if(redata == 200){
          console.log("验证成功")
          //绑定手机号
          wx.request({
            url: 'https://oilcard.chetuobang.com/oilcard_recharge/bindMobile',
            method:'POST',
            header:{
              'content-type':'application/json'
            },
            data:{
                userUnionId : unionId,
                userMobile  : mobileNum 
            },
            success:function(res){
              console.log("绑定手机号成功");
              console.log(res);
              /**
               * 调用充值接口
              */
              wx.request({
                url: 'https://oilcard.chetuobang.com/oilcard_recharge/topupCard',
                method:'POST',
                header:{
                  'content-type':'application/json'
                },
                data:{
                  unionId: unionId,
                  openId:openId,
                  topMoney: topMoney,
                  oilCardNum: carNumber,
                  mobile: mobileNum,
                  nickName: userInfo.nickName,
                  channel: host
                },
                success:function(res){
                  console.log("购买成功")
                  if ((res.data.code == 1) && res.statusCode == 200) {
                    //购买成功之后，跳转到成功页面
                    console.log(res)
                    wx.requestPayment({
                      'timeStamp': res.data.results.timeStamp,
                      'nonceStr': res.data.results.nonceStr,
                      'package': res.data.results.package,
                      'signType': res.data.results.signType,
                      'paySign': res.data.results.paySign,
                      success: function (res) {
                        console.log("支付成功")
                        console.log(res)
                        wx.navigateTo({
                          url: '../chargeSuccess/chargeSuccess',
                        })
                      },
                      fail: function (res) {
                        console.log("支付失败")
                        console.log(res)
                      }
                    })

                  } else {
                    wx.showToast({
                      title: '服务器出错了哦',
                      icon: 'error',
                      duration: 2000
                    })
                    console.log(res)
                  }
                 
                  console.log(res)
                },
                fail:function(info){
                  console.log("购买失败了")
                  console.log(info)
                  wx.showToast({
                    title: '购买失败了',
                    icon: 'error',
                    duration: 2000
                  })
                }
              })
            }
          })
        }
       
        
      },
      fail: function (res) {
        console.log("error res=")
        console.log(res.data)
      }
    });//1
    }else{
      /**
        * 提示用户验证失败
        */
      wx.showToast({
        title: '验证失败',
        icon: 'error',
        duration: 1500
      })
        }
      }else{
        /**
         * 调用充值接口*/
             
      wx.request({
        url: 'https://oilcard.chetuobang.com/oilcard_recharge/topupCard',
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: {
          unionId: unionId,
          openId: openId,
          topMoney: topMoney,
          oilCardNum: carNumber,
          mobile: mobileNum,
          nickName: userInfo.nickName,
          channel: host
        },
        success: function (res) {
          console.log("购买成功")
          if ((res.data.code == 1) && res.statusCode == 200) {
            //购买成功之后，跳转到成功页面
            console.log(res)
            wx.requestPayment({
              'timeStamp': res.data.results.timeStamp,
              'nonceStr': res.data.results.nonceStr,
              'package': res.data.results.package,
              'signType': res.data.results.signType,
              'paySign': res.data.results.paySign,
              success: function (res) {
                console.log("支付成功")
                console.log(res)
                wx.navigateTo({
                  url: '../chargeSuccess/chargeSuccess',
                })
              },
              fail: function (res) {
                console.log("支付失败")
                console.log(res)
              }
            })
            
          } else {
            wx.showToast({
              title: '服务器出错了哦',
              icon: 'error',
              duration: 2000
            })
            console.log(res)
          }

          
        },
        fail: function (info) {
          console.log("购买失败了")
          console.log(info)
          wx.showToast({
            title: '购买失败了',
            icon: 'error',
            duration: 2000
          })
        }
      }) 
      }
      
   
  },

  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
function IsTel(s) {
  if (s != null) {
    var length = s.length;
    if (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1})|)+\d{8})$/.test(s)) {
      return true;
    } else {
      return false;
    }
  }
}  

/* 毫秒级倒计时 */
function count_down(that, total_micro_second) {

  if (total_micro_second <= 0) {
    that.setData({
      VerifyCode: "重新发送",
      timeFlag: 0,
      color:''
    });
    // timeout则跳出递归
    return;
  }
  // 渲染倒计时时钟
  that.setData({
    VerifyCode: date_format(total_micro_second) + " 秒",
    timeFlag: 1,
  });
  setTimeout(function () {
    // 放在最后--
    total_micro_second -= 10;
    count_down(that, total_micro_second);
  }, 10)
}
// 时间格式化输出
function date_format(micro_second) {
  // 秒数
  var second = Math.floor(micro_second / 1000);
  // 小时位
  var hr = Math.floor(second / 3600);
  // 分钟位
  var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
  // 秒位
  var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
  // 毫秒位，保留2位
  var micro_sec = fill_zero_prefix(Math.floor((micro_second % 1000) / 10));
  return sec;
}
// 位数不足补零
function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}

