// pages/test/test.js

//获取应用实例
var app = getApp()
//var baseUrl = 'http://z.cn/api/v1';
var baseUrl = 'http://192.168.56.101/api/v1/wx';
var debugUrl = '?XDEBUG_SESSION_START=16415';
Page({
  onLoad: function () {
  },


  getCode: function () {
    //调用登录接口
    wx.login({
      success: function (res) {
        var code = res.code;
        console.log('code');
        console.log(code);
      }
    })
  },

  getToken: function () {
    //调用登录接口
    wx.login({
      success: function (res) {
        var code = res.code;
        console.log('code');
        console.log(code);
        wx.request({
          url: baseUrl + '/tokens',
          //url: baseUrl + '/wxusers' + debugUrl,
          data: {
            code: code
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          success: function (res) {
            console.log(res.data);
            //console.log(res.data["0"].token);
            wx.setStorageSync('token', res.data["0"].token);
            console.log('token');
            console.log(wx.getStorageSync('token'));
          },
          fail: function (res) {
            console.log(res.data);
          }
        })
      }
    })
  },



  //获取用户信息
  getInfo: function () {
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        var userInfo = res.userInfo; //object
        var rawData = res.rawData; //string
        var signature = res.signature; // string
        var encrypteData = res.encryptedData; //string with openid, unionid and session_key
        var iv = res.iv; //string


        var nickName = userInfo.nickName;
        var avatarUrl = userInfo.avatarUrl;
        var gender = userInfo.gender; //性别 0：未知、1：男、2：女
        var province = userInfo.province;
        var city = userInfo.city;
        var country = userInfo.country;
        var token = wx.getStorageSync('token');

        console.log('userInfo' + userInfo);

        console.log('nick name:' + nickName);
        console.log('avatar URL:' + avatarUrl);//头像
        console.log('gender:' + gender);
        console.log('province:' + province);
        console.log('city:' + city);
        console.log('country:' + country);
        console.log('token:' + token);

        wx.request({
          //url: baseUrl + '/wxusers' + debugUrl,
          url: baseUrl + '/wxusers',
          data: {
            nickName: nickName,
            avatarUrl: avatarUrl,
            gender: gender,
            province: province,
            city: city,
            country: country,
            token: token
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          success: function (res) {
            console.log(res.data);
          },
          fail: function (res) {
            console.log(res.data);
          }
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  getTokenAndInfo: function () {
    this.getToken();
    this.getInfo();

  },

  //拨打电话
  getCall: function () {
    wx.makePhoneCall({
      phoneNumber: '(800)685-6947' //仅为示例，并非真实的电话号码
    })
  },

  //检查登录状态
  checkSession: function () {
    wx.checkSession({
      success: function () {
        console.log('session success');
      },
      fail: function () {
        console.log('session fail');
        this.getToken();
      }
    })
  },



  // delivery: function () {
  //   wx.request({
  //     url: baseUrl + '/order/delivery',
  //     header: {
  //       token: wx.getStorageSync('super_token')
  //     },
  //     method: 'PUT',
  //     data: {
  //       // id:wx.getStorageSync('order_id')
  //       id: 293
  //     },
  //     success: function (res) {
  //       console.log(res.data);
  //     }
  //   })
  // },


  // //未必在点击支付前，先点击一下申请令牌，确保令牌申请成功
  // pay: function () {
  //   var token = wx.getStorageSync('token');
  //   var that = this;
  //   // that.getPreOrder(token, 'A303256065493535')
  //   wx.request({
  //     url: baseUrl + '/order',
  //     header: {
  //       token: token
  //     },
  //     data: {
  //       products:
  //       [
  //         {
  //           product_id: 1, count: 1
  //         },
  //         // },
  //         {
  //           product_id: 2, count: 1
  //         }
  //       ]
  //     },
  //     method: 'POST',
  //     success: function (res) {
  //       console.log(res.data);
  //       if (res.data.pass) {
  //         wx.setStorageSync('order_id', res.data.order_id);
  //         that.getPreOrder(token, res.data.order_id);
  //       }
  //       else {
  //         console.log('订单未创建成功');
  //       }
  //     }
  //   })
  // },

  // getPreOrder: function (token, orderID) {
  //   if (token) {
  //     wx.request({
  //       url: baseUrl + '/pay/pre_order',
  //       method: 'POST',
  //       header: {
  //         token: token
  //       },
  //       data: {
  //         id: orderID
  //       },
  //       success: function (res) {
  //         var preData = res.data;
  //         wx.requestPayment({
  //           timeStamp: preData.timeStamp.toString(),
  //           nonceStr: preData.nonceStr,
  //           package: preData.package,
  //           signType: preData.signType,
  //           paySign: preData.paySign,
  //           success: function (res) {
  //             console.log(res.data);
  //           },
  //           fail: function (error) {
  //             console.log(error);
  //           }
  //         })
  //       }
  //     })
  //   }
  // },

  // formID: function (event) {
  //   console.log(event);
  // }
})



//default

// Page({
//   /**
//    * 页面的初始数据
//    */
//   data: {
  
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
  
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {
  
//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {
  
//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {
  
//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {
  
//   }
// })
