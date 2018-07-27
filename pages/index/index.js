const psycoder = require('../../utils/psycoder.js');
const app = getApp()
Page({
  data: {
    userInfo:{},
    hasUserInfo:false
  },

  onLoad: function (options) {

    wx.startAccelerometer();
    wx.onAccelerometerChange(function (res) {
      if (res.x > 0.7 && res.y > 0.7) {
        console.log('摇一摇成功');
        wx.stopAccelerometer();
        _this.PlayYYYMusic();
      }
    });

    var _this = this;
    var share_id=0;
    if (typeof(options.shareid)=="undefined")
    {
      console.log('直接搜索打开的为' +share_id)
    }
    else
    {
      share_id = options.shareid;
      console.log('重新赋值为'+share_id)
    }
    

    wx.login({
      success: res => {
        //第一步通过登录的code获取openid
        //第二步通过openid查找数据库中有没有。有就直接登录，没有就新建一个。
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: app.globalData.apiUrl + "/PukeAPI/WechatLogin?appid=" + app.globalData.appid + "&appsecrect=" + app.globalData.appsecrect + "&js_code=" + res.code,
          headers: {
            'Content-Type': 'application/json'
          },
          success: function (re) {
            app.globalData.openid = re.data.openid;
            psycoder.GetUserByOpenid(re.data.openid)
            .then(function(data){
              if (data.message.MessageStatus == 'false') {
             
                psycoder.CreateFensi(data.openid, share_id,app.globalData.userInfo)
                .then(function(result){
                ///console.log(result)
                  return psycoder.GetUserByOpenid(result.data.CeshiFensiUser.openid);
                })
                .then(function (data){
                ///console.log(data);
                  app.globalData.ceshiuser = data.userinfo.Id;
                  console.log('有数据' + app.globalData.ceshiuser);
                })
                console.log('没数据');
              }
              else
              {
                app.globalData.ceshiuser = data.userinfo.Id;
                console.log('有数据' + app.globalData.ceshiuser);
              }
            })
          },
        })

      //  console.log(res)
      }
    })


    

  /**
 * 摇一摇功能实现
 */
    
      /**
 * 摇一摇功能实现
 */
    
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
     // console.log(res.target)
    }
    return {
      title: '你摇的不是红包，是心结',
      //转发的时候配置一个用户id，这样在打开的时候就可以获取到这个id了。
      path: '/pages/index/index?shareid=8',
    //  path: '/pages/index/index',
      imageUrl: '/src/images/share.jpg',
    }
  },


  PlayYYYMusic:function(){
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = 'https://mp.psycoder.zzd123.com/puke/music/yyy.mp3'
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
       wx.stopAccelerometer();
      wx.navigateTo({
        url: '../../pages/result/result',
      })
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })

  },
  onShow: function () {
    wx.startAccelerometer();
  },
  navto:function(e){
    var url = e.currentTarget.dataset.href;
    wx.navigateTo({
      url: url,
    })

  },

})
