
window.Configs = {};

Configs['TYPE'] =  1;

// 测试 用户为 1 为免登陆
Configs['NEED_LOGIN'] = false ;
Configs['USER_MEM'] = 1 ;

Configs['LOCAL'] = false;

Configs['HTTP_TYPE']  = function (){
  if(window.location.href.indexOf('dev.bstchain.com') > -1){/* http://dev.bstchain.com/sc/index.html#/Main/User*/
    return 'dev';             // 测试环境
  }
  if(window.location.href.indexOf('m.bstchain.com') > -1){
    return 'production';    // 生产环境
  }
  if(window.location.href.indexOf('192.168') > -1 || window.location.href.indexOf('localhost') > -1 ){
    return 'localhost';      //开发环境
  }
}();

Configs['HTTP_REQUEST'] = function(){
  if ( Configs['HTTP_TYPE'] === 'localhost') {
    return Configs['LOCAL'] ? 'http://192.168.0.109:28091/im':'http://m.bstchain.com/im'; // http://192.168.0.108:18091 、 http://47.96.90.198
  } else {
    return '/im';
  }
}();


Configs['HTTP'] =   window.location.origin;




