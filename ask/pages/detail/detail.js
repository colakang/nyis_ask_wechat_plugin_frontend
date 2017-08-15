var R_htmlToWxml = require('../../utils/htmlToWxml.js');//引入公共方法

Page({
  data: {
    newsList: '',
    questionList: '',
    answerList: '',
    commentList: '',
    answercommentList:'' 
  },

  onReady: function () {
    wx.setNavigationBarTitle({
      title: '详情页面'
    })
  },

  /**
   * 运行时加载
   */

  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://192.168.56.101/api/v1/q2a/questions/' + options.id,
      //url: 'http://192.168.56.101/api/v1/q2a/questions/11',
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var questionDetail = res.data[0];
        //console.log(questionDetail)
        var rawContent = questionDetail[0].question_content;
        // console.log(rawContent)
        rawContent = rawContent.replace(/&nbsp;/ig, "");
        // console.log(rawContent)
        var temp = R_htmlToWxml.html2json(rawContent);
        if (temp[0] == null){
          var text = questionDetail[0].question_content;
          var child = [];
          var textObj = {
            type:"text",
            text:text
          }
          child[0] = textObj;
          var contentObj = {
            type:"view",
            child: child
          }
          var contentArray = [];
          contentArray[0] = contentObj;

          questionDetail[0].content = contentArray;
        }
        else {
          questionDetail[0].content = temp;
        }
       // console.log(temp[0])

        //console.log(questionDetail.content)

        var myUserid = wx.getStorageSync('qauserid');
        var questionUserid = questionDetail[0].question_userid;
        var questionNotify = questionDetail[0].question_notify;

        function validateEmail(email) {
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
        }

        if (questionUserid == myUserid && questionUserid != null) {
          questionDetail[0].question_handle = 'me';
        }

  /**
   * 检查用户id（可运行，时间允许的话重构一下用switch）
   */
        var answerDetail = res.data[1];
        for (var i = 0; i< answerDetail.length;i++){
          //console.log(answerDetail[i].answer_userid);
          if (answerDetail[i].answer_userid == myUserid) {
            answerDetail[i].answer_handle = 'me';
          }
          else if (answerDetail[i].answer_notify != null &&
            answerDetail[i].answer_notify.toUpperCase() 
            == questionNotify.toUpperCase()
            && questionNotify != null
            && questionNotify != '@' 
            ){
            answerDetail[i].answer_handle = 'guest(提问者)';
          }
        }

        var commentDetail = res.data[2]
        for (var i = 0; i < commentDetail.length;i++){
          if (commentDetail[i].comment_userid == myUserid){
            commentDetail[i].comment_handle = 'me';
          }
          else if (commentDetail[i].comment_notify != null &&
            commentDetail[i].comment_notify.toUpperCase() 
            == questionNotify.toUpperCase()
            && questionNotify != null
            && questionNotify != '@' 
            ) {
            commentDetail[i].comment_handle = 'guest(提问者)';
          }
        }

        var answercommentDetail = res.data[3]
        for (var i = 0; i < answercommentDetail.length; i++) {
          if (answercommentDetail[i].comment_userid == myUserid) {
            answercommentDetail[i].comment_handle = 'me';
          }
          else if (answercommentDetail[i].comment_notify != null &&
            answercommentDetail[i].comment_notify.toUpperCase() 
            == questionNotify.toUpperCase() 
            && questionNotify != null 
            && questionNotify != '@' 
            ) {
            answercommentDetail[i].comment_handle = 'guest(提问者)';
          }
        }

        that.setData({
          questionList: questionDetail,
          answerList: answerDetail,
          commentList: commentDetail,
          answercommentList: answercommentDetail,
          newsList:res.data[4]
        })
      }
    })
    this.index = 1
  },

   /**
   * 页面转跳
   */
  toAsk: function (event){
    wx.switchTab({
      url: '../ask/ask'
    })
  },


})
