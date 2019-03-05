var CONF = require('../conf/conf.js');
var API = require('../conf/api.js');
var Http = require('../util/http.js');
var Auth = require('../util/auth.js');
var module_eper = function(router){

  //期刊列表
 router.get('/eper_list',Auth,function(req, res, next) {
    var data = req.query;
     var tab = data.tab;
    Http(
      {url: API.eper, method: 'GET'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
          var obj = content.data;
          if (tab == 1) {obj.typeTitle = '已发布';obj.index = 1;}
          else if(tab == 2){obj.typeTitle = '下架';obj.index = 2;}
          else if(tab == 3){obj.typeTitle = '草稿';obj.index = 3;}
          res.render('eper_list',obj);
        }
      }, req);
  });
  //期刊详情
  router.get('/eper_detail',Auth,function(req, res, next) {
    var data = req.query;
    Http(
      {url: API.eper+'/'+data.eper_id, method: 'GET'},
      data,//前端数据
      function (content){
          res.render('eper_detail',content.data||{});
      }, req);
  });


   //期刊上下架
   router.get('/eperState',Auth,function(req, res, next) {
    var data = req.query;
    console.log(data,API.eperState);
    Http(
      {url: API.eperState, method: 'PUT'},
      data,//前端数据
      function (content){
          res.json(content);
      }, req);
  });


  //期刊删除
   router.get('/eperDelete',Auth,function(req, res, next) {
    var data = req.query;
    Http(
      {url: API.eper, method: 'DELETE'},
      data,//前端数据
      function (content){
          res.json(content);
      }, req);
  });


  //添加期刊
  router.get('/eper_add',Auth,function(req, res, next) {
    res.render('eper_add');
  });

   // 期刊编辑
   router.get('/eper_edit',Auth,function(req, res, next) {
    var data = req.query;
    Http(
      { url: API.eper+'/'+data.eper_id, method: 'GET'},
        data, //前端数据
        function (content){
         res.render('eper_add',content.data||{});
       }, req);
  });

  // 期刊添加、编辑
  router.post('/eper',Auth,function(req, res, next) {
    var params = req.body;
    var _method = params.eper_id ? 'PUT':'POST';
    Http({ url: API.eper, method: _method}, params, function (content){
          res.json( content );
      }, req);
  });


}

module.exports = module_eper;