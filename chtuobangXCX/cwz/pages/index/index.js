//index.js
//获取应用实例
var app = getApp()
Page({
 data: {
   telphone:"",
   Verification:"",
    userInfo:{},
    uid:"",
    nocancel:false,
    car:false,
    carinfo:false,
    hid:false,  
    mobile:"123",
    info:"info",
    bug:"btnSendCode",
    verifyCodeTime:"获取验证码",
    result:[ ],
  },
  //弹出框
  can: function(){
        this.setData({
             hidden: false
        });
    },
  cancel: function(){
    console.log("您点击的是取消");
        this.setData({
             hidden: true
        });
    },
    confirm: function(){
      console.log("您点击的是确定");
        this.setData({
             nocancel:  this.nocacel,
             hidden: true
        });    
        console.log("clicked confirm");
    },
   //修改车辆信息
  modify:function(e){
    var that=this;
    var xi=e.currentTarget.id;
    var i=xi.slice(6,7);
    var th=that.data.result[i].plate;
    var engine=that.data.result[i].engine;
    var evin=that.data.result[i].evin;
    var brand=that.data.result[i].brand;
    var openid=that.data.uid;
    wx.request({
      url: "https://appletcwz.chetuobang.com:9090/chetuobang/qwz/"+openid+"/"+th+"/plate",
      data: {
        uid:openid,
        plate:th
      },
      method: 'POST', 
      success: function(res){
        console.log("删除成功，跳转到修改");
        wx.navigateTo({
          url: "../addcar/addcar?plate="+th+"&engine="+engine+"&evin="+evin+"&brand="+brand,
        })
      },
    })
  },
  //删除车辆信息
  del:function(e){
    var that=this;
    //当前点击的this
    var id=e.currentTarget.id;
    var index=id.slice(4,5);
    //当前车牌
    var th=this.data.result[index].plate;
    wx.showModal({
      title:"删除车辆",
      content:"删除车辆信息",
      success:function(res){
              if(res.confirm){
                  console.log("确定")
                  wx.getStorage({
                      key: 'uid',
                      success: function(res) {
                      console.log(res.data);  
                        wx.request({
                            url: "https://appletcwz.chetuobang.com:9090/chetuobang/qwz/"+res.data+"/"+th+"/plate",
                            data: {
                            uid:res.data,
                            plate:th
                            },
                            method: 'POST', 
                            success: function(res){
                                result=that.data.result;
                                result.splice(index,1)
                                that.setData({
                                    result:result
                                })
                                wx.redirectTo({
                                  url: '../index/index',
                               })
                            },
                          })
                      } 
                  })
              }else if(res.cancel){
                  console.log("取消")
              }
            }
          })
        },
  //页面跳转添加车辆
  toast:function(){
       wx.navigateTo({
          url: "../addcar/addcar",
       })
  },
  //页面跳转违章记录
  result:function(){
       wx.navigateTo({
          url: '../result/result'
      })
  },
  //页面跳转未处理违章记录
  res:function(e){
    var that=this;
    var look=e.currentTarget.id;
    var j=look.slice(8,9);
     //当前车牌
    var th=this.data.result[j].plate;
    var u=that.data.uid;    
    wx.navigateTo({
        url: "../result_will/result_will?plate="+th,
    })
  },
  //事件处理函数
   fs:function(){
      var m=this.data.telphone;
      if(m=="请输入手机号" || m=="请输入正确的手机号码"){
         this.setData({
         telphone:""
         })
      }    
   },
   yz:function(){
      var m=this.data.Verification;
      if(m=="请输入验证码"){
         this.setData({
         Verification:""
         })
      }   
   },
   //输入手机号时取出输入的值,验证判断是否验证通过
   kd:function(e){ 
     var x=e.detail.value;
     this.setData({
      telphone:x,
     })
     var that=this.data.telphone;
     if(/^1(3|4|5|7|8)\d{9}$/.test(that)){
    //******获取验证码按钮默认为灰色，此时变色
        console.log("手机号正确")
        this.setData({
          bug:"btn",
        })
     }
  },
  kb:function(e){ 
     var b=e.detail.value;
     var tel=this.data.telphone;
     this.setData({
      Verification:b,
     }) 
  },
  //点击获取验证码
  rigister:function(e){
    if(this.data.buttonDisable) return false;
     var x=this.data.telphone;
     var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
     //console.log(e);
      if(!myreg.test(x)) 
      { 
          this.setData({
            telphone:"请输入正确的手机号码"
          })
         // console.log("无效手机号码");
          return false; 
       }
     var x=this.data.telphone;
     //console.log(x)
     var that = this;
//*********点击获取验证码时候，发送请求
wx.request({
  url: "https://sms.chetuobang.com/sms.php?sms_type=1",
  data: {
    tel_phone:x
  },
  method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
  // header: {}, // 设置请求的 header
  success: function(res){
    // success表示获取验证码成功
    var c = 60;
    var intervalId = setInterval(function(){
      c = c-1;
      that.setData({
        verifyCodeTime:c + 's后重发',
        buttonDisable:true
      })
      if(c==0){
        clearInterval(intervalId);
        that.setData({
          verifyCodeTime:'获取验证码',
          buttonDisable:false
        })
      }
    },1000)
    console.log("请求发送验证码成功");
    console.log(res);
  },
})
  },
  //绑定手机号
  iphone:function(e){
      var telphone=this.data.telphone;
      var Verification=this.data.Verification;
      var hid=this.data.hid;
      console.log(telphone);
      console.log(Verification);
      if((telphone==" " ||telphone=="请输入手机号") || (Verification== "" || Verification=="请输入验证码")){
            this.setData({
                hid:false
            })
        }else{
            this.setData({
              hid:true
            })
        }
//******点击绑定手机号的时候，取出两个值，发请求
wx.request({
  url: 'https://sms.chetuobang.com/sms.php?sms_type=2',
  data: {
    tel_phone:telphone,
    verify_code:Verification
  },
  method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
  // header: {}, // 设置请求的 header
  success: function(res){
    console.log(res.data);
    //请求成功之后拿到stroage中的openid
    wx.getStorage({
          key: 'uid',
          success: function(res){
          console.log("绑定手机号成功");
          var uid=res.data;
          //发送请求把当前用户的手机号信息添加到数据库中
            wx.request({
          url: "https://appletcwz.chetuobang.com:9090/chetuobang/qwz/wechatapp/"+uid+"/"+telphone+"/mobile",
          data: {
            uid:uid,
            telphone:telphone
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            //添加用户信息成功之后刷新当前页面
            var getApphid=app.globalData.hid;
            console.log("ok")
                wx.navigateTo({
                  url: '../index/index'
                 })
            }
          })
        }
      })
    }
  })
},
 //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //页面加载的时候执行的函数*****************************
  onLoad: function () {
    var that = this;
   wx.getStorage({
    key: 'uid',
    success: function(res) {
      var uid=res.data;
      that.setData({
        uid:res.data
      })  
      console.log(that.data);
      //判断用户是否绑定手机号
       wx.request({
url:"https://appletcwz.chetuobang.com:9090/chetuobang/qwz/"+uid+"/mobile",
      data: {uid:uid},
      method: 'GET',
      success: function(res){
        //如果用户没有绑定手机号的时候，
        console.log(res.data.message)
        var m=JSON.parse(res.data.message)
        console.log(m.mobile)
        app.globalData.mobile = m.mobile;
        if(app.globalData.mobile){ 
          //说明用户已经绑定手机号
          console.log(app.globalData.mobile);
          console.log(app.globalData.mobile ? true : false);
          that.setData({
               carinfo:false,
            })
        }else{
          //说明用户没有绑定手机号
            that.setData({
               carinfo:true,
            })
        }
      }
    })
    //获取用户车辆信息
    wx.request({
    url: "https://appletcwz.chetuobang.com:9090/chetuobang/qwz/"+uid+"/violatesublime",
    data: {uid:uid},
    method: 'GET', 
    success: function(res){
      if(res.data.message=="null"){
       console.log("用户还没有绑定车辆");
      }else{
        console.log("用户已经绑定车辆填充到页面上");
          var carMessage=JSON.parse(res.data.message);   
        that.setData({
          result:carMessage,
          car:true
        });
      }
    }
  })
  },

})
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo,mobile,arr,nocar){
      console.log(arr);
      console.log('debug');
      //更新数据
      that.setData({
        userInfo:userInfo,
        mobile:mobile,
        result:arr,
        car:nocar
      })
      console.log(that.data.mobile ? true :false)
      console.log(that.data.car);
    })
    //console.log(that.data.mobile)
  }
})
