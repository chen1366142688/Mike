var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location:"北京",
    data:"2017-07-13",
    qiyou1:5.47,
    qiyou2:5.37,
    qiyou3: 5.9,
    chaiYou:3.37,
    up:true,
    down: true, 
    up2: true,
    down2: true,
    up3: true,
    down3: true,
    up4: true,
    down4: true,
    from1:false,
    from2:true,
    citysLists: [{ "city": "安徽", "code": "818", "initial": "A" }, { "city": "北京", "code": "810", "initial": "B" }, { "city": "福建", "code": "820", "initial": "F" }, { "city": "甘肃", "code": "822", "initial": "G" }, { "city": "广东", "code": "824", "initial": "G" }, { "city": "广西", "code": "826", "initial": "G" }, { "city": "贵州", "code": "828", "initial": "G" }, { "city": "河北", "code": "832", "initial": "H" }, { "city": "河南", "code": "834", "initial": "H" }, { "city": "黑龙江", "code": "836", "initial": "H" }, { "city": "湖北", "code": "838", "initial": "H" }, { "city": "湖南", "code": "840", "initial": "H" }, { "city": "海南", "code": "830", "initial": "H" }, { "city": "吉林", "code": "811", "initial": "J" }, { "city": "江苏", "code": "813", "initial": "J" }, { "city": "江西", "code": "815", "initial": "J" }, { "city": "辽宁", "code": "817", "initial": "L" }, { "city": "宁夏", "code": "821", "initial": "N" }, { "city": "内蒙古", "code": "819", "initial": "N" }, { "city": "青海", "code": "823", "initial": "Q" }, { "city": "山东", "code": "825", "initial": "S" }, { "city": "山西", "code": "827", "initial": "S" }, { "city": "陕西", "code": "829", "initial": "S" }, { "city": "上海", "code": "812", "initial": "S" }, { "city": "四川", "code": "831", "initial": "S" }, { "city": "天津", "code": "814", "initial": "T" }, { "city": "西藏", "code": "833", "initial": "X" }, { "city": "新疆", "code": "835", "initial": "X" }, { "city": "云南", "code": "837", "initial": "Y" }, { "city": "浙江", "code": "839", "initial": "Z" }, { "city": "重庆", "code": "816", "initial": "Z" }],
    codes:810,
    list: ["安徽", "北京", "重庆", "福建", "甘肃", "广西", "贵州", "广东", "河南", "黑龙江", "河北", "湖南", "湖北", "海南", "江西", "江苏", "吉林", "辽宁", "宁夏", "内蒙古", "青海", "山西", "山东", "陕西", "上海", "四川", "天津", "新疆", "西藏", "云南","浙江"]
  },
  select:function(e){
    var that=this;
    var look=that.data.location;
    console.log(e)
    wx.redirectTo({
      url: '../switchcity/switchcity?code='+look,
      success: function(res) {
        console.log("跳转成功")
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '玩命加载中....',
    })
    // 实例化API核心类
    var util = require('../../utils/util.js');
    var date = util.formatTime(new Date);
    var dangDate = date.slice(0, 11);
    var dangQian = dangDate.replace(/\//g, "-");
    that.setData({
      date: dangQian
    })
    console.log(options.name)
    var selects=options.name;
    if (selects){
      that.setData({
        location:selects
      })

      var citysLists = that.data.citysLists;
      var weizhi = that.data.location;
      var codes;
      for (var i in citysLists) {
        if (citysLists[i].city == weizhi) {
          console.log(111)
          console.log(citysLists[i].code)
          codes = citysLists[i].code;
        }

      }
      that.setData({
        codes: codes
      })
      var hao = that.data.codes;
      //判断当前城市是否在列表中
      var list = that.data.list;
      if (list.indexOf(weizhi) == -1) {
        that.setData({
          from1: true,
          from2: false
        })
      } else {
        that.setData({
          from1: false,
          from2: true
        })
      }
      console.log(hao)
      wx.request({
        url: 'https://oilprice.chetuobang.com/oil-price/oilPrice?code=' + hao,
        method: "GET",
        success: function (res) {
          console.log("请求到当前城市的油价")
          var oilTrend = res.data.oilTrend;
          oilTrend = JSON.parse(oilTrend)
          var Ninety = res.data.oil90;
          var NinetyThree = res.data.oil93;
          var NinetyEleven = res.data.oil97;
          var oilZero = res.data.oilZero;
          that.setData({
            qiyou1: Ninety,
            qiyou2: NinetyThree,
            qiyou3: NinetyEleven,
            chaiYou: oilZero
          })
          //判断90号汽油的价格涨跌
          console.log(oilTrend.ninety_gasoline)
          if (oilTrend.ninety_gasoline == 1) {
            that.setData({
              up: false
            })
          } else if (oilTrend.ninety_gasoline == -1) {
            that.setData({
              down: false
            })
          }
          //判断93号汽油的价格涨跌ninety_three_gasoline
          if (oilTrend.ninety_three_gasoline == 1) {
            that.setData({
              up2: false
            })
          } else if (oilTrend.ninety_three_gasoline == -1) {
            that.setData({
              down2: false
            })
          }
          //判断97号汽油的价格涨跌
          if (oilTrend.ninety_seven_gasoline == 1) {
            that.setData({
              up3 :false
            })
          } else if (oilTrend.ninety_seven_gasoline == -1) {
            that.setData({
              down3: false
            })
          }
          //判断0号柴油的价格涨跌
          if (oilTrend.zero_diesel == 1) {
            that.setData({
              up4: false
            })
          } else if (oilTrend.zero_diesel == -1) {
            that.setData({
              down4: false
            })
          }
          wx.hideLoading()
          console.log(res.data)
          return false;
        },
        fail: function (res) {
          console.log("获取数据失败或定位失败")
        }
      })



      console.log("现在应该是显示城市是当前用户选择的城市")
    }else{
      console.log("现在应该是显示城市是北京")
      
    
    console.log(that.data.location)
    var util = require('../../utils/util.js');
    var date = util.formatTime(new Date);
    var dangDate = date.slice(0, 11);
    var dangQian = dangDate.replace(/\//g, "-");
    that.setData({
      date:dangQian
    })
    console.log(dangQian)

    qqmapsdk = new QQMapWX({
      key: 'SFHBZ-3IUK4-EMAUV-DBVJA-SSHTQ-EHBOO'
    });
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          lat: latitude,
          long: longitude
        })
        var key = config.Config.key;
        var myAmapFun = new amapFile.AMapWX({ key: key });
        myAmapFun.getRegeo({
          iconPath: "../../img/icon_hot.png",
          iconWidth: 22,
          iconHeight: 32,
          location: longitude + "," + latitude,
          // success: function (data) {
          //   console.log("高德定位当前信息");
          //   console.log(data[0].regeocodeData.addressComponent.province);
          //   //成功回调

          // },
          success: function (data) {
            console.log(data[0].regeocodeData.addressComponent.province)

            var weiZhi = data[0].regeocodeData.addressComponent.province;
            //weiZhi = weiZhi.slice(0, length - 1);
            if (weiZhi.indexOf('省') != -1) {
              weiZhi = weiZhi.slice(0, weiZhi.indexOf('省'));
            }
            if (weiZhi.indexOf('市') != -1) {
              weiZhi = weiZhi.slice(0, weiZhi.indexOf('市'));
            }
            if (weiZhi.indexOf('自治区') != -1) {
              weiZhi = weiZhi.slice(0, weiZhi.indexOf('自治区'));
            }
            console.log(weiZhi);
            that.setData({
              location: weiZhi
            })
            //判断当前城市是否在列表中
            var list = that.data.list;
            if (list.indexOf(weiZhi) == -1) {
              that.setData({
                from1: true,
                from2: false
              })
            } else {
              that.setData({
                from1: false,
                from2: true
              })
            }

            var citysLists = that.data.citysLists;
            var weizhi = that.data.location;
            var codes;
            for (var i in citysLists) {
              if (citysLists[i].city == weizhi) {
                console.log(111)
                console.log(citysLists[i].code)
                codes = citysLists[i].code;
              }

            }
            that.setData({
              codes: codes
            })
            // //定位成功之后发送请求，请求用户当前城市的油价；
            var wei = that.data.location;
            var hao = that.data.codes;
            wx.request({
              url: 'https://oilprice.chetuobang.com/oil-price/oilPrice?code=' + hao,
              method: "GET",
              success: function (res) {
                console.log("请求到当前城市的油价")
                var oilTrend = res.data.oilTrend;
                oilTrend = JSON.parse(oilTrend)
                var Ninety = res.data.oil90;
                var NinetyThree = res.data.oil93;
                var NinetyEleven = res.data.oil97;
                var oilZero = res.data.oilZero;
                that.setData({
                  qiyou1: Ninety,
                  qiyou2: NinetyThree,
                  qiyou3: NinetyEleven,
                  chaiYou: oilZero
                })
                //判断90号汽油的价格涨跌
                console.log(oilTrend)
                if (oilTrend.ninety_gasoline == 1) {
                  that.setData({
                    up: false
                  })
                } else if (oilTrend.ninety_gasoline == -1) {
                  that.setData({
                    down: false
                  })
                }
                //判断93号汽油的价格涨跌
                console.log(oilTrend.ninety_three_gasoline)
                if (oilTrend.ninety_three_gasoline == 1) {

                  that.setData({
                    up2: false
                  })
                  console.log(that.data.up2)
                } else if (oilTrend.ninety_three_gasoline == -1) {
                  that.setData({
                    down2: false
                  })
                }
                //判断97号汽油的价格涨跌
                if (oilTrend.ninety_seven_gasoline == 1) {
                  that.setData({
                    up3: false
                  })
                } else if (oilTrend.ninety_seven_gasoline == -1) {
                  that.setData({
                    down3: false
                  })
                }
                //判断0号柴油的价格涨跌
                if (oilTrend.zero_diesel == 1) {
                  that.setData({
                    up4: false
                  })
                } else if (oilTrend.zero_diesel == -1) {
                  that.setData({
                    down4: false
                  })
                }
                wx.hideLoading()
                console.log(res.data)
              },
              fail: function (res) {
                console.log("获取数据失败或定位失败")
              }
            })


          },
          fail: function (info) {
            console.log("高德定位当前信息失败");
            //失败回调
            console.log(info)
          }
        })






        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          // success: function (res) {
          //   console.log(res.result.ad_info.province)

          //   var weiZhi = res.result.ad_info.province;
          //   //weiZhi = weiZhi.slice(0, length - 1);
          //   if (weiZhi.indexOf('省') != -1) {
          //     weiZhi = weiZhi.slice(0, weiZhi.indexOf('省'));
          //   }
          //   if (weiZhi.indexOf('市') != -1) {
          //     weiZhi = weiZhi.slice(0, weiZhi.indexOf('市'));
          //   }
          //   if (weiZhi.indexOf('自治区') != -1) {
          //     weiZhi = weiZhi.slice(0, weiZhi.indexOf('自治区'));
          //   }
          //   console.log(weiZhi);
          //   that.setData({
          //     location: weiZhi
          //   })
          //   //判断当前城市是否在列表中
          //   var list=that.data.list;
          //   if (list.indexOf(weiZhi) == -1){
          //         that.setData({
          //           from1:true,
          //           from2:false
          //         })
          //     }else{
          //       that.setData({
          //         from1: false,
          //         from2: true
          //       })
          //     }
            
          //   var citysLists=that.data.citysLists;
          //   var weizhi=that.data.location;
          //   var codes;
          //   for(var i in citysLists){
          //     if(citysLists[i].city==weizhi){
          //       console.log(111)
          //       console.log(citysLists[i].code)
          //       codes = citysLists[i].code;
          //     }

          //   }
          //   that.setData({
          //     codes:codes
          //   })
          //   // //定位成功之后发送请求，请求用户当前城市的油价；
          //   var wei = that.data.location;
          //   var hao = that.data.codes;
          //   wx.request({
          //     url: 'https://oilprice.chetuobang.com/oil-price/oilPrice?code='+hao,
          //     method:"GET",
          //     success: function (res) {
          //       console.log("请求到当前城市的油价")
          //       var oilTrend = res.data.oilTrend;
          //       oilTrend = JSON.parse(oilTrend)
          //       var Ninety = res.data.oil90;
          //       var NinetyThree = res.data.oil93;
          //       var NinetyEleven = res.data.oil97;
          //       var oilZero = res.data.oilZero;
          //       that.setData({
          //         qiyou1: Ninety,
          //         qiyou2: NinetyThree,
          //         qiyou3: NinetyEleven,
          //         chaiYou: oilZero
          //       })
          //       //判断90号汽油的价格涨跌
          //       console.log(oilTrend)
          //       if (oilTrend.ninety_gasoline==1){
          //         that.setData({
          //               up:false
          //           })
          //       } else if (oilTrend.ninety_gasoline == -1){
          //         that.setData({
          //             down: false
          //         })
          //       }
          //       //判断93号汽油的价格涨跌
          //       console.log(oilTrend.ninety_three_gasoline)
          //       if (oilTrend.ninety_three_gasoline == 1) {
                  
          //         that.setData({
          //           up2: false
          //         })
          //         console.log(that.data.up2)
          //       } else if (oilTrend.ninety_three_gasoline == -1) {
          //         that.setData({
          //           down2: false
          //         })
          //       }
          //       //判断97号汽油的价格涨跌
          //       if (oilTrend.ninety_seven_gasoline == 1) {
          //         that.setData({
          //           up3: false
          //         })
          //       } else if (oilTrend.ninety_seven_gasoline == -1) {
          //         that.setData({
          //           down3: false
          //         })
          //       }
          //       //判断0号柴油的价格涨跌
          //       if (oilTrend.zero_diesel == 1) {
          //         that.setData({
          //           up4: false
          //         })
          //       } else if (oilTrend.zero_diesel == -1) {
          //         that.setData({
          //           down4: false
          //         })
          //       }
          //       wx.hideLoading()
          //       console.log(res.data)
          //     },
          //     fail: function (res) {
          //       console.log("获取数据失败或定位失败")
          //     }
          //   })

            
          // },
          fail: function (res) {
            console.log(res);
          },
        });
      }
    })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // var key = config.Config.key;
    // var myAmapFun = new amapFile.AMapWX({ key: key });
    // var markers = [
    //   {}, {}
    // ];
    // myAmapFun.getRegeo({
    //   iconPath: "../../img/marker.png",
    //   iconWidth: 22,
    //   iconHeight: 32,
    //   location: res.longitude + "," + res.latitude,
    //   success: function (data) {
    //     console.log("高德定位当前信息");
    //     console.log(data);
    //     that.setData({
    //       start_name: data[0].name
    //     })
    //     var cityName = data[0].regeocodeData.addressComponent.province;
    //     wx.setStorageSync('cityName', cityName);
    //     wx.setStorageSync('start', data[0].name);
    //     wx.setStorageSync('start_location', res.longitude + "," + res.latitude);
    //     //成功回调
    //   },
    //   fail: function (info) {
    //     console.log("高德定位当前信息失败");
    //     //失败回调
    //     console.log(info)
    //   }
    // })
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