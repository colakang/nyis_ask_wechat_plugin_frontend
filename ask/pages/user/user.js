

var app = getApp()
var utils = require('../../utils/util.js')


var myListUrl = 'http://192.168.56.101/api/v1/q2a/mine/';

var debugUrl = '?XDEBUG_SESSION_START=16415';

Page({
  data: {
    navTab: ["我的提问", "我的回答"],
    currentNavtab: "0",

  },

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
          qlist: [{ header: '测试tab0 问题' }].concat(res.data[0]),
          alist: [{ header: '测试tab1 回答' }].concat(res.data[1])

        })
      }
    })
    this.index = 1
  },

  
  switchTab: function (e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },

 

 
});
