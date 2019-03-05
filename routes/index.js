//配置文件
var CONF = require('../conf/conf.js');
var API = require('../conf/api.js');
var Http = require('../util/http.js');
var Auth = require('../util/auth.js');

var module_index = function (router) {

    //获取视频token
    router.get('/getToken', function (req, res, next) {
        var data = {};
        Http(
            {url: API.getToken, method: 'GET'},
            data,//前端数据
            function (content) {
                res.json(content);
            }, req);
    });

    //首页
    router.get('/', Auth, function(req, res, next) {
        res.redirect('/index');
    });

    router.get('/login', function(req, res, next) {
        res.render('login');
    });


    //登录
    router.post('/login', function (req, res, next) {
        var data = req.body;
        Http(
            {url: API.systemLogin, method: 'POST'},
            data,//前端数据
            function (content) {
              if(content.code == 2000){
                 req.session.user = content.data;
              }
              res.json(content);
        }, req);
    });

    // 退出登录
    router.post( '/logout', function ( req, res ) {
        delete req.session.user;
        res.send( {
            code: "2000",
            msg: "退出登陆成功"
        } );
    } );

     // 首页
    router.get('/index', Auth, function(req, res, next) {
        res.render('index',req.session.user || {});
    });

  // 数据统计
  router.get('/statistics_B',Auth,function(req, res, next) {
    var data = req.query || {};
    Http(
      {url: API.statisticsB, method: 'GET'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
          var obj = content.data;
          res.render('statistics_B',obj);
        }
      }, req);
  });

  // 数据统计
  router.get('/statistics_A',Auth,function(req, res, next) {
    var data = req.query || {};
    Http({url: API.statisticsA, method: 'GET'},
      data,//前端数据
      function (content){
        res.render('statistics_A',content.data||{});
      }, req);
  });



};
module.exports = module_index;
