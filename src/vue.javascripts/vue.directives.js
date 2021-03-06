import Vue from 'vue';

Vue.mixin({
  directives: {

    ['int']: {
      bind: function (el) {
        const input = el//.getElementsByTagName('input')[0];
        console.log(el)
        const trigger = (el, type) => {
          const e = document.createEvent('HTMLEvents')
          e.initEvent(type, true, true)
          el.dispatchEvent(e)
        }

        input.onkeyup = function (e) {
          if (input.value.length === 1) {
            input.value = input.value.replace(/[^1-9]/g, '')
          } else {
            input.value = input.value.replace(/[^\d]/g, '')
          }
          trigger(input, 'input')
        }
        input.onblur = function (e) {
          if (input.value.length === 1) {
            input.value = input.value.replace(/[^1-9]/g, '')
          } else {
            input.value = input.value.replace(/[^\d]/g, '')
          }
          trigger(input, 'input')
        }
      }

    },
    ['horizontal-screen']: {

      // 抱持横屏和竖屏一致显示
      bind(el, binding, vnode) {
        let self = vnode.context;

        function reset(init) {

          let width = document.documentElement.clientWidth,
            height = document.documentElement.clientHeight;
          //在竖屏状态我们通过添加transform:rotate(90deg)，来让这个页面横过来
          if (window.orientation == null || window.orientation === 180 || window.orientation === 0) { //竖屏状态
            el.style.webkitTransform = el.style.transform = `rotate(90deg)`;
            el.style.width = `${height}px`;
            el.style.height = `${width}px`;
            el.style.webkitTransformOrigin = el.style.transformOrigin = `${width / 2}px center`;
            //如果已经处于横屏状态就不做其他处理了
          } else if (window.orientation === 90 || window.orientation === -90) { //横屏状态
            el.style.webkitTransform = el.style.transform = `rotate(0)`;
            el.style.width = `${width}px`;
            el.style.height = `${height}px`;
          }
        }
        reset(true);

        let timer = null;
        el.fn = function (e) {
          clearTimeout(timer);
          timer = setTimeout(reset, 300);
        }

        window.addEventListener('resize', el.fn, false);

        if ("onorientationchange" in window) {
          window.addEventListener('orientationchange', el.fn, false);
        }
      },
      unbind(el, binding, vnode) {
        window.removeEventListener('resize', el.fn, false);
        window.removeEventListener('orientationchange', el.fn, false);
      }
    },
  }
})
