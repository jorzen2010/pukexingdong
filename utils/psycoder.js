const app = getApp();


//登录
const GetUserByOpenid = (openid) => new Promise((resolve) => {
 
      wx.request({
        url: app.globalData.apiUrl + "/PukeAPI/GetFensiUserByopenid?openid=" +openid,
        headers: {
       'Content-Type': 'application/json'
        },
        success: function (res) {
        resolve(res.data);
        },
      })
});

const CreateFensi = (openid,sid) => new Promise((resolve) => {
  var uinfo = JSON.stringify(app.globalData.userInfo);
  wx.request({
    url: app.globalData.apiUrl + '/PukeAPI/CreateFensiUser?openid=' + openid + '&shareuser=' + sid,
    method: 'POST',
    data: {
      userinfo: uinfo
    },
    headers: {
      'Content-Type': 'x-www-form-urlencoded'
    },
    success: function (res) {
      resolve(res);
      //console.log(res);
      console.log(app.globalData.userInfo);
    }
  })

});

//暴露接口给外部使用
module.exports = {
  GetUserByOpenid: GetUserByOpenid,
  CreateFensi: CreateFensi
}