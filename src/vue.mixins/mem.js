
export default {
  data(){
    return {
      friend: {
        list: []
      }
    }
  },
  methods:{
    // 用户登录
    $login( params){
      return new Promise((resolve,reject)=>{

        this.$request({
          url:'/mem/login.do',
          loading:2,
          loadingMsg:'登录中...',
          data:{
            loginName:params.loginName,
            pwd : params.pwd
          }
        }).then((response)=>{
          resolve(response);
        },(error)=>{
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '登录失败!';
          this.$toast( msg );

          reject(error)

        })
      })
    },
    // 用户注册
    $register( params){
      return new Promise((resolve,reject)=>{

        this.$request({
          url:'/mem/register.do',
          loading:2,
          loadingMsg:'注册中...',
          data:{
            loginName:params.loginName,
            pwd : params.pwd
          }
        }).then((response)=>{
          resolve(response);
        },(error)=>{
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '注册失败!';
          this.$toast( msg );

          reject(error)

        })
      })
    },
    //修改密码
    $update_pwd( params){
      return new Promise((resolve,reject)=>{

        this.$request({
          url:'/mem/updatePwd.do',
          loading:2,
          loadingMsg:'修改中...',
          data:{
            oldPwd:params.oldPwd,
            newPwd : params.newPwd
          }
        }).then((response)=>{
          resolve(response);
        },(error)=>{
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '修改密码失败!';
          this.$toast( msg );

          reject(error)

        })
      })
    },
    // 获得好友列表
    $get_user_relation(){
      return new Promise((resolve,reject)=>{

        this.$request({
          url:'/mem/myFriend.do',
          loading:3,
        }).then((response)=>{
          this.friend.list = response['data'];
          resolve(response);
        },(error)=>{
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '获取我的好友列表失败!';
          this.$toast( msg );

          reject(error)
        })
      })
    },

    // 添加好友
    $add_friend(params){
      return new Promise((resolve,reject)=>{

        this.$request({
          url:'/mem/addFriend.do',
          loading:2,
          loadingMsg:'添加中...',
          data:{
            recommender:params.fromUser
          }
        }).then((response)=>{
          resolve(response);
        },(error)=>{
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '添加好友失败!';
          this.$toast( msg )
          reject(error)
        })
      })
    },
    // 移除好友
    $remove_friend(params){
      return new Promise((resolve,reject)=>{

        this.$request({
          url:'/mem/removeFriend.do',
          loading:2,
          loadingMsg:'移除中...',
          data:{
            friendId:params.friendId
          }
        }).then((response)=>{
          this.$get_user_relation();
          resolve(response);
        },(error)=>{
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '移除好友失败!';
          this.$toast( msg )
          reject(error)
        })
      })
    },

    // 获取code
    $get_code( params){
      return new Promise((resolve,reject)=>{

        this.$request({
          url:'/mem/qrCode.do',
          loading:3,
          data:{
            fromUser:params.fromUser,
          }
        }).then((response)=>{
          resolve(response);
        },(error)=>{
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '获取信息失败!';
          this.$toast( msg )
          reject(error)
        })
      })
    },
    // 获取用户信息
    $get_user_message(){
      return new Promise((resolve,reject)=>{

        this.$request({
          url:'/mem/info.do',
          loading:3,
        }).then((response)=>{
          let message = Object.assign(this.userMessage,response['data']);
          this.$store.commit('get_user_message',message)
          localStorage.setItem('user-info',JSON.stringify(message));

          resolve(response);
        },(error)=>{
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '获取用户信息失败!';
          this.$toast( msg );
          reject(error)
        })
      })
    },
    // 修改用户昵称
    $update_nickname( params){
      return new Promise((resolve,reject)=>{

        this.$request({
          url:'/mem/updateNickName.do',
          loading:2,
          loadingMsg:'修改中...',
          data:{
            nickName:params.nickName,
          }
        }).then((response)=>{
          this.$get_user_message()
          resolve(response);
        },(error)=>{
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '修改昵称失败!';
          this.$toast( msg )
          reject(error)
        })
      })
    },
    // 修改用户头像
    $update_user_header( params){
      return new Promise((resolve,reject)=>{

        this.$request({
          url:'/mem/updateHeader.do',
          loading:1,
          loadingMsg:'修改中...',
          data:{
            photo:params.photo,
          }
        }).then((response)=>{
          this.$get_user_message()
          resolve(response);
        },(error)=>{
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '修改头像失败!';
          this.$toast( msg )
          reject(error)
        })
      })
    },
  }
}
