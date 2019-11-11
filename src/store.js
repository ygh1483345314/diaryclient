import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
  SET_AUTHENTICATED:'SET_AUTHENTICATED',
  SET_USER:'SET_USER',
  SET_SEARCH:'SET_SEARCH',
  SET_TITLE:'SET_TITLE',
  SET_COMMENT:'SET_COMMENT',
  SET_ARTICLE_MENU:'SET_ARTICLE_MENU',
  SET_ARTICLE_MENU_SOURCE:"SET_ARTICLE_MENU_SOURCE",
  SET_ARTICLE_MENU_TAG:"SET_ARTICLE_MENU_TAG",

  SET_HIDERIGHTNAV:"SET_HIDERIGHTNAV",
  SET_SELECTRIGHTNAV:"SET_SELECTRIGHTNAV",
}

const state = {
  isAuthenticated:false,
  user:{},
  search:false,
  title:"",
  commentsInfo:{},
  articleMenu: false,
  articleMenuSource: [],
  articleMenuTag: '1.',
  hideRightNav:false,
  selectRightNav:true,
}

const getters = {
  isAuthenticated:state=>state.isAuthenticated,
  user:state=>state.user,
  search:state=>state.search,
  title:state=>state.title,
  commentsInfo:state=>state.commentsInfo,
  articleMenu:state=>state.articleMenu,
  articleMenuSource:state=>state.articleMenuSource,
  articleMenuTag:state=>state.articleMenuTag,
  hideRightNav:state=>state.hideRightNav,
  selectRightNav:state=>state.selectRightNav,
}

const mutations = {
  [types.SET_AUTHENTICATED](state,isAuthenticated){
    if(isAuthenticated) state.isAuthenticated = isAuthenticated
    else state.isAuthenticated = false
  },
  [types.SET_USER](state,user){
    if(user) state.user = user
    else state.user = false
  },
  [types.SET_SEARCH](state,search){
    if(search) state.search = search
    else state.search = false
  },
  [types.SET_TITLE](state,title){
    if(title) state.title = title
    else state.title = ""
  },
  [types.SET_COMMENT](state,comment){
    if(comment) state.commentsInfo = comment
    else state.commentsInfo = {}
  },

  [types.SET_ARTICLE_MENU](state,articleMenu) {
    if (articleMenu) state.articleMenu = articleMenu
    else state.articleMenu = false
  },

  [types.SET_ARTICLE_MENU_SOURCE](state,articleMenuSource) {
    if (articleMenuSource) state.articleMenuSource = articleMenuSource
    else state.articleMenuSource = []
  }
  ,
  [types.SET_ARTICLE_MENU_TAG](state,articleMenuTag) {
    if (articleMenuTag) state.articleMenuTag = articleMenuTag
    else state.articleMenuTag = '1'
  },


  [types.SET_HIDERIGHTNAV](state,hideRightNav) {
    if (hideRightNav) state.hideRightNav = hideRightNav
    else state.hideRightNav = false
  },
  [types.SET_SELECTRIGHTNAV](state,selectRightNav) {
    if (selectRightNav) state.selectRightNav = selectRightNav
    else state.selectRightNav = false
  },

}

const actions = {
  setAuthenticated:({ commit },isAuthenticated)=>{
    commit(types.SET_AUTHENTICATED,isAuthenticated)
  },
  setUser:({ commit },user)=>{
    commit(types.SET_USER,user)
  },
  clearCurrentState:({ commit })=>{
    commit(types.SET_AUTHENTICATED,false)
    commit(types.SET_USER,null)
  },
  setSearch:({ commit },state)=>{
    commit(types.SET_SEARCH,state)
  },
  setTitle:({ commit },state)=>{
    commit(types.SET_TITLE,state)
  },
  setComment:({ commit },state)=>{
    commit(types.SET_COMMENT,state)
  },
  setArticleMenu:({ commit },state)=>{
    commit(types.SET_ARTICLE_MENU,state)
  },
  setArticleMenuSource:({ commit },state)=>{
    commit(types.SET_ARTICLE_MENU_SOURCE,state)
  },
  setArticleMenuTag:({ commit },state)=>{
    commit(types.SET_ARTICLE_MENU_TAG,state)
  },

  setHideRightNav:({ commit },state)=>{
    commit(types.SET_HIDERIGHTNAV,state)
  },
  setSelectRightnav:({ commit },state)=>{
    commit(types.SET_SELECTRIGHTNAV,state)
  },


  // setSearch(state){
  //   state.search=!state.searchselectNav
  //   // if(state.search === 0){
  //   //   state.search = 1
  //   // } else {
  //   //   state.search = 0
  //   // }
  // }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})
