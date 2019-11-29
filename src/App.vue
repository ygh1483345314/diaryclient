<template>
  <div id="app">
            <router-view v-wechat-title='$route.name'/>
  </div>



 </template>

<script>
  import {
    mapActions,
    mapGetters,
  } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'articleMenuSource',
      'articleMenuTag',
      'articleMenu'
    ])
  },
  methods:{
    ...mapActions([
      'setArticleMenu',
      'setArticleMenuTag',
      'setArticleMenuSource'
    ]),

    scrollListener () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop >= 60) {
        this.showScrollToTop = true
      } else {
        this.showScrollToTop = false
      }
      if (this.articleMenu) {
        for (let i = 0, len = this.articleMenuSource.length; i < len; ++i) {
          let item = this.articleMenuSource[i]
          let top = document.getElementById(item.id).getBoundingClientRect().top
          top += document.body.scrollTop || document.documentElement.scrollTop
          if (scrollTop <= top + 20) {
            this.setArticleMenuTag(item.tag)
            break
          }
        }
      }
    },

    },



  data () {
    return {
      showScrollToTop: false,
    }
  },

  mounted() {

    window.addEventListener('scroll', this.scrollListener)
    // let visProp = this.getHiddenProp()
    // this.evtname = visProp.replace(/[H|h]idden/, '') + 'visibilitychange'
    // document.addEventListener(this.evtname, this.visibilityChange, false)
  },
  beforeDestroy () {
    // window.removeEventListener('resize', this.updateScreen, false)
    window.removeEventListener('scroll', this.scrollListener, false)
    // document.removeEventListener(this.evtname, this.visibilityChange, false)
  },

}
</script>

<style>
html,body{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background: #ffffff;
}

a{
  text-decoration: none;
}

ul,p{
  margin: 0;
  padding: 0;
}
li{
  list-style: none;
  /*float:left;*/
}
::selection
{
  color:#fff;
  background-color: black;
}
#app {
  width: 100%;
  height: 100%;
  font-family: 'Lato', "PingFang SC", "Microsoft YaHei", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
@keyframes show {
  from {
    margin-top: -15px;
    opacity: 0;
  }
  to {
    margin-top: 0px;
    opacity: 1;
  }
}
/*#nprogress .bar {*/
  /*background: #555 !important;*/
/*}*/

.admin-articles-all{
  width:  auto;
  height: 100%;
  padding: 20px;
}
.admin-articles-row{
  display: flex;
}

.admin-articles-col{
  flex: 1;
}
.el-select{
  display: block;
}
.el-tag.el-tag--info{
  background-color: #ecf5ff;
  color: #409eff;
  border: 1px solid #d9ecff;
}

.article-table{
  width:auto;
  margin: 20px 0;
}
.btnwidth{
  width: auto;
}
.admin-articles-col{
  margin:5px
}
.cell a{
  color: #337ab7;
}
.cell a:hover{
  color: #555;
}

.pages-Pc{
  display:block;
}
.pages-mobile{
  display: none;
}

.w-e-text{
  max-height: 550px;
}

.v-note-wrapper .v-note-panel{
  max-height: 520px;
}
.detail-type:hover{
  color: black;
}
.detail-type{
  border-bottom: 1px solid #555;
  color: #555;
  margin: 0 3px;
}
@media screen and (max-width: 640px){
  .admin-articles-row{
    display: block;
  }
  .admin-articles-all{
    padding: 5px;
  }
  .btnwidth{
    width: 100%;
  }
  .pages-Pc{
    display:none;
  }
  .pages-mobile{
    display: block;
  }
}


.el-pagination.is-background .el-pager li:not(.disabled).active{
  background-color:#555
}








/*.router-all{*/
  /*height: auto;*/
  /*min-height: 100%;*/
  /*padding-bottom: 90px;*/
  /*padding-top: 90px;*/
  /*margin-bottom: -90px;*/
  /*margin-top: -90px;*/
  /*!*min-height: calc(100vh - 180px);*!*/
  /*!*flex: 1;*!*/
  /*!*margin-top: -90px;*!*/
  /*!*margin-bottom: -90px;*!*/

/*}*/
/*.router-body{*/
  /*height: auto;*/
  /*min-height: calc(100vh - 107px);*/
  /*padding-bottom: 90px;*/
  /*padding-top: 90px;*/
  /*margin-bottom: -90px;*/
  /*margin-top: -90px;*/
/*}*/
/*.left-body{*/
  /*height: auto;*/
  /*flex:1;*/
/*}*/

/*.body-all {*/
  /*!*padding-right: auto;*!*/
  /*width: 100%;*/
  /*height: 100%;*/
  /*display:flex;*/
/*}*/


/*@media screen and (max-width: 960px){*/
  /*.body-all {*/
    /*padding-right: 0*/
  /*}*/
  /*.right-down-nav{*/
    /*display: none;*/
  /*}*/
/*}*/




/*.right-down-nav{*/
  /*position: fixed;*/
  /*width: 16px;*/
  /*height: 20px;*/
  /*background-color: #262a30;*/
  /*right: 10px;*/
  /*bottom: 45px;*/
  /*padding: 3px 3px 5px 3px ;*/
  /*z-index: 1050;*/
  /*cursor: pointer;*/
  /*line-height: 0;*/
/*}*/
/*.toggle-line{*/
  /*position: relative;*/
  /*display: inline-block;*/
  /*vertical-align: top;*/
  /*width: 100%;*/
  /*height: 2px;*/
  /*margin-top: 4px;*/
  /*background-color: #fff;*/
  /*transition: all 0.3s ease 0s;*/
/*}*/

/*.right-down-nav:hover .span1_nav{*/
  /*width: 50%;*/
  /*top: 3px;*/
  /*transform: rotateZ(-45deg); opacity: 1; transition: all 0.3s ease 0s;*/
/*}*/

/*.right-down-nav:hover .span3_nav{*/
  /*width: 50%;*/
  /*top: -3px;*/
  /*transform: rotateZ(45deg); opacity: 1; transition: all 0.3s ease 0s;*/
/*}*/

/*.span1{*/
  /*width: 100% !important; top: 6px !important; transform: rotateZ(-45deg) !important; opacity: 1 !important; transition: all 0.3s ease 0s !important;*/
/*}*/
/*.span2{*/
  /*width: 100% !important; top: 0px !important; transform: rotateZ(0deg) !important; opacity: 0 !important; transition: all 0.3s ease 0s !important;*/

/*}*/
/*.span3{*/
  /*width: 100% !important; top: -6px !important; transform: rotateZ(45deg) !important; opacity: 1 !important; transition: all 0.3s ease 0s !important;*/
/*}*/


</style>
