
window.Packages = {}


Packages.BrowserType = function(){
  // 1. 判断手机端浏览器的类型
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if(isAndroid) {
    return 'android';
  }
  if(isiOS){
    return 'ios';
  }
};

Packages.Escape = function(str) {
  return str.replace(/[.*+?^$|[\](){}\\-]/g, '\\$&');
};

Packages.Query = {
  parse(search =  window.location.href  ) {
    if (!search) return {}
    const queryString = search.indexOf('?') === -1 ? search : search.split("?")[1];
    const query = {}
    queryString.split('&')
      .forEach(queryStr => {
        const [key, value] = queryStr.split('=')
        if (key) query[key] = value
      })

    return query
  },
  stringify(query, prefix = '?') {
    const queryString = Object.keys(query).map(key => `${key}=${encodeURIComponent( query[key].toString() )}`).join('&');
    return queryString ? prefix + queryString : ''
  },
};
