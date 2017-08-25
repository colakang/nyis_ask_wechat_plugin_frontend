

var app = getApp()
var utils = require('../../utils/util.js')

var loginUrl = getApp().globalData.loginUrl;
var myListUrl = getApp().globalData.myListUrl;

var qcount = 0;
var acount = 0;

Page({
  data: {
    navTab: ["我的问答", "我的资料"],
    currentNavtab: "0",
    qflag: 0,
    qisfold: false,
    aflag: 0,
    asifold: false,
  },



  clickMes1: function() {
    qcount ++;
    if (qcount % 2 == 0){
      this.setData({
        qflag: 0,
        qisfold: false,
        
      })
    }
    else{
    this.setData({
      qflag: 1,
      qisfold: true,
    })
    }
  } ,

  clickMes2: function() {
    acount++;
    if (acount % 2 == 0) {
      this.setData({
        aflag: 0,
        aisfold: false,
      })
    }
    else {
      this.setData({
        aflag: 1,
        aisfold: true,
      })
    }
  },

  // flodFn: function () {
  //   this.setData({
  //     isFold: !this.isFold
  //   });
  // },


  /**
   * 运行时加载用户问答信息
   */
  onLoad: function () {

    // 新增end
    var userid = wx.getStorageSync('qauserid');
    console.log(userid);
    var url = myListUrl + userid ;
    console.log(url);
    var that = this;

    wx.request({
      url: url,
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          // qlist: [{ header: '测试tab0 问题' }].concat(res.data[0]),
          // alist: [{ header: '测试tab1 回答' }].concat(res.data[1])
          qlist: res.data[0],
          alist: res.data[1],
          userinfo:res.data[4]
        })
      }
    })
    this.index = 1

    /**
     * 获取用户信息
     */
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
          //url: loginUrl + '/wxusers' + debugUrl,
          url: loginUrl + '/wxusers',
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

  
  switchTab: function (e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },

});
