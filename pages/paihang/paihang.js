const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex:0,
    shilipaihang:[],
    nulipaihang: [],
    yunqipaihang: [],
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;
    _this.getpaihang('shili');
    _this.getpaihang('nuli');
    _this.getpaihang('yunqi');
    
    
  
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
  tabFun: function (e) {
    //获取触发事件组件的dataset属性
    var _datasetId = e.target.dataset.id;

    this.setData({
      tabIndex: _datasetId
    });
  },

  getpaihang:function(str){
    var _this = this;
    wx.request({
      url: app.globalData.apiUrl + "/PukeAPI/GetPaihang?type="+str,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.paihang)
        if(str=='shili')
        {
          _this.setData({
            nulipaihang: res.data.paihang
          })
        }
        if (str == 'nuli') {
          _this.setData({
            shilipaihang: res.data.paihang
          })
        }
        if (str == 'yunqi') {
          _this.setData({
            yunqipaihang: res.data.paihang
          })
        }


      },
    })
  }
})