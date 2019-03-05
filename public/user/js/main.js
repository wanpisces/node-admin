/**
 * Http请求
 * @params req 请求
 * @params params 请求数据
 * @params cb 请求回调
 * @params tips 提示配置 {title:'',style:''}
 **/
if (!window.Http) {
    window.Http = function(req, params, cb, tips) {
       layui.use(['layer'], function(){
        var layer = layui.layer;
        var loading;
        var defaultStyle = { title: '请稍后...', style: { icon: 16 } };
        if (tips) {
            tips.title = tips.title || defaultStyle.title;
            tips.style = $.extend(defaultStyle.style, tips.style || {});
        } else {
            tips = defaultStyle;
        }

        $.ajax({
            type: req.method,
            url: req.url,
            data: params,
            beforeSend: function() {
                loading = layer.msg(tips.title, tips.style);
            },
            success: function(e) {
                typeof(cb) == 'function' && cb(e);
            },
            error: function(e) {
                layer.msg('请求出错:' + JSON.stringify(e), { icon: 2, time: 5000, offset: '10px' });
            },
            complete: function(e) {
                layer.close(loading);
            }
        });
      });
    }
}

/**
 * 在没有原生支持localStorage对象的浏览器中使用它
 **/
if (!window.localStorage) {
    window.localStorage = {
        getItem: function(sKey) {
            if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
            return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
        },
        key: function(nKeyId) { return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]); },
        setItem: function(sKey, sValue) {
            if (!sKey) { return; }
            document.cookie = escape(sKey) + "=" + escape(sValue) + "; path=/";
            this.length = document.cookie.match(/\=/g).length;
        },
        length: 0,
        removeItem: function(sKey) {
            if (!sKey || !this.hasOwnProperty(sKey)) { return; }
            var sExpDate = new Date();
            sExpDate.setDate(sExpDate.getDate() - 1);
            document.cookie = escape(sKey) + "=; expires=" + sExpDate.toGMTString() + "; path=/";
            this.length--;
        },
        hasOwnProperty: function(sKey) { return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie); }
    };
    window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;
}

/**
 * 将表单参数转换成对象
 **/
jQuery.prototype.serializeObject = function() {
    var obj = new Object();
    $.each(this.serializeArray(), function(index, param) {
        if (!(param.name in obj)) {
            obj[param.name] = param.value;
        }
    });
    return obj;
};

/**
 * 初始化上传参数
 */
if (!window.initUploadParams){
   window.initUploadParams = function(em,successCall,failCall,ext,beforeCall)
   {
        var params = {
          elem:em
          ,url: 'http://qzyapi.darongshutech.com/public/uploads' // 上传接口
          ,before: function(res){
            // 上传前回调
            typeof(beforeCall) == 'function' && beforeCall(res);
            // 加载层-风格4
            layer.msg('正在上传...', {
               icon: 16
              ,shade: 0.01
            });
            console.log('开始上传');
          }
          ,done: function(res){
            console.log('上传回调');
            if (res.code == 2000){
              layer.msg('上传成功', {
                 icon: 1
                ,shade: 0.01
                ,time:1000
              },function(){
                //上传完毕回调
                typeof(successCall) == 'function' && successCall(res);
              });
            } else{
              layer.msg('上传失败['+JSON.stringify(res)+']', {
                 icon: 2
                ,shade: 0.01
              },function(){
                //上传完毕回调
               typeof(failCall) == 'function' && failCall(res);
              });
            }
          }
          ,error: function(res) {
            layer.msg('上传出错', {
               icon: 2
              ,shade: 0.01
              ,time:2000
            });
            console.log('上传错误'+JSON.stringify(res));
          }
        };
        params = $.extend(params, ext||{});
        return params;
  }
}

/**
 * URL校验
 */
if (!window.isUrl){
   window.isUrl =  function(url){
        var regx =/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
        var objExp = new RegExp(regx);
        return objExp.test( url );
   }
}