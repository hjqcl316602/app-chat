
export default {
  state:{
    userMessage:JSON.parse( sessionStorage.getItem('userMessage') ) || {},
  },

  mutations:{
    ['get_user_message'](state,obj = {}){

      state.userMessage = obj ;

      sessionStorage.setItem('userMessage',JSON.stringify(state.userMessage));

    }

  }
}
