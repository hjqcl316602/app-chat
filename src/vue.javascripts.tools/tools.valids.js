let Validators = {};

Validators.Types = function(x){
  // 1. 值类型的确定

  let toString = Object.prototype.toString;
  if(x === null){
    return 'null';
  }

  const t= typeof x;

  if(t !== 'object'){
    return t;
  }

  let c;
  try {
    c = toString.call(x).slice(8, -1).toLowerCase();
  } catch(e) {
    return 'object';
  }

  if(c !== 'object'){
    return c;
  }

  if(x.constructor == Object){
    return c;
  }

  try {
    // Object.create(null)
    if (Object.getPrototypeOf(x) === null || x.__proto__ === null) {
      return 'object';
    }

    return 'unknown';
  } catch(e) {
    // ie下无Object.getPrototypeOf
    return 'unknown';
  }
}

Validators.InRange = function (x, min, max) {
  // 2.判断一个值是否在一个范围内

  x = +x;
  min = +min;
  max = +max;

  // x 不是数字，则返回false
  if (isNaN(x)) return false;

  // min 或 max 不传，则认为不设置下限或上限
  return (!isNaN(min) ? x >= min : true) && (!isNaN(max) ? x <= max : true);
}

Validators.Number = function(x, min, max) {
  // 3.判断一个值是否是数字
  return  this.Types(x) === 'number' &&  this.InRange(x, min, max);
}

Validators.NumberInteger = function(x, min, max) {
  //4.判断一个值是否是一个范围内整数
  return parseInt(x, 10) === x  &&  this.InRange(x, min, max);
}

Validators.NumberInt = function(x) {
  // -2^31 ~ 2^31-1
  return this.NumberInteger(x, -2147483648, 2147483647);
}

Validators.Boolean = function(x) {
  return  this.Types(x) === 'boolean';
}

Validators.String = function(x) {
  return  this.Types(x) === 'string';
}

Validators.EmptyString  = function(x) {
  if (! this.String(x)) return false;

  return /^\s*$/.test(x);
}

Validators.Null = function(x) {
  return  this.Types(x) === 'null';
}

Validators.Undefined = function(x) {
  return  this.Types(x) === 'undefined';
}

Validators.Object = function(x) {
  return  this.Types(x) === 'object';
}

Validators.Function = function(x) {
  return  this.Types(x) === 'function';
}

Validators.Array = function(x) {
  return  this.Types(x) === 'array';
}

Validators.Empty = function (x) {
  //用于判断一个接口返回值是否是空值或者是不存在该属性名
  let type = toString.call(x).slice(8, -1);
  return ( type === 'String' && !x )  ||  type === 'Undefined' || type === 'Null';
}

// 指定范围之内的数字和英文
Validators.CodeNumberLen = function (o,min,max) {
  let regex = new RegExp('^[0-9A-Za-z]{'+min+','+max+'}$');
  return regex.test(o)
}


;(function(o) {

  //没有模块化就挂载到window，有模块化则可以进行导入导出功能的使用

  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = o;
  } else if (typeof define === "function" && define.amd) {
    define([], o);
  } else {
    var g;
    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }

    g.Validators = o;
  }
})(Validators);






