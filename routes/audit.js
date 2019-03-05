var CONF = require('../conf/conf.js');
var API = require('../conf/api.js');
var Http = require('../util/http.js');
var Auth = require('../util/auth.js');

var module_audit = function(router){
   //资讯列表
  router.get('/news_audit',Auth,function(req, res, next) {
    var data = req.query;
    var tab = data.tab;
    Http(
      {url: API.news, method: 'GET'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
          var obj = content.data;
          if (tab == 1) {obj.typeTitle = '待审核';obj.index = 1;}
          else if(tab == 2){obj.typeTitle = '已通过';obj.index = 2;}
          else if(tab == 3){obj.typeTitle = '已驳回';obj.index = 3;}
          res.render('news_audit',obj);
        }
      }, req);
  });

  //资讯审核通过驳回
  router.get('/news_audit_pass',Auth,function(req, res, next) {
    var data = req.query;
    Http(
      {url: API.newsAudit, method: 'PUT'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
          res.render('news_audit',content);
        }
      }, req);
  });
  //资讯详情
   router.get('/news_audit_detail',Auth,function(req, res, next) {
    var data = req.query;
    Http(
      {url: API.news+'/'+data.news_id, method: 'GET'},
      {},//前端数据
      function (content){
        if (content.code == 2000){
          res.render('news_audit_detail',content.data);
        }
      }, req);
  });

 //删除
   router.get('/newsDelete',Auth,function(req, res, next) {
    var data = req.query;
    Http(
      {url: API.news, method: 'DELETE'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
          res.json(content);
        }
      }, req);
  });

  //项目列表
  router.get('/project_audit',Auth,function(req, res, next) {
    var data = req.query;
    var tab = data.tab;
    Http(
      {url: API.project, method: 'GET'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
          var obj = content.data;
          if (tab == 1) {obj.typeTitle = '待审核';obj.index = 1;}
          else if(tab == 2){obj.typeTitle = '已通过';obj.index = 2;}
          else if(tab == 3){obj.typeTitle = '已驳回';obj.index = 3;}
          res.render('project_audit',obj);
        }
      }, req);
  });

  //项目审核通过驳回
  router.get('/project_audit_pass',Auth,function(req, res, next) {
    var data = req.query;
    Http(
      {url: API.projectAudit, method: 'PUT'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
          res.render('project_audit',content);
        }
      }, req);
  });

   //项目删除
   router.get('/projectDelete',Auth,function(req, res, next) {
    var data = req.query;
    Http(
      {url: API.project, method: 'DELETE'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
          res.json(content);
        }
      }, req);
  });

    //项目详情
  router.get('/project_audit_detail',Auth,function(req, res, next) {
    var data = req.query;
    Http(
      {url: API.project+'/'+data.project_id, method: 'GET'},
      {},//前端数据
      function (content){
        if (content.code == 2000){
          console.log(content.data);
          res.render('project_audit_detail',content.data);
        }
      }, req);
  });




}

module.exports = module_audit;