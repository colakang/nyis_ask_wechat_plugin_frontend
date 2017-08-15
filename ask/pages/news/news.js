var R_htmlToWxml = require('../../utils/htmlToWxml.js');//引入公共方法

Page({
  data: {
    scrollHeight: 0,
    newsData: ''
  },

  onReady: function () {
    wx.setNavigationBarTitle({
      title: '新闻详情'
    })
  },

  /**
   * 运行时加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://192.168.56.101/api/v1/q2a/questions/' + options.id,

      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // var data = res.data[4][0];
        var newsDetail = res.data[4][0];
        // var newsDetail = JSON.parse(data.content);
        var rawContent = newsDetail.question_content;
        rawContent = rawContent.replace(/&nbsp;/ig, "");
        newsDetail.content = R_htmlToWxml.html2json(rawContent);
        // newsDetail.content = R_htmlToWxml.html2json(newsDetail.question_content); //working well but &nbsp
        console.log(newsDetail);
        that.setData({
          newsData: newsDetail
        })
      }


    })
    this.index = 1
  },

  /**
   * 加载图片
   */
    imageLoad: function (e) {
    var width = e.detail.width;
    var height = e.detail.height;
    var windowWidth = wx.getSystemInfoSync().windowWidth - 30;
    var picHeight = (height / width) * windowWidth;
    var index = e.currentTarget.dataset.index;
    this.data.newsData.content[index].attr.height = picHeight;
    this.setData({
      newsData: this.data.newsData
    });
  },

})
