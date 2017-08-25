//app.js
var utils = require('/utils/util.js')

// var loginUrl = 'http://ask.nyis.com/api/v1/wx';
// var questionUrl = 'http:/ask.nyis.com/api/v1/q2a/questions';
// var newsUrl = 'http://ask.nyis.com/api/v1/q2a/news';
// var searchUrl = 'http://ask.nyis.com/api/v1/q2a/search';
// var tagsUrl = 'http://ask.nyis.com/api/v1/q2a/tags';
// var loginUrl = 'http://ask.nyis.com/api/v1/wx';
// var questionUrl = 'http://ask.nyis.com/api/v1/q2a/questions';
//var answerUrl = 'http://ask.nyis.com/api/v1/q2a/answers';


  /**
   * 全局信息，运行时加载
   * 发送code
   * 获取token，qauserid并储存
   */

App({
  globalData: {
    test: "test",
    loginUrl : 'http://ask.nyis.com/api/v1/wx',
    questionUrl: 'http://ask.nyis.com/api/v1/q2a/questions',
    answerUrl : 'http://ask.nyis.com/api/v1/q2a/answers',
    newsUrl: 'http://ask.nyis.com/api/v1/q2a/news',
    searchUrl: 'http://ask.nyis.com/api/v1/q2a/search',
    tagsUrl:'http://ask.nyis.com/api/v1/q2a/tags',
    myListUrl : 'http://ask.nyis.com/api/v1/q2a/mine/',

  },



  onLaunch: function () {

    wx.login({
      success: function (res) {
        var code = res.code;
        var token = wx.getStorageSync('token');
        console.log('code');
        console.log(code);
        wx.request({
          url: 'http://ask.nyis.com/api/v1/wx' + '/tokens',

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


