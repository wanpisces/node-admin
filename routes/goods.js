var CONF = require('../conf/conf.js');
var API = require('../conf/api.js');
var Http = require('../util/http.js');
var Auth = require('../util/auth.js');

var module_goods = function(router){
   //商品列表
  router.get('/goods_list',Auth,function(req, res, next) {
    var data = req.query;
    var tab = data.tab;
    Http(
      {url: API.goods, method: 'GET'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
          var obj = content.data;
          if (tab == 1) {obj.typeTitle = '已发布';obj.index = 1;}
          else if(tab == 2){obj.typeTitle = '下架';obj.index = 2;}
          else if(tab == 3){obj.typeTitle = '待审核';obj.index = 3;}
          res.render('goods_list',obj);
        }
      }, req);
  });

  //商品详情
  router.get('/goods_detail',Auth,function(req, res, next) {
    var data = req.query;
    Http(
      {url: API.goods+'/'+data.goods_id, method: 'GET'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
          var obj = content.data;
           obj.index = data.index;
          res.render('goods_detail',obj);
        }
      }, req);
  });

  //添加商品
  router.get('/goods_add',Auth,function(req, res, next) {
    res.render('goods_add');
  });

  router.get('/goods_add_submit',Auth,function(req, res, next) {
    var data = {};
    Http(
      {url: API.goods, method: 'POST'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
          res.json(content);
        }
      }, req);
  });

  //商品上下架
   router.get('/goodsState',Auth,function(req, res, next) {
    var data = req.query;
    console.log(API.goodsState)
    Http(
      {url: API.goodsState, method: 'PUT'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
          res.json(content);
        }
      }, req);
  });

 //商品删除
   router.get('/goodsDelete',Auth,function(req, res, next) {
    var data = req.query;
    Http(
      {url: API.goods, method: 'DELETE'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
          res.json(content);
        }
      }, req);
  });

   //商品编辑
   router.get('/goods_edit',Auth,function(req, res, next) {
    var data = req.query;
    Http(
      {url: API.goods+'/'+data.goods_id, method: 'GET'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
         res.render('goods_add',content.data);
        }
      }, req);
  });

  // 商品添加、编辑
  router.post('/goods',Auth, function(req, res, next){
       var params = req.body || {};
       var _method = params.goods_id?'PUT':'POST'
       Http({url:API.goods, method:_method},params,function(data){
            res.json(data);
       },req);
  });
}

module.exports = module_goods;