var CONF = require('../conf/conf.js');
var API = require('../conf/api.js');
var Http = require('../util/http.js');
var Auth = require('../util/auth.js');

var module_order = function(router){
   //订单列表
  router.get('/order_list',Auth,function(req, res, next) {
    var data = req.query;
    var tab = data.tab;
    Http(
      {url: API.order, method: 'GET'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
          var obj = content.data;
          if (tab == 1) {obj.typeTitle = '已处理订单';obj.index = 1;}
          else if(tab == 2){obj.typeTitle = '待处理订单';obj.index = 2;}
          else if(tab == 3){obj.typeTitle = '已关闭';obj.index = 3;}
          res.render('order_list',obj);
        }
      }, req);
  });
  //订单详情
  router.get('/order_detail',Auth,function(req, res, next) {
    var data = req.query;
    Http(
      {url: API.order+'/'+data.order_id, method: 'GET'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
          res.render('order_detail',content.data);
        }
      }, req);
  });


  //订单状态切换
   router.get('/orderState',Auth,function(req, res, next) {
    var data = req.query;
    Http(
      {url: API.orderState, method: 'PUT'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
          res.json(content);
        }
        console.log(content);
      }, req);
  });

 //订单删除
   router.get('/orderDelete',Auth,function(req, res, next) {
    var data = req.query;
    Http(
      {url: API.order, method: 'DELETE'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
          res.json(content);
        }
      }, req);
  });









};

module.exports = module_order;