import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

Vue.mixin({

  methods:{
    $img_load(e){
      let  parentNode = e.target.parentNode || e.target.parentElement ;
      let imgBoxWidth = parentNode.offsetWidth;
      let imgBoxHeight = parentNode.offsetHeight;
      let imgHeight = e.target.height;
      let imgWidth = e.target.width;
      let imgBoxProp = imgBoxWidth / imgBoxHeight;
      let imgProp = imgWidth / imgHeight;
      if(imgProp >= imgBoxProp ){
        e.target.style.height = imgBoxHeight + 'px';
      }else{
        e.target.style.width = imgBoxWidth + 'px';
      }
    },
    $request({url ,type = 'POST' ,data ,responseType = 'json' ,headerContentType='application/x-www-form-urlencoded' , loading = 1,loadingMsg = '加载中...',interval=0 ,userMessage = { } }){

      //loading 1 - 不加载 2 - 一直加载 3 - 只加载第一次
      let isLoadingAnimate = true ;
      let toast = null ;

      if(loading === 3 ){
        let urls = sessionStorage.getItem('urls') ? JSON.parse(sessionStorage.getItem('urls')) : [];
        if(urls.indexOf(url) === -1){
          isLoadingAnimate = true;
          urls.push(url);
          sessionStorage.setItem('urls',JSON.stringify(urls));
        }else{
          isLoadingAnimate = false;
        }
      }

      if(loading === 2 || ( loading === 3 && isLoadingAnimate) ){
        this.$loading(loadingMsg);
        /*toast = this.$toast.loading({
          mask: true,
          duration: 0,       // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'circular',
          message: loadingMsg
        });*/
        interval = 300; // 如果需要加载动画，则延长返回时间，否则接口过快，出现页面闪烁
      }

      return new Promise((resolve,reject)=>{
        axios({
          url:`${url}`,
          baseURL:Configs['HTTP_REQUEST'] ,
          data:data,
          transformRequest: [function (data) {
            data = qs.stringify(data);
            return data
          }],
          method:type,
          headers: {'Content-Type': headerContentType ,'memId' : this.userMessage['memId'] },
          timeout:10000
        }).then((reponse)=>{

          setTimeout(()=>{

            this.$loading.close();


            let data = reponse.data;

            if(data['code'] === '000'){

              resolve(data)

            }else if(data['code'] === '004'){

              let router = window.location.href.split('#')[1];
              sessionStorage.setItem('redirect',router );
              this.$router.push({ path: '/Login' });

            }else{
              reject(data);
            }
          },interval)

        },(data)=>{
          this.$toast('请求失败，请检查网络');

          setTimeout(()=>{
            this.$loading.close();
          },100);

        }).catch( (error)=> {

          setTimeout(()=>{
            this.$loading.close();
          },100);

          console.error(error)
        })
      })
    },
  }
});
