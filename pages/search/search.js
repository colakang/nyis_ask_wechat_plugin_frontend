//import { get, post, upload, download } from "../../utils/network.js"

//获取应用实例
var app = getApp()
var searchUrl = 'http://ask.nyis.com/api/v1/q2a/search';
var debugUrl = '?XDEBUG_SESSION_START=16415';

var keyword = '';
var query = '';
var page = 0;

Page({
  data: {

    questions: ''
  },

  /**
   * 检查关键字字数
   */
  checkKeyword: function (e) {
    var keywordStr = e.detail.value;
    var strLength = 0;
    strLength = keywordStr.length;
    if (strLength >= 0) {
      this.setData({
        keywordLength: strLength
      })
    }
  },

  /**
   * 提交表单
   */

  formSubmit: function (e) {

    console.log('form发生了submit事件，携带数据为：', e.detail.value.keyword)

    keyword = e.detail.value.keyword;
    wx.setStorageSync('keyword', keyword);
 
    var that = this
    wx.request({
          url: searchUrl,
          data: {
            query: keyword,
            page:page
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          success: function (res) {
            console.log("res is " + res);
            console.log(res);

            that.setData({

              questions: [{ header: '搜索结果' }].concat(res.data)
            })
          },
          fail: function (res) {
            console.log(res.data);
          }
        })
  },

  /**
   * 清除表单内容
   */

  formReset: function (e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      questions: ''
    })
  },

  /**
   * 下拉到底触发下一页
   */

  onReachBottom: function () {
    // Do something when page reach bottom.
    console.log('circle 下一页');
    page++;
    console.log(page);

    var keyword = wx.getStorageSync('keyword');


    var that = this
    wx.request({
      url: searchUrl,
      data: {
        query: keyword,
        page:page
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        console.log("res is " + res);
        console.log(res);

        that.setData({
          // questions: res.data
          questions: [{ header: '问题列表' }].concat(res.data)
        })
      },
      fail: function (res) {
        console.log(res.data);
      }
    })
  },

})
