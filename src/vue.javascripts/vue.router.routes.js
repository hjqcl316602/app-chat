
const Login = r => require.ensure([], () => r(require('@/vue.pages/Login.vue')), 'Login');
const Regist = r => require.ensure([], () => r(require('@/vue.pages/Regist.vue')), 'Regist');
const Index = r => require.ensure([], () => r(require('@/vue.pages/Index.vue')), 'Index');
const Relation = r => require.ensure([], () => r(require('@/vue.pages/Relation.vue')), 'Relation');
const RelationGroup = r => require.ensure([], () => r(require('@/vue.pages/RelationGroup.vue')), 'RelationGroup');
const Chat = r => require.ensure([], () => r(require('@/vue.pages/Chat.vue')), 'Chat');
const ChatGroupRoom = r => require.ensure([], () => r(require('@/vue.pages/ChatGroupRoom.vue')), 'ChatGroupRoom');
const ChatGroup = r => require.ensure([], () => r(require('@/vue.pages/ChatGroup.vue')), 'ChatGroup');
const ChatGroupDetail = r => require.ensure([], () => r(require('@/vue.pages/ChatGroupDetail.vue')), 'ChatGroupDetail');
const ChatGroupUpdate = r => require.ensure([], () => r(require('@/vue.pages/ChatGroupUpdate.vue')), 'ChatGroupUpdate');
const User = r => require.ensure([], () => r(require('@/vue.pages/User.vue')), 'User');
const UserMessage = r => require.ensure([], () => r(require('@/vue.pages/UserMessage.vue')), 'UserMessage');
const UserMessageUpdate = r => require.ensure([], () => r(require('@/vue.pages/UserMessageUpdate.vue')), 'UserMessageUpdate');
const UserMessageUpdatePwd = r => require.ensure([], () => r(require('@/vue.pages/UserMessageUpdatePwd.vue')), 'UserMessageUpdatePwd');
const Invite = r => require.ensure([], () => r(require('@/vue.pages/Invite.vue')), 'Invite');

export default  [
  { path: '*', redirect: '/Login'},
  { path: '/', redirect: '/Login'},
  { path: '/Login', name: 'Login', component:Login , meta: { keepAlive:false,title:"登录",isLogin:false , isNoNeedUserName : false} },
  { path: '/Regist', name: 'Regist', component:Regist , meta: { keepAlive:false,title:"注册",isLogin:false , isNoNeedUserName : true } },
  { path: '/Index', name: 'Index', component:Index , meta: { keepAlive:false,title:"无了",isLogin:true ,} },
  { path: '/Relation', name: 'Relation', component:Relation , meta: { keepAlive:false,title:"通讯录",isLogin:true ,} },
  { path: '/RelationGroup', name: 'RelationGroup', component:RelationGroup , meta: { keepAlive:false,title:"通讯录",isLogin:true ,} },
  { path: '/Chat', name: 'Chat', component:Chat , meta: { keepAlive:false,title:"聊天",isLogin:true ,} },
  { path: '/User', name: 'User', component:User , meta: { keepAlive:false,title:"个人中心",isLogin:true ,} },
  { path: '/UserMessage', name: 'UserMessage', component:UserMessage , meta: { keepAlive:false,title:"个人中心",isLogin:true ,} },
  { path: '/UserMessageUpdate', name: 'UserMessageUpdate', component:UserMessageUpdate , meta: { keepAlive:false,title:"个人中心",isLogin:true ,} },
  { path: '/UserMessageUpdatePwd', name: 'UserMessageUpdatePwd', component:UserMessageUpdatePwd , meta: { keepAlive:false,title:"密码修改",isLogin:true ,} },
  { path: '/Invite', name: 'Invite', component:Invite , meta: { keepAlive:false,title:"邀请好友",isLogin:false ,} },
  { path: '/ChatGroup', name: 'ChatGroup', component:ChatGroup , meta: { keepAlive:false,title:"群聊",isLogin:true ,} },
  { path: '/ChatGroupRoom', name: 'ChatGroupRoom', component:ChatGroupRoom , meta: { keepAlive:false,title:"群聊",isLogin:true ,} },
  { path: '/ChatGroupDetail', name: 'ChatGroupDetail', component:ChatGroupDetail , meta: { keepAlive:false,title:"群聊详情",isLogin:true ,} },
  { path: '/ChatGroupUpdate', name: 'ChatGroupUpdate', component:ChatGroupUpdate , meta: { keepAlive:false,title:"更新群名称",isLogin:true ,} },
]







// isLoaded - 用于判断是否第一次加载，第一次加载是不管从来自哪个页面（即使是来自的页面需要缓存该页面），  还是尽量少使用keepAlive组件
// idLoad - 用于判断页面是否需要缓存
// keepAlivePages - 来自的页面需要缓存当前页面的页面组

/*
在需要缓存的页面中 activated中添加方法
if(!this.$route.meta.isLoaded || (this.$route.meta.isLoaded && !this.$route.meta.isLoad)){
  this.$route.meta.isLoaded = true;
  this._init_page();
}
*/
