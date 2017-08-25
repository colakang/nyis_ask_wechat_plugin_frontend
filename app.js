//app.js
var utils = require('/utils/util.js')

var loginUrl = 'http://192.168.56.101/api/v1/wx';
var questionUrl = 'http://192.168.56.101/api/v1/q2a/questions';
var debugUrl = '?XDEBUG_SESSION_START=16415';

  /**
   * 全局信息，运行时加载
   * 发送code
   * 获取token，qauserid并储存
   */

App({
  onLaunch: function () {

    wx.login({
      success: function (res) {
        var code = res.code;
        var token = wx.getStorageSync('token');
        console.log('code');
        console.log(code);
        wx.request({
          url: loginUrl + '/tokens',

          data: {
            code: code,
            token:token
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          success: function (res) {
            console.log(res.data);
            //console.log(res.data["0"].token);
            wx.setStorageSync('token', res.data["0"].token);
            wx.setStorageSync('qauserid', res.data["0"].qauserid);
            console.log('token');
            console.log(wx.getStorageSync('token'));
            console.log('qauserid');
            console.log(wx.getStorageSync('qauserid'));
          },
          fail: function (res) {
            console.log(res.data);
          }
        })
      }
    })
  }
})


