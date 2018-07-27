const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nuli:0,
    shili:0,
    yunqi:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;

    wx.request({
      url: app.globalData.apiUrl + "/PukeAPI/GetZhanji?ceshiuser=" + app.globalData.ceshiuser,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        _this.setData({
          yunqi:res.data.zhanji.yunqi,
          shili: res.data.zhanji.shili,
          nuli: res.data.zhanji.nuli,
        })
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
  
  },
  previewImage:function(){

    console.log('长按识别');
    wx.previewImage({
      current: this.data.imgalist, // 当前显示图片的http链接   
      urls: this.data.imgalist // 需要预览的图片http链接列表 
    })  


  }
})