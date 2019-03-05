var express = require('express');
var router = express.Router();

require('./index')(router);
require('./service')(router);//申报服务
require('./project')(router);//项目
require('./news')(router);//资讯
require('./goods')(router);//商品
require('./order')(router);//订单
require('./eper')(router);//期刊
require('./ad')(router);//banner
require('./audit')(router);//审核
require('./user')(router);//用户
// 上传
require('./upload')(router);
// 通用部分
require('./comm')(router);
module.exports = router;