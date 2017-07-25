var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '北京',
    userInfo: {},
    Prompt:true,
    one:1,
    price92:6.2,
    price95: 6.6,
    cardNumber:"",
    choosed:"choosed",
    choosed0: "",
    choosed1: "",
    choosed2: "",
    choosed3: "",
    selected:true,
    selected0: true,
    selected1: true,
    selected2: true,
    selected3: true,
    green:"",
    green0: "",
    green1: "",
    green2: "",
    green3: "",
    bian:"",
    th:"",
    historys:true,
    unionId:{},
    historyLists:[],
    disabled:true,
    cssObj : {
      
    },
    qian:'',
    money:[],
    citysLists: [{ "city": "安徽", "code": "818", "initial": "A" }, { "city": "北京", "code": "810", "initial": "B" }, { "city": "福建", "code": "820", "initial": "F" }, { "city": "甘肃", "code": "822", "initial": "G" }, { "city": "广东", "code": "824", "initial": "G" }, { "city": "广西", "code": "826", "initial": "G" }, { "city": "贵州", "code": "828", "initial": "G" }, { "city": "河北", "code": "832", "initial": "H" }, { "city": "河南", "code": "834", "initial": "H" }, { "city": "黑龙江", "code": "836", "initial": "H" }, { "city": "湖北", "code": "838", "initial": "H" }, { "city": "湖南", "code": "840", "initial": "H" }, { "city": "海南", "code": "830", "initial": "H" }, { "city": "吉林", "code": "811", "initial": "J" }, { "city": "江苏", "code": "813", "initial": "J" }, { "city": "江西", "code": "815", "initial": "J" }, { "city": "辽宁", "code": "818", "initial": "L" }, { "city": "宁夏", "code": "821", "initial": "N" }, { "city": "内蒙古", "code": "819", "initial": "N" }, { "city": "青海", "code": "823", "initial": "Q" }, { "city": "山东", "code": "825", "initial": "S" }, { "city": "山西", "code": "827", "initial": "S" }, { "city": "陕西", "code": "829", "initial": "S" }, { "city": "上海", "code": "812", "initial": "S" }, { "city": "四川", "code": "831", "initial": "S" }, { "city": "天津", "code": "814", "initial": "T" }, { "city": "西藏", "code": "833", "initial": "X" }, { "city": "新疆", "code": "835", "initial": "X" }, { "city": "云南", "code": "837", "initial": "Y" }, { "city": "浙江", "code": "839", "initial": "Z" }, { "city": "重庆", "code": "816", "initial": "Z" }],
  },
  onLoad: function () {
    var unionId = wx.getStorageSync('unionId')
    console.log(unionId)
    var that = this;
   
    /**
     * 定位获取用户当前provice
    */
    wx.getLocation({
      success: function (res) {
        console.log(1111111)
        console.log(res)
        var key = config.Config.key;
        var myAmapFun = new amapFile.AMapWX({ key: key });
        myAmapFun.getRegeo({
          iconWidth: 22,
          iconHeight: 32,
          location: res.longitude + "," + res.latitude,
          success: function (data) {
            console.log("这是用户的当前城市")
            console.log(data)
            var ThisCity = data[0].regeocodeData.addressComponent.province;
            if (ThisCity.indexOf('省') != -1) {
              ThisCity = ThisCity.slice(0, ThisCity.indexOf('省'));
            }
            if (ThisCity.indexOf('市') != -1) {
              ThisCity = ThisCity.slice(0, ThisCity.indexOf('市'));
            }
            if (ThisCity.indexOf('自治区') != -1) {
              ThisCity = ThisCity.slice(0, ThisCity.indexOf('自治区'));
            }
            that.setData({
              motto: ThisCity
            })
            /**
             * 获取到用户经纬度并且转换为具体地址，获取当前城市油价
             * 
            */
            var codes=818;
            var citysLists = that.data.citysLists;
            for (var i in citysLists){
              if (citysLists[i].city != ThisCity){
                that.setData({
                  motto: ThisCity
                })
              }else{
                /**
                 * 请求当前城市的油价
                */
                codes=citysLists[i].code;
                console.log("这儿是当前城市的code:")
                console.log(codes) 
                wx.request({
                  url: 'https://oilprice.chetuobang.com/oil-price/oilPrice?code='+codes,
                  method:"GET",
                  success:function(res){
                    console.log("这儿输出的是当前城市的油价")
                    console.log(res.data)
                    var oilOne = res.data.oil93;
                    var oilTwo = res.data.oil97;
                    that.setData({
                      price92: oilOne,
                      price95:oilTwo                      
                    })
                  },
                  fail:function(info){
                    //console.log("这儿是请求油价失败的回调")
                    //console.log(info)
                    that.setData({
                      price92: '--',
                      price95: '--'
                    })
                  }
                })
              }
            }
          },
          fail: function (info) {
            console.log("高德定位当前信息失败1");
            //失败回调
            console.log(info)
          }
        })
      },
      fail: function (info) {
        console.log("高德定位当前信息失败2");
        //失败回调
        console.log(info)
      }
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    }),
      /**
      * 获取用户
      * */
      app.getLimitInfo(function(unionId) {
        that.setData({
          unionId: unionId
        })
      })
    //调用后台接口，并保存data数据,这是当前可以充值的油价列表
    wx.request({
      url: 'https://oilcard.chetuobang.com/oilcard_recharge/getMoneyList',
      method:'GET',
      data:{},
      success:function(res){
        console.log("请求用户油价列表")
        console.log(res.data.results)
        that.setData({
          money: res.data.results
        })
        var priceData = res.data.results;
        console.log("这是从data中取出来对油价列表")
        console.log(priceData)
        var x = 0;
        for (var i in priceData) {
          x++;
         // console.log(priceData[i])
        }
        var cssObjData = {};
        for (var i = 0; i < x; i++) {
          var tempObj = {
            'choosed': "",
            'green': "",
            'selected': true,
          }
         //2 console.log(i);
          cssObjData[i] = tempObj;
        }
        that.setData({
          cssObj: cssObjData
        })
        wx.setStorageSync("moneyNum", x);
      },
      fail:function(info){
        console.log("服务器出错了")
        console.log(info)
      }
    })
   
    console.log("这是设置的data的money数组；")
    
    
  },//onlad结尾
  /**
   * 点击关闭服务说明close
  */
  close:function(e){
    var that=this;
    //console.log("用户点击了关闭按钮")
    that.setData({
      Prompt:true,
    })
  },
  /**
   * 点击打开服务说明提示open
  */
  open:function(e){
    var that = this;
    //console.log("用户点击了服务说明按钮")
    that.setData({
      Prompt: false,
    })
  },
  /**
   * 当用户输入的时候，请求用户是否有历史记录油卡
  */
  historyRecord:function(e){
    var that = this;
    var inputValue = e.detail.value;
    that.setData({
      cardNumber: inputValue
    })
    // var reg = /^9\d{15}$/;
    // var reg_oneN = /^1\d{18}$/;
    // var carNum = that.data.cardNumber;
    // console.log("这是用户输出的卡号：")
    // console.log(carNum)
    // console.log(reg.test(carNum))
    // console.log(reg_oneN.test(carNum))
    // var z=0;
    // for(var i in carNum){
    //   z++;
    // }
    // console.log(z)
    // if( (z != 16) || (z != 19)){
    //   that.setData({
    //     bian: " ",
    //     disabled: true
    //   })
    // }
    // if (carNum == " ") {
    //   that.setData({
    //     bian: " ",
    //     disabled: true
    //   })
    // }
    // //判断
    // if (reg.test(carNum) ) {
    //   console.log("通过验证，这是中石油的加油卡")
    //   that.setData({
    //     bian: "bian",
    //     disabled: false
    //   })
    // } else if (reg_oneN.test(carNum)) {
    //   console.log("通过验证，这是中石化的加油卡")
    //   that.setData({
    //     bian: "bian",
    //     disabled: false
    //   })
    // } else {
    //   console.log("油卡不正确")
    // }
    
  },
  /**
   * 用户点击X时候，清空输入框的值
  */
  clearInput:function(e){
    var that=this;
    //console.log("用户点击了清空输入框按钮")
    //console.log(e)
    that.setData({
      cardNumber:" ",
      bian: " ",
      disabled: true
    })
  },
  /**
   * 点击金额的时候给当前元素添加样式
  */
  Amount:function(e){
    var that=this;
    //console.log("这里输出的是当前用户点击money获取到的信息")
    console.log(e.target.dataset.value);
    that.setData({
      th : e.target.dataset.id,
      qian: e.target.dataset.value
    })
    //console.log(that.data.th);
    if (e.target.dataset.id == undefined || e.target.dataset.id === "" || e.target.dataset.value === '' || e.target.dataset.value == undefined){
      return;
    }
    var moneyNum = wx.getStorageSync('moneyNum');
    var cssObjData = {
      'choosed': "",
      'green': "",
      'selected': true,
    };
    for(var i =0;i<moneyNum;i++){
      var tempObj = {
        'choosed': "",
        'green': "",
        'selected': true,
      }
      //console.log(i);
      cssObjData[i] = tempObj;
    }
    var id = e.target.dataset.id;
    id = parseInt(id);
    cssObjData[id].choosed = "choosed";
    cssObjData[id].green = "green";
    cssObjData[id].selected = false;
    this.setData({
      cssObj: cssObjData
    })
    //console.log(id)
    
  },
  /**
   * input框失去焦点的时候，验证油卡
  */
  reg:function(e){
    var that=this;
    that.setData({
      historys: true
    })
    var reg = /^9[0-9]{15}$/;
    var reg_oneN = /^1[0-9]{18}$/;
    var carNum = that.data.cardNumber;
    carNum=trim(carNum)
    if(carNum == " "){
      that.setData({
        bian: " ",
        disabled: true
      })
    }
    var x = 0;
    for (var i in carNum) {
      x++;
    }
    console.log(x)
    //如果用户输入的充值卡卡号不是16位或者19位的话
    if ((x == 16) && (reg.test(carNum) == true)){
      console.log("用户输入的卡号是16位或者19位")
      that.setData({
        bian: "bian",
        disabled: false
      })
    } else if ((x == 19) && (reg_oneN.test(carNum) == true)){
      console.log("用户输入的卡号不是16位或者19位")
      that.setData({
        bian:"bian",
        disabled: false
      })
    } else {
      console.log("油卡不正确")
      wx.showToast({
        title: '油卡不正确',
        icon: 'error',
        duration:1000
      })
      that.setData({
        bian: "",
        disabled: true
      })
    }
    console.log(carNum)
    console.log(reg.test(carNum))
    console.log(reg_oneN.test(carNum))
    // if (reg.test(carNum)){
      
    //   console.log("通过验证，这是中石油的加油卡")
    //   that.setData({
    //     bian:"bian",
    //     disabled:false
    //   })
    // } else if (reg_oneN.test(carNum)){
    //   console.log("通过验证，这是中石化的加油卡")
    //   that.setData({
    //     bian: "bian",
    //     disabled: false
    //   })
    // }else{
    //   console.log("油卡不正确")
    //   wx.showToast({
    //     title: '油卡不正确',
    //     icon:'error'
    //   })
    // }
  },
  /**
   * 提交卡号和金额
  */
  submit:function(e){
    console.log("刚才点击了提交按钮呀")
    var that=this;
    var qianqian=that.data.qian;
    var unionId = wx.getStorageSync('unionId')
    var selected=that.data.th;
    var carNumberInfo = that.data.cardNumber;
    carNumberInfo = trim(carNumberInfo)
    var reg = /^9\d{15}/;
    var reg_oneN = /^1\d{18}/;
    console.log(selected)
    console.log(carNumberInfo)
    console.log(reg_oneN.test(carNumberInfo) && (selected != " "))
    console.log(reg.test(carNumberInfo) && (selected != " "))
    if(carNumberInfo === " "){
      return false;
    } else if (reg.test(carNumberInfo) && (qianqian != " ")){
      console.log("中石油加油卡号OK")
      wx.navigateTo({
        url: '../charge/charge?money=' + qianqian + '&carNum=' + carNumberInfo,
               success:function(res){
                 console.log("跳转成功")
               },fail:function(info){
                 console.log("跳转失败")
               }
             })
    } else if (reg_oneN.test(carNumberInfo) && (qianqian != "")){
      console.log("中石化加油卡号OK")
      wx.navigateTo({
        url: '../charge/charge?money=' + qianqian + '&carNum=' + carNumberInfo,
               success:function(res){
                 console.log("跳转成功")
               },fail:function(info){
                 console.log("跳转失败")
               }
             })
    }
  },
  /**
   * 用户获取焦点的时候，请求用户的历史信息
  */
  historyList:function(e){
    var that=this;
    var unionId = wx.getStorageSync('unionId');
      console.log("是时候去看看用户有没有历史信息了");
      wx.request({
        url: 'https://oilcard.chetuobang.com/oilcard_recharge/getOilCardList/'+unionId,
        method:'GET',
        data:{},
        success:function(res){
          console.log("请求到了用户的历史消息")
          console.log(res.data.results)
          var xiaoBO = res.data.results;
          var o=0;
          for (var s in xiaoBO){
            o++;
          }
          if(o< 1){
            console.log("当前用户没有历史记录")
            that.setData({
              historys: true
            })
          }else{
            console.log("这里是用户的历史记录");
            that.setData({
              historys:false,
              historyLists: res.data.results
              })
             
              
          }
        },
        fail:function(info){
          console.log("请求失败了哦");
          console.log(info)
        }
      })
  },
  /**
   * 清空历史记录
  */
  clear:function(e){
    console.log("用户点击了清空按钮")
    var that=this;
    var unionId = wx.getStorageSync('unionId');
    wx.request({
      url: 'https://oilcard.chetuobang.com/oilcard_recharge/destroyCard/'+unionId,
      method:'GET',
      data: { unionId: unionId},
      success:function(res){
        console.log("清空历史成功")
        console.log(res)
          that.setData({
            historys:true
          })
      },
      fail:function(info){
        console.log("清空历史失败了哦，肯定是服务器的问题")
      }
    })
  },
  /**
   * 点击历史记录其中的一项，传值到input框，设为其值
  */  
  carNumberTap:function(e){
    var that=this;
      console.log("这里输出的是用户点击的值")
      console.log(e.target.dataset.card)
      var carNums = e.target.dataset.card;
      that.setData({
        cardNumber: carNums,
        historys: true
      })
      var reg = /^9[0-9]{15}$/;
      var reg_oneN = /^1[0-9]{18}$/;
      var carNum = that.data.cardNumber;

      if (carNum == " ") {
        that.setData({
          bian: " ",
          disabled: true
        })
      }
      var x = 0;
      for (var i in carNum) {
        x++;
      }
      console.log(x)
      //如果用户输入的充值卡卡号不是16位或者19位的话
      if ((x == 16) && (reg.test(carNum) == true)) {
        console.log("用户输入的卡号是16位或者19位")
        that.setData({
          bian: "bian",
          disabled: false
        })
      } else if ((x == 19) && (reg_oneN.test(carNum) == true)) {
        console.log("用户输入的卡号不是16位或者19位")
        that.setData({
          bian: "bian",
          disabled: false
        })
      } else {
        console.log(x)
        console.log(reg.test(carNum))
        console.log(reg_oneN.test(carNum))
        console.log("油卡不正确")
        that.setData({
          bian: "",
          disabled: true
        })
      }
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
    return {
      title:'油卡充值',
      path:'/pages/index/index'
    }
  }
})
function trim(s) {
  return s.replace(/(^\s*)|(\s*$)/g, "");
}