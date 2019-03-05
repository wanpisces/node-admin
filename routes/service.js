var CONF = require('../conf/conf.js');
var API = require('../conf/api.js');
var Http = require('../util/http.js');
var Auth = require('../util/auth.js');

var module_service = function(router){

  //服务列表
  router.get('/service_list',Auth,function(req, res, next) {
    var data = req.query;
    var tab = data.tab;
    Http(
      {url: API.applyService, method: 'GET'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
          var obj = content.data;
          if (tab == 1) {obj.typeTitle = '待处理';obj.index = 1;}
          else if (tab == 2) {obj.typeTitle = '已处理';obj.index = 2;}
          res.render('service_list',obj);
        }
      }, req);
  });

  //服务处理
 router.get('/serviceState',Auth,function(req, res, next) {
    var data = req.query;
    Http(
      {url: API.serviceState, method: 'PUT'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
          res.json(content);
        }
      }, req);
  });

  //项目删除
  router.get('/serviceDelete',Auth,function(req, res, next) {
    var data = req.query;
    console.log(data);
    Http(
      {url: API.applyService, method: 'DELETE'},
      data,//前端数据
      function (content){
         console.log(content);
        if (content.code == 2000){
          res.json(content);
        }
      }, req);
    });

};



module.exports = module_service;
