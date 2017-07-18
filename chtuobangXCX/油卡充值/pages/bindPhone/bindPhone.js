var app=getApp();
// pages/bindPhone/bindPhone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      VerifyCode:"获取验证码",
      mobile:"",
      hide:true,
      btnIsClick:'',
      codeNum:0,
      timeFlag:0,
      userInfo: {},
      unionId:"",
      failHidden:true,
  },
  openWindow: function (e) {
      this.setData({
          hide: false
      })
  },
  closeWindow: function (e) {
    var that=this;
    this.setData({
      failHidden:true,
      hide:true
    })
  },
  onLoad: function () {
    var that = this;
   
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    var unionId=wx.getStorageSync('unionId')
      
        that.setData({
          unionId: unionId
        })
  },

  mobileInputEvent: function (e) {
    var that = this;
    var mobiel_num=e.detail.value;
    if (IsTel(mobiel_num)) {
      that.setData({
        btnIsClick: "btnIsClick",
        mobile: mobiel_num,
      })
    }else{
      // wx.showToast({
      //   title: '请完善手机号输入',
      // })
      return false;
    }

  },
  

  vertifyCode: function (e) {//验证手机号，发送验证码
  var that=this;
    if(this.data.timeFlag==1){
      return false;
    }
    var mobileNum= this.data.mobile;
    mobileNum=parseInt(mobileNum);

    console.log(mobileNum)
    console.log(IsTel(mobileNum))
    if (IsTel(mobileNum)) {
      that.setData({
        btnIsClick: "btnIsClick",
       
      })
    } else {
      // wx.showToast({
      //   title: '请完善手机号输入',
      // })
      return false;
    }
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
        var redata=res.data;
        
      },
      fail: function (res) {
        // console.log("error res=")
        // console.log(res.data)
      }
    });
  },
  saveCode:function(e){
    var code=e.detail.value;
    this.setData({
      codeNum:code,
    })
  },
  
//绑定手机号
  bindMobile:function(){
    //验证码是否ok
    var that=this;
    var mobileNum = that.data.mobile;
    var vcode = that.data.codeNum;
    vcode= parseInt(vcode)
    mobileNum = parseInt(mobileNum);

    var verifyUrl ="https://sms.chetuobang.com/sms.php?sms_type=2";
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
        var redata = res.data;
        if (redata.indexOf("Success") > 0) {
          requestBindMobile(that,mobileNum);
        }
      },
      fail: function (res) {
        console.log("error res=")
        console.log(res.data)
      }
    });
  },
  //绑定手机号成功，跳转到个人信息页面
  suer:function(e){
    var that=this;
    console.log("准备跳了")
    wx.navigateBack({
      url: '../myself/myself?phoneNumber=' + that.data.mobile,
      success: function () { console.log("已经跳了")}
    })
  }
})
function IsTel(s) {
  if (s != null) {
   // var length = s.length;
    if (/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1})|)+\d{8})$/.test(s)) {
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
      timeFlag:0,
      btnIsClick:''
    });
    // timeout则跳出递归
    return;
  }
  // 渲染倒计时时钟
  that.setData({
    VerifyCode: date_format(total_micro_second) + " 秒",
    timeFlag:1,
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


function requestBindMobile(that,mobile){
  var unionId = that.data.unionId;
 
  wx.request({
    url: 'https://oilcard.chetuobang.com/oilcard_recharge/bindMobile',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      userUnionId: unionId,
      userMobile: mobile,
    },
    success: function (res) {
      var code = res.data.code;
      if(code== 1){
        that.setData({
          hide:false,
        })
        setTimeout(function(e){
          wx.navigateTo({
            url: '../myself/myself?phoneNumber=' + that.data.mobile,
          })
        },1500)
      }else{
        that.setData({
          failHidden:false
        })
      }
      
    },
    fail: function (res) {
      that.setData({
        failHidden: false,
      })
    }
  });

}