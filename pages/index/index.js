//index.js
//获取应用实例
var app = getApp()
var test = getApp().globalData.test;

var utils = require('../../utils/util.js')

var loginUrl = getApp().globalData.loginUrl;
var questionUrl = getApp().globalData.questionUrl;
var newsUrl = getApp().globalData.newsUrl;
var searchUrl = getApp().globalData.searchUrl;
var tagsUrl = getApp().globalData.tagsUrl;

var keyword = '';
var query = '';
var page = 0;

Page({
  data: {
    questions: '',
    news: '',
    tags: '',
    input: '',
    duration: 2000,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    loading: false,
    plain: false,
  },

  /**
   * 运行时加载
   */
  onLoad: function () {

    var that = this
    wx.request({
      url: questionUrl,
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          //banner: res.data,
          questions: [{ header: '问题列表' }].concat(res.data[0]),
          // questions: res.data[0],
          news: res.data[1]
        })
      }
    })
    this.index = 1

  /**
   * 请求tags
   */
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

  /**
   * 转跳至相应的tag
   */
  loadTag: function (e) {
    var tag = e.currentTarget.id
    wx.navigateTo({
      url: '../tag/tag?key='+ tag
    })
  },
    //事件处理函数
  // bindViewTap: function (e) {
  //   wx.navigateTo({
  //     url: '../detail/detail?id=' + e.target.dataset.id
  //   })
  // },


})

