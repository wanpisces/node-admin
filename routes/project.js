var CONF = require('../conf/conf.js');
var API = require('../conf/api.js');
var Http = require('../util/http.js');
var Auth = require('../util/auth.js');

var module_project = function(router){

  //项目列表
   router.get('/project_list',Auth,function(req, res, next) {
    var data = req.query;
    var tab = data.tab;
    Http(
      {url: API.project, method: 'GET'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
          var obj = content.data;
          if (tab == 1) {obj.typeTitle = '已发布';obj.index = 1;}
          else if(tab == 2){obj.typeTitle = '下架';obj.index = 2;}
          else if(tab == 3){obj.typeTitle = '待审核';obj.index = 3;}
          else if(tab == 4){obj.typeTitle = '未通过';obj.index = 4;}
          else if(tab == 5){obj.typeTitle = '草稿';obj.index = 5;}
          res.render('project_list',obj);
        }
      }, req);
  });


  //项目提交审核
  router.get('/projectAudit',Auth,function(req, res, next) {
    var data = req.query;
    Http(
      {url: API.projectAudit, method: 'PUT'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
          res.json(content);
        }
      }, req);
  });
  //项目详情
  router.get('/project_detail',Auth,function(req, res, next) {
    var data = req.query;
    Http(
      {url: API.project+'/'+data.project_id, method: 'GET'},
      {},//前端数据
      function (content){
        if (content.code == 2000){
          var obj = content.data;
          obj.index = data.index;
          res.render('project_detail',obj);
        }
      }, req);
  });

  //项目上下架
  router.get('/projectState',Auth,function(req, res, next) {
    var data = req.query;
    Http(
      {url: API.projectState, method: 'PUT'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
          res.json(content);
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

   // 添加项目
   router.get('/project_add',Auth,function(req, res, next) {
    res.render('project_add',req.session.user);
  });

   // 编辑项目
   router.get('/project_edit',Auth,function(req, res, next) {
    var data = req.query;
    Http(
      {url: API.project+'/'+data.project_id, method: 'GET'},
      data,//前端数据
      function (content){ 
          res.render('project_add',content.data||{}); 
      }, req);

  });

  // 资讯添加、编辑
  router.post('/project',Auth, function(req, res, next){
       var params = req.body || {};
       var _method = params.project_id?'PUT':'POST'
       Http({url:API.project, method:_method},params,function(data){
            res.json(data);
       },req);
  });


}

module.exports = module_project;