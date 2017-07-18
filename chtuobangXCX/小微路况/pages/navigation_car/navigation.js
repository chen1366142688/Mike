var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
//https://oilprice.chetuobang.com/oil-price/route/addRoute
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    longitude:"116.3973900000",
    latitude:"39.9088600000",
    end_name:"",
    start_name:"",
    query:true,//显示请查询路线
    result:false,//显示用户的路线items
    init:false,//颜色按钮
    inits: true,//灰色按钮
    markers: [{
      iconPath: "../../img/mapicon_navi_s.png",
      id: 0,
      latitude: 39.9088600000,
      longitude: 116.3973900000,
      width: 23,
      height: 33
    }],
    distance: '',
    cost: '',
    duration:'',
    polyline: [],
    route:[
      { 
        "titleRoute": "未添加" ,
        'style_img' : true,
        'style_font': "add_adding"
      }, 
      { 
        "titleRoute": "未添加",
        'style_img': true,
        'style_font': "add_adding"
      },
      {
        "titleRoute": "未添加",
        'style_img': true,
        'style_font': "add_adding"
      } 
    ],
    indexStatus :0,
    bug:true
  },
  /**
   * 点击当前名称显示当前规划路线
   * activeRoute
  */
  activeRoute:function(e){
    var that = this;
    if (e.target.dataset.id.startGeo == undefined){
      return;
    }
    var userRouteData = e.target.dataset.id;
    try {
      var start_name = userRouteData.startAddress;
      that.setData({
        start_name: start_name
      })
      var end_name = userRouteData.endAddress;
      that.setData({
        end_name: end_name
      })
      var start_location = userRouteData.startGeo;
      var end_location = userRouteData.endGeo;
      var start_locations = new Array(); //定义一数组 
      start_locations = start_location.split(","); //字符分割
      var end_locations = new Array(); //定义一数组 
      end_locations = end_location.split(","); //字符分割
      var markers = [
        {}, {}
      ];
      markers[0].longitude = start_locations[0];
      markers[0].latitude = start_locations[1];
      markers[0].iconPath = "../../img/mapicon_navi_s.png";
      markers[0].id = 0;
      markers[0].width = 23;
      markers[0].height = 33;
      markers[1].longitude = end_locations[0];
      markers[1].latitude = end_locations[1];
      markers[1].iconPath = "../../img/mapicon_navi_e.png";
      markers[1].id = 0;
      markers[1].width = 24;
      markers[1].height = 34;
      that.setData({
        longitude: start_locations[0],
        latitude: start_locations[1],
        markers:markers
      })
      if (start_name != "" && end_name != "") {
        //console.log(1231231);
        //console.log(start_location);
        var key = config.Config.key;
        var myAmapFun = new amapFile.AMapWX({ key: key });
        myAmapFun.getDrivingRoute({
          // origin: '116.59682,40.08243',
          // destination: '102.92857,25.09622',
          origin: start_location,
          destination: end_location,

          // origin: '40.08243,116.59682',//start_lang
          // destination: '25.09622,102.92857',//end_lang
          success: function (data) {
            var points = [];
            if (data.paths && data.paths[0] && data.paths[0].steps) {
              var steps = data.paths[0].steps;
              for (var i = 0; i < steps.length; i++) {
                var poLen = steps[i].polyline.split(';');
                for (var j = 0; j < poLen.length; j++) {
                  points.push({
                    longitude: parseFloat(poLen[j].split(',')[0]),
                    latitude: parseFloat(poLen[j].split(',')[1])
                  })
                }
              }
            }
            that.setData({
              polyline: [{
                points: points,
                color: "#0091ff",
                width: 6
              }]
            });
            //console.log(data)
            if (data.paths[0] && data.paths[0].distance) {
              that.setData({
                distance: '距离:' + parseFloat(data.paths[0].distance / 1000).toFixed(1) + '公里'
              });
            }
            if (data.paths[0] && data.paths[0].duration) {
              that.setData({
                duration: '时间:' + parseInt(data.paths[0].duration / 60) + '分钟'
              });
            }
            if (data.taxi_cost) {
              that.setData({
                cost: '打车费用约' + parseInt(data.taxi_cost) + '元'
              });
            }

          }
        })
        //console.log("现在可以开始规划路线了");
        that.setData({
          init: true,
          inits: false
        })
      }
    } catch (e) {
      //console.log("error")
    }
    //console.log(e)
  },
  //获取用户输入的起点的值
  start:function(e){
    var unionId = wx.getStorageSync('unionId');
    console.log(unionId);
    if(unionId == ""){
      return;
    }
    wx.navigateTo({
      url: "/pages/searchArea/searchArea?button_type=start"
    })
  },
  //获取用户输入的终点的值
  end: function (e) { 
    var unionId = wx.getStorageSync('unionId');
    if (unionId == "") {
      return;
    }
    wx.navigateTo({
      url: "/pages/searchArea/searchArea?button_type=end"
    })
  },
  //删除路线
  delete:function(e){
    wx.navigateTo({
      url: "/pages/manage/manage?route=deletes"
    })
  },
  //添加路线名称
  add:function(e){
    var routeList = this.data.route;
    var x =0 ;
    for(var i in routeList){
      if (routeList[i].startGeo !=undefined){
        x++;
      }
    }
    if(x >= 3){
      var url = '/pages/manage/manage?limit=3&route=deletes';
      console.log(url)
      wx.navigateTo({
        url: url
      })
    }else{
      if (!this.data.inits) {
        wx.navigateTo({
          url: "/pages/manage/manage?route=add"
        })
      }
    }
    
  },
  onLoad: function (options){
    //获取用户设备信息
    var mobileInfo = wx.getSystemInfoSync();
    console.log(mobileInfo);
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code;
        console.log(code)
        wx.getUserInfo({
          success: function (entrcyUserinfo) {
            console.log("用户加密信息")
            console.log(entrcyUserinfo)
            //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
            wx.request({
              url: 'https://wzcx.chetuobang.com/wz_api/?service=xcx.index',
              method: "POST",
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                encryptedData: entrcyUserinfo.encryptedData,
                iv: entrcyUserinfo.iv,
                code: code
              },
              success: function (r) {
                console.log("获取用户的uionid")
                console.log(r)
                var result = r.data;
                //result = result.slice(result.indexOf("{"));
                //var userInfoObj = JSON.parse(result);
                console.log("用户信息")
                console.log(result);
                //  wx.setStorage({
                //    key: 'unionId',
                //    data: result.unionId,
                //  })
                wx.setStorageSync('unionId', result.unionId);
                
                  if (typeof options.navigation != 'undefined') {
                    console.log("非第一次进入");
                    that.setData({
                      indexStatus: 1
                    })
                  }

                  var unionId = wx.getStorageSync('unionId');
                  wx.request({
                    url: 'https://oilprice.chetuobang.com/oil-price/route/routeList',
                    method: 'GET',
                    data: {
                      unionId: unionId
                    },
                    // "first": {
                    //   "titleRoute": "添加"
                    // },
                    // "second": {
                    //   "titleRoute": "未添加"
                    // },
                    // "third": {
                    //   "titleRoute": "未添加"
                    // } 
                    success: function (res) {
                      console.log("后端接口调用成功");
                      //console.log(res);
                      if (res.statusCode == 200) {

                        var result = res.data.data;
                        //console.log(result);
                        var j = 0;
                        console.log(result);
                        for (var i in result) {
                          result[i].style_img = true;
                          result[i].style_font = "add_added";
                          var b = 0;
                          var c = "";
                          for (var a in result[i].titleRoute){
                            console.log("循环次数"+a);
                            b++;
                            // if(b <= 6){
                            //   c += result[i].titleRoute[a];
                            // }
                          }
                          //傻逼提出的6
                          if(b>6){
                            result[i].titleRoute = result[i].titleRoute.substr(0,6);
                          }
                          j++;
                        }
                        //console.log("J的值"+j);
                        if (that.data.indexStatus != 1) {
                          if (j > 0) {
                            that.setData({
                              indexStatus: 1
                            })
                            wx.setStorageSync('start', result[0].startAddress);
                            wx.setStorageSync('end', result[0].endAddress);
                            wx.setStorageSync('start_location', result[0].startGeo);
                            wx.setStorageSync('end_location', result[0].endGeo);
                            var start_locations = new Array(); //定义一数组 
                            start_locations = result[0].startGeo.split(","); //字符分割
                            var end_locations = new Array(); //定义一数组 
                            end_locations = result[0].endGeo.split(","); //字符分割
                            var markers = [
                              {}, {}
                            ];
                            markers[0].longitude = start_locations[0];
                            markers[0].latitude = start_locations[1];
                            markers[0].iconPath = "../../img/mapicon_navi_s.png";
                            markers[0].id = 0;
                            markers[0].width = 23;
                            markers[0].height = 33;
                            markers[1].longitude = end_locations[0];
                            markers[1].latitude = end_locations[1];
                            markers[1].iconPath = "../../img/mapicon_navi_e.png";
                            markers[1].id = 0;
                            markers[1].width = 24;
                            markers[1].height = 34;
                            that.setData({
                              longitude: start_locations[0],
                              latitude: start_locations[1],
                              markers: markers
                            })
                            that.setData({
                              query: true
                            })
                          } else {
                            that.setData({
                              query: false
                            })
                          }
                        }
                        //var u = (parseInt(i)+1);
                        if (j < 3) {
                          for (var x = j; x <= 2; x++) {
                            //console.log(x);
                            result[x] = {};
                            result[x].titleRoute = "未添加";

                            if (style_img == undefined) {
                              result[x].style_img = true;
                              result[x].style_font = "add_adding";
                              var style_img = 1;
                            } else {
                              result[x].style_img = true;
                              result[x].style_font = "add_adding";
                            }

                          }
                        }
                        that.setData({
                          route: result
                        })
                      }
                      console.log("是否规划标识");
                      console.log(that.data.indexStatus);
                      if (that.data.indexStatus == 1) {
                        try {
                          console.log("进行路线规划");
                          var start_name = wx.getStorageSync('start')
                          that.setData({
                            start_name: start_name
                          })
                          var end_name = wx.getStorageSync('end')
                          that.setData({
                            end_name: end_name
                          })
                          var start_location = wx.getStorageSync('start_location')
                          var end_location = wx.getStorageSync('end_location')
                          //console.log(start_name+end_name+start_location+end_location);
                          var start_locations = new Array(); //定义一数组 
                          start_locations = start_location.split(","); //字符分割
                          var end_locations = new Array(); //定义一数组 
                          end_locations = end_location.split(","); //字符分割
                          var markers = [
                            {}, {}
                          ];
                          markers[0].longitude = start_locations[0];
                          markers[0].latitude = start_locations[1];
                          markers[0].iconPath = "../../img/mapicon_navi_s.png";
                          markers[0].id = 0;
                          markers[0].width = 23;
                          markers[0].height = 33;
                          markers[1].longitude = end_locations[0];
                          markers[1].latitude = end_locations[1];
                          markers[1].iconPath = "../../img/mapicon_navi_e.png";
                          markers[1].id = 0;
                          markers[1].width = 24;
                          markers[1].height = 34;
                          that.setData({
                            longitude: start_locations[0],
                            latitude: start_locations[1],
                            markers: markers
                          })
                          if (start_name != "" && end_name != "") {
                            //console.log(1231231);
                            //console.log(start_location);
                            var key = config.Config.key;
                            var myAmapFun = new amapFile.AMapWX({ key: key });
                            myAmapFun.getDrivingRoute({
                              // origin: '116.59682,40.08243',
                              // destination: '102.92857,25.09622',
                              origin: start_location,
                              destination: end_location,

                              // origin: '40.08243,116.59682',//start_lang
                              // destination: '25.09622,102.92857',//end_lang
                              success: function (data) {
                                var points = [];
                                if (data.paths && data.paths[0] && data.paths[0].steps) {
                                  var steps = data.paths[0].steps;
                                  for (var i = 0; i < steps.length; i++) {
                                    var poLen = steps[i].polyline.split(';');
                                    for (var j = 0; j < poLen.length; j++) {
                                      points.push({
                                        longitude: parseFloat(poLen[j].split(',')[0]),
                                        latitude: parseFloat(poLen[j].split(',')[1])
                                      })
                                    }
                                  }
                                }
                                that.setData({
                                  polyline: [{
                                    points: points,
                                    color: "#0091ff",
                                    width: 6
                                  }]
                                });
                                //console.log(data)
                                if (data.paths[0] && data.paths[0].distance) {
                                  that.setData({
                                    distance: '距离:' + parseFloat(data.paths[0].distance / 1000).toFixed(1) + '公里'
                                  });
                                }
                                if (data.paths[0] && data.paths[0].duration) {
                                  that.setData({
                                    duration: '时间:' + parseInt(data.paths[0].duration / 60) + '分钟'
                                  });
                                }
                                if (data.taxi_cost) {
                                  that.setData({
                                    cost: '打车费用约' + parseInt(data.taxi_cost) + '元'
                                  });
                                }

                              }
                            })
                            //console.log("现在可以开始规划路线了");
                            that.setData({
                              init: true,
                              inits: false
                            })
                          }
                        } catch (e) {
                          console.log("路线规划，try失败了啊，信息是下面的")
                          console.log(e);
                        }
                      }
                      //console.log("onload");
                      //console.log(that.data.indexStatus);
                      if (that.data.indexStatus != 1) {
                        console.log("开始定位");

                        wx.getLocation({
                          type: 'gcj02', //返回可以用于wx.openLocation的经纬度
                          success: function (res) {
                            console.log("定位成功");
                            console.log("定位信息如下");
                            console.log(res);
                            var key = config.Config.key;
                            var myAmapFun = new amapFile.AMapWX({ key: key });
                            // markers: [{
                            //   iconPath: "../../img/mapicon_navi_s.png",
                            //   id: 0,
                            //   latitude: 39.90960456049752N,
                            //   longitude: 116.481028,
                            //   width: 23,
                            //   height: 33
                            // }],
                            var markers = [
                              {}, {}
                            ];
                            markers[0].longitude = res.longitude;
                            markers[0].latitude = res.latitude;
                            markers[0].iconPath = "../../img/mapicon_navi_s.png";
                            markers[0].id = 0;
                            markers[0].width = 23;
                            markers[0].height = 33;
                            that.setData({
                              longitude: res.longitude,
                              latitude: res.latitude,
                              markers: markers
                            })
                            console.log("微信的定位信息");
                            console.log(res);
                            myAmapFun.getRegeo({
                              iconPath: "../../img/marker.png",
                              iconWidth: 22,
                              iconHeight: 32,
                              location: res.longitude + "," + res.latitude,
                              success: function (data) {
                                console.log("高德定位当前信息");
                                console.log(data);
                                that.setData({
                                  start_name: data[0].name
                                })
                                var cityName = data[0].regeocodeData.addressComponent.province;
                                wx.setStorageSync('cityName', cityName);
                                wx.setStorageSync('start', data[0].name);
                                wx.setStorageSync('start_location', res.longitude + "," + res.latitude);
                                //成功回调
                              },
                              fail: function (info) {
                                console.log("高德定位当前信息失败");
                                //失败回调
                                console.log(info)
                              }
                            })
                            // qqmapsdk = new QQMapWX({
                            //   key: 'SFHBZ-3IUK4-EMAUV-DBVJA-SSHTQ-EHBOO'
                            // });
                            // console.log("定位坐标转文字，开始转换");
                            // qqmapsdk.reverseGeocoder({
                            //   location: {
                            //     latitude: res.latitude,
                            //     longitude: res.longitude
                            //   },
                            //   success: function (res) {
                            //     console.log("定位坐标转文字，转换成功");
                            //     that.setData({
                            //       start_name: res.result.address
                            //     })
                            //   },
                            //   fail: function (res) {
                            //     console.log("定位坐标转文字，转换失败，失败信息如下");
                            //     console.log(res);
                            //     //console.log(res);
                            //   },
                            //   complete: function (res) {
                            //     //console.log(res);
                            //   }
                            // })
                          },
                        })
                      }
                      var key = config.Config.key;

                    },
                    fail: function (res) {
                      //console.log("访问失败");
                    }
                  })
            
              }
            })
          },
          fail: function (res) {
            //var that=this;
            console.log("用户取消授ads权给出的提示");
            console.log(res);
            that.setData({
              bug: false
            })
          }
        })
      },
      fail: function (res) {
        console.log("用户");
        console.log(res);
        
      }
    })//login结尾
  },
  
  goDetail: function(){
    wx.navigateTo({
      url: '../navigation_car_detail/navigation'
    })
  },
  goToCar: function (e) {
    wx.redirectTo({
      url: '../navigation_car/navigation'
    })
  },
  goToBus: function (e) {
    wx.redirectTo({
      url: '../navigation_bus/navigation'
    })
  },
  goToRide: function (e) {
    wx.redirectTo({
      url: '../navigation_ride/navigation'
    })
  },
  goToWalk: function (e) {
    wx.redirectTo({
      url: '../navigation_walk/navigation'
    })
  },
  onShareAppMessage: function () {

  }
})