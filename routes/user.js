var CONF = require('../conf/conf.js');
var API = require('../conf/api.js');
var Http = require('../util/http.js');
var Auth = require('../util/auth.js');

var module_user = function(router){
   //用户列表
  router.get('/user_list',Auth,function(req, res, next) {
    var data = req.query;
    var tab = data.tab;
    Http(
      {url: API.user, method: 'GET'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
          var obj = content.data;
          if (tab == 1) {obj.typeTitle = '已启用';obj.index = 1;}
          else if(tab == 2){obj.typeTitle = '已停用';obj.index = 2;}
          obj.user = req.session.user;
          res.render('user_list',obj);
        }
      }, req);
  });

  //用户状态切换
   router.get('/userState',Auth,function(req, res, next) {
    var data = req.query;
    console.log(data);
    Http(
      {url: API.userState, method: 'PUT'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
          res.json(content);
        }
        console.log(content);
      }, req);
  });

 //用户删除
   router.get('/userDelete',Auth,function(req, res, next) {
    var data = req.query;
    Http(
      {url: API.user, method: 'DELETE'},
      data,//前端数据
      function (content){
        console.log(content);
        if (content.code == 2000){
          res.json(content);
        }
      }, req);
  });

    //用户添加
   router.post('/user',Auth,function(req, res, next) {
    var params = req.body || {};
    var _method = params._user_id?'PUT':'POST';
    Http({url: API.user, method: _method},
      params,//前端数据
      function (content){
          res.json(content);
      }, req);
   });

  // 用户添加
  router.get('/user_add',Auth, function(req, res, next){
    var user = req.session.user;
    res.render('user_add',{role_id:user.role_id});
  });

  // 用户编辑
  router.get('/user_edit',Auth,function(req,res,next){
    var params = req.query||{};
     Http({url:API.user+'/'+params.user_id, method:'GET'},params,function(data){ 
        res.render('user_add',data.data);
     },req);
  });
 
};

module.exports = module_user;