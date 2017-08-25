//import { get, post, upload, download } from "../../utils/network.js"

//获取应用实例
var app = getApp()

var loginUrl = 'http://ask.nyis.com/api/v1/wx';
var questionUrl = 'http://ask.nyis.com/api/v1/q2a/questions';
var debugUrl = '?XDEBUG_SESSION_START=16415';

var userid ='';
var title =''; 
var content = '';

Page({
  data: {
    chosen: '',
    array: [{
      mode: 'scaleToFill',
      text: 'scaleToFill：不保持纵横比缩放图片，使图片完全适应'
    }],
    // src: 'http://wx4.sinaimg.cn/large/e6c2ff9egy1fddqz8ypr2j21kw15d7dp.jpg'
  },

  /**
   * 检查题目字数
   */
    checkTitle: function (e) {
    var titleStr = e.detail.value;
    var strLength = 0; 
    strLength = titleStr.length;
    if (strLength >= 0) {
      this.setData({
        titleLength: strLength
      })
    }
  },

  /**
   * 检查内容字数
   */
    checkContent: function (e) {
      var contentStr = e.detail.value;
      var strLength = 0;
      strLength = contentStr.length;
      if (strLength >= 0) {
        this.setData({
          contentLength: strLength
        })
      }
    },


  /**
   * 运行时加载
   */
  onLoad: function () {
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

  /**
   *提交表单
   */
  formSubmit: function (e) {
    wx.switchTab({
      url: '../user/user'
    })

    console.log('form发生了submit事件，携带数据为：', e.detail.value.title)
    console.log('form发生了submit事件，携带数据为：', e.detail.value.content)
    title = e.detail.value.title;
    content = e.detail.value.content;
    userid = wx.getStorageSync('qauserid')

    console.log('userid 是'+ userid);

    var that = this

    //调用登录接口
    wx.login({
      success: function (res) {
        var code = res.code;
        console.log('code');
        console.log(code);


        // var that = this
        wx.request({
          url: questionUrl,
          data: {
            userid: userid,
            title: title,
            content: content
          },

          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT

          success: function (res) {
            console.log("res is "+res);
            console.log(res);
            // this.setData({
            //   chosen: res.data
            // })
            that.setData({
              chosen: res.data
            })
          },

          fail: function (res) {
            console.log(res.data);
          }
        })
      }
    })
  },

  /**
   * 清除表单内容
   */
  formReset: function (e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  },
  
})
