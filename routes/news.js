var CONF = require('../conf/conf.js');
var API = require('../conf/api.js');
var Http = require('../util/http.js');
var Auth = require('../util/auth.js');

var module_news = function(router){


  //13 学术前沿 14申报解读 15热门要闻 16政策法规 17招商引资 18园区发展 19线上走廊
  router.get('/news_list_A',Auth,function(req, res, next) {
    var data = req.query;
    var tab = data.tab;
    Http(
      {url: API.news, method: 'GET'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
          var obj = content.data;
          if (tab == 1) {obj.typeTitle = '已发布';obj.index = 1;}
          else if(tab == 2){obj.typeTitle = '下架';obj.index = 2;}
          else if(tab == 3){obj.typeTitle = '待审核';obj.index = 3;}
          else if(tab == 4){obj.typeTitle = '未通过';obj.index = 4;}
          else if(tab == 5){obj.typeTitle = '草稿';obj.index = 5;}
          res.render('news_list_A',obj);
        }
      }, req);
  });


  router.get('/news_list',Auth,function(req, res, next) {
    var data = req.query;
    var tab = data.tab;
    Http(
      {url: API.news, method: 'GET'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
          var obj = content.data;
          if (tab == 1) {obj.typeTitle = '已发布';obj.index = 1;}
          else if(tab == 2){obj.typeTitle = '下架';obj.index = 2;}
          else if(tab == 3){obj.typeTitle = '待审核';obj.index = 3;}
          else if(tab == 4){obj.typeTitle = '未通过';obj.index = 4;}
          else if(tab == 5){obj.typeTitle = '草稿';obj.index = 5;}
          res.render('news_list',obj);
        }
      }, req);
  });

  // 资讯添加
  router.get('/news_add',Auth, function(req, res, next){
    res.render('news_add',req.session.user);
  });
  // 资讯编辑
  router.get('/news_edit',Auth,function(req,res,next){
    var params = req.query||{};
     Http({url:API.news+'/'+params.news_id, method:'GET'},params,function(data){
        res.render('news_add',Object.assign(data.data||{},req.session.user));
     },req);
  });
  // 资讯添加、编辑
  router.post('/news',Auth, function(req, res, next){
       var params = req.body || {};
       var _method = params.news_id?'PUT':'POST'
       Http({url:API.news, method:_method},params,function(data){
            res.json(data);
       },req);
  });

  //资讯详情
  router.get('/news_detail',Auth,function(req, res, next) {
    var data = req.query;
    Http(
      {url: API.news+'/'+data.news_id, method: 'GET'},
      {},//前端数据
      function (content){
        if (content.code == 2000){
          var obj = content.data;
          obj.index = data.index;
          res.render('news_detail',obj);
        }
      }, req);
  });
  //资讯提交审核
  router.get('/newsAudit',Auth,function(req, res, next) {
    var data = req.query;
    console.log(data);
    Http(
      {url: API.newsAudit, method: 'PUT'},
      data,//前端数据
      function (content){
        console.log(content);
        if (content.code == 2000){
          res.json(content);
        }
      }, req);
  });

  //资讯上下架
   router.get('/newsState',Auth,function(req, res, next) {
    var data = req.query;
    Http(
      {url: API.newsState, method: 'PUT'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
          res.json(content);
        }
      }, req);
  });

   //资讯删除
   router.get('/newsDelete',Auth,function(req, res, next) {
    var data = req.query;
    Http(
      {url: API.news, method: 'DELETE'},
      data,//前端数据
      function (content){
          res.json(content);
      }, req);
  });

};

module.exports = module_news;
