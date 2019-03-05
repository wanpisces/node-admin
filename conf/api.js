var CONF = require('../conf/conf.js');
var base_common = '';								//登录,注册,上传,短信
var base = CONF.HOSTNAME;//"http://test.didoxy.com";
// var base = 'http://api.easysq.cn'; //app接口地址
var base_admin = base + '/admin';//管理端
// var base_system = 'http://eshequapi.didoxy.com/community';
var base_public = base + '/public';//管理端
var API = {};

// 业务相关

API.statisticsB = base_admin + '/statistics/B'; // B端统计
API.statisticsA = base_admin + '/statistics/A'; // A端统计
API.home = base_admin + '/index';//首页
API.news = base_admin + '/news';//资讯
API.systemLogin = base_admin + '/login';//登陆
API.newsAudit = base_admin + '/newsAudit';//资讯下架
API.newsState = base_admin + '/newsState';//资讯审核
API.project = base_admin + '/project';//项目
API.projectAudit = base_admin + '/projectAudit';//项目下架
API.projectState = base_admin + '/projectState';//项目审核
API.goods = base_admin + '/goods';//商品
API.goodsState = base_admin + '/goodsState';//商品上下架
API.order = base_admin + '/order';//订单
API.orderState = base_admin + '/orderState';//订单
API.eper = base_admin + '/eper';//期刊
API.eperState = base_admin + '/eperState';//期刊处理，交易完成，待处理
API.applyService = base_admin + '/service/project';//申报服务
API.serviceState = base_admin + '/service/projectState';//服务处理
API.ad = base_admin + '/ad';//banner
API.adState = base_admin + '/adState';//banner上下架
API.newsAduit = base_admin + '/newsAudit';//资讯审核
API.projectAudit = base_admin + '/projectAudit';//项目审核
API.user = base_admin + '/user';//用户
API.userState = base_admin + '/userState';//商品上下架


// 直传
API.getToken = base_public + '/getToken';
//图片上传
API.uploads = base_public + '/uploads';
// 获取分类
API.attr = base_public+ '/attr/{attr_group_id}';

module.exports = API;
