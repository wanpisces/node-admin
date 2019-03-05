//配置文件
var CONF = require('../conf/conf.js');
var API = require('../conf/api.js');
var Http = require('../util/http.js');
var Auth = require('../util/auth.js');

var module_ad = function (router) {
  // ad列表页
  router.get('/ad_list',Auth,function(req, res, next) {
    var data = req.query; 
    Http( {url: API.ad, method: 'GET'},
      data,//前端数据
      function (content){ 
          res.render('ad_list',content||{}); 
      }, req);
  }); 

  // ad编辑页
  router.get('/ad_edit',Auth,function(req, res, next) {
    var data = req.query;
    Http({url: API.ad+'/'+data.ad_id, method: 'GET'},
      data,//前端数据
      function (content){
        res.render('ad_add',content.data||{});
      }, req);
  });

  // 广告编辑
  router.post('/ad',Auth, function(req, res, next){
       var params = req.body || {}; 
       Http({url:API.ad, method:"PUT"},params,function(data){
            res.json(data);
       },req);
  });


};
module.exports = module_ad;
