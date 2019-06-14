
import axios from 'axios'

export default {
  data(){
    return {

    }
  },
  methods:{
    // 上传文件
    $upload_file( type , data){
      let urls = ['', '/res/upload/image.do','/res/upload/movie.do','/res/upload/voice.do'];
      let sendMessage = ['', '正在发送图片...','正在发送视频...','正在发送语音...'];
      let backMessage = ['', '图片发送成功！','视频发送成功！','语音发送成功！'];
      let errorMessage = ['请求失败，请检查网络', '图片发送失败！','视频发送失败！','语音发送失败！'];

      return new Promise((resovle,reject)=>{
        let config = { headers:{'Content-Type': 'multipart/form-data' , memId : this.userMessage['memId']} } ;

        this.$loading(sendMessage[type]);

        axios.post( Configs['HTTP_REQUEST'] + urls[type],data,config).then((response)=>{

          this.$loading.close();

          if(response['data']['code'] === '000'){
            //this.$toast(backMessage[type]);
            resovle(response['data']['data'])
          }else{
            this.$toast(errorMessage[type]);
            reject()
          }

        },(error)=>{
          this.$loading.close();
          this.$toast(errorMessage[0]);
          reject(error)
        })
      })
    }
  }

}
