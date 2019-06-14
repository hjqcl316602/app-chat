

export default {
  data(){
    return {
      msg:{
        list:[]
      },
      msgDetail:{
        list:[]
      }
    }
  },
  methods:{
    // 获取消息列表
    $get_msg_list( params){
      return new Promise((resolve,reject)=>{

        this.$request({
          url:'/msg/msgList.do',
          loading:3,
          loadingMsg:'加载中...',
        }).then((response)=>{
          this.msg.list =  response['data']  ;
          resolve(response);

        },(error)=>{
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '获取信息列表失败!';
          this.$toast( msg );
          reject(error)

        })
      })
    },
    // 发送单聊消息
    $send_single_msg( params){
      return new Promise((resolve,reject)=>{

        this.$request({
          url:'/msg/sendSingleMsg.do',
          loading:1,
          loadingMsg:'发送中...',
          data:{
            contentType:params.contentType,    // 1文本  2图片 3 视频 4 语音
            receiverId:params.receiverId,
            content:params.content
          }
        }).then((response)=>{

          resolve(response);

        },(error)=>{
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '发送消息失败!';
          this.$toast( msg );
          reject(error)

        })
      })
    },
    // 发送群聊消息
    $send_group_msg( params){
      return new Promise((resolve,reject)=>{

        this.$request({
          url:'/msg/sendGroupMsg.do',
          loading:1,
          loadingMsg:'发送中...',
          data:{
            contentType:params.contentType,    // 1文本  2图片 3 视频 4 语音
            groupId:params.groupId,
            content:params.content
          }
        }).then((response)=>{
          resolve(response);

        },(error)=>{
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '发送消息失败!';
          this.$toast( msg );
          reject(error)

        })
      })
    },
    // 获取消息详情
    $get_msg_detail( params){
      return new Promise((resolve,reject)=>{

        this.$request({
          url:'/msg/detail.do',
          loading:3,
          loadingMsg:'加载中...',
          data:{
            msgType:params.msgType ,// 1 - 单聊
            senderId:params.senderId // 单聊 - 对方id 群聊 - 群id
          }
        }).then((response)=>{
          this.msgDetail.list = this.msgDetail.list.concat(response['data']);
          resolve(response);

        },(error)=>{
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '获取信息详情失败!';
          this.$toast( msg );
          reject(error)

        })
      })
    },
  }
}
