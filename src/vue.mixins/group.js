

export default {
  data(){
    return {
      group:{
        list:[]
      }
    }
  },
  methods:{
    // 获得群聊列表
    $get_group_list( params){
      return new Promise((resolve,reject)=>{

        this.$request({
          url:'/group/groupList.do',
          loading:3,
        }).then((response)=>{
          this.group.list = response['data'];
          resolve(response);
        },(error)=>{
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '获取群聊列表失败!';
          this.$toast( msg );
          reject(error)
        })
      })
    },

    // 获得群聊详情
    $get_group_detail( params){
      return new Promise((resolve,reject)=>{

        this.$request({
          url:'/group/detail.do',
          loading:2,
          data:{
            groupId : params.groupId
          }
        }).then((response)=>{
          resolve(response);
        },(error)=>{
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '获取群聊详情失败!';
          this.$toast( msg );
          reject(error)
        })
      })
    },

    // 创建群聊
    $create_chat( params){
      return new Promise((resolve,reject)=>{

        this.$request({
          url:'/group/create.do',
          loading:2,
          loadingMsg:'创建中...',
          data:{
            friendIds:params.friendIds
          }
        }).then((response)=>{
          resolve(response);
          this.$toast( '成功创建群聊！' );
        },(error)=>{
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '创建群聊失败!';
          this.$toast( msg );

          reject(error)

        })
      })
    },

    // 删除群成员
    $del_mem( params){
      return new Promise((resolve,reject)=>{

        this.$request({
          url:'/group/removeMem.do',
          loading:2,
          loadingMsg:'删除中...',
          data:{
            groupId:params.groupId,
            friendId:params.friendId
          }
        }).then((response)=>{
          resolve(response);
          //this.$toast( '成功删除群聊！' );
        },(error)=>{
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '删除群成员失败!';
          this.$toast( msg );

          reject(error)

        })
      })
    },

    // 修改群名称
    $update_group_name( params){
      return new Promise((resolve,reject)=>{

        this.$request({
          url:'/group/updateGroupName.do',
          loading:2,
          loadingMsg:'修改中...',
          data:{
            groupId:params.groupId,
            groupName:params.groupName
          }
        }).then((response)=>{
          resolve(response);
          this.$toast( '成功修改群名称！' );
        },(error)=>{
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '修改群名称失败!';
          this.$toast( msg );

          reject(error)

        })
      })
    },
    // 添加群成员
    $add_group_mem( params){
      return new Promise((resolve,reject)=>{

        this.$request({
          url:'/group/addMems.do',
          loading:2,
          loadingMsg:'添加中...',
          data:{
            groupId:params.groupId,
            friendIds:params.friendIds
          }
        }).then((response)=>{
          resolve(response);
          this.$toast( '成功添加新成员 ！' );
        },(error)=>{
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '添加新成员失败!';
          this.$toast( msg );

          reject(error)

        })
      })
    },
  }
}
