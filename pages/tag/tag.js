// pages/tag/tag.js
var app = getApp()
var utils = require('../../utils/util.js')

var debugUrl = '?XDEBUG_SESSION_START=16415';
var searchUrl = 'http://ask.nyis.com/api/v1/q2a/search';
var tagsUrl = 'http://ask.nyis.com/api/v1/q2a/tags';

var keyword = '';
var query = '';
var page = 0;

Page({

  
  data: {
  
  },


  onLoad: function (e) {
    var that = this
    var query  = e.key
    wx.request({
      url: searchUrl,
      data: {
        query: query,
        page: page
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        console.log("res is " + res);
        console.log(res);
        that.setData({
          results: [{ header: '问题列表' }].concat(res.data)
        })
      },
      fail: function (res) {
        console.log(res.data);
      }
    })

    wx.request({
      url: tagsUrl,
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          //banner: res.data,
          tags: res.data,
        })
      }
    })
  },

  loadTag: function (e) {
    var tag = e.currentTarget.id
    var that = this
    var query = tag
    wx.request({
      url: searchUrl,
      data: {
        query: query,
        page: page
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        console.log("res is " + res);
        console.log(res);
        that.setData({
          results: [{ header: '问题列表' }].concat(res.data)
        })
      },
      fail: function (res) {
        console.log(res.data);
      }
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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