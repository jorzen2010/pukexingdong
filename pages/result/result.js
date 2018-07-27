// pages/result/result.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgnum:1,
    imgalist: ['http://mp.psycoder.zzd123.com/puke/res/zanshang.jpg'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;
    //凭空去筛选大小王。然后如果大于15次，第16次则出现大小王。
    wx.stopAccelerometer();
    _this.PlayYYYMusic();
    var randomNum4 = Math.ceil(Math.random() * 52);
    this.setData({
      imgnum: randomNum4
    })
    console.log('随机数为' + randomNum4);
    wx.request({
      url: app.globalData.apiUrl + '/PukeAPI/CreateResult?uid=' + app.globalData.ceshiuser + '&rid=' + this.data.imgnum,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.CeshiResult);
      },
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
    return {
      title: '你摇的不是红包，是心结',
      path: '/pages/index/index',
      imageUrl:'/src/images/share.jpg'
    }
  
  },
  GoIndex:function(){
    wx.navigateBack({
      url: '../../pages/index/index'
    })
  },
  PlayYYYMusic: function () {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = 'https://mp.psycoder.zzd123.com/puke/music/result.mp3'
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      wx.stopAccelerometer();
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })

  },

  lianxiweixin:function(){
    wx.showModal({
      title: '微信联系',
      content: '赵征私人微信号:sky20100',
      showCancel:false
    })
  },
  previewImage: function () {

    console.log('长按识别');
    wx.previewImage({
      current: this.data.imgalist, // 当前显示图片的http链接   
      urls: this.data.imgalist // 需要预览的图片http链接列表 
    })


  }
})