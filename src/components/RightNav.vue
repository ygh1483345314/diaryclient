<template>


      <div class="rightNav-all"  :style="{
      'width': hideRightNav ? '290px' : '0px',
      'transition': 'all .3s'
    }">
        <div  class="rightNavfix" >
          <div v-if="articleMenu">
            <span  class="rightNav-title"  :class="{'selectNavClass':selectRightNav}" @click="updateNav(true)" >文章目录</span>|
            <span  class="rightNav-title" :class="{'selectNavClass':!selectRightNav}" @click="updateNav(false)">站点信息</span>
          </div>

          <transition name="slide-fade">
              <div v-show="!selectRightNav" style="margin-top: 10px">
                <img src="../assets/images/authImg.jpg" class="top-photo"/>
                <div class="right-username">YEGHAO</div>
                <div class="right-body">java开发、前端开发、python开发 什么都学的程序员~</div>
                <div class="title_list">
                  <div class="title">
                    <p class="count">{{blogCount}}</p>
                     <p>文章</p>
                  </div>
                    <div class="title line">
                      <p class="count" >{{typeCount}}</p>
                      <p>分类</p>
                    </div>

                    <div class="title">
                      <p class="count">{{tagCount}}</p>
                      <p>标签</p>
                    </div>
                </div>
                <div class="about-item">
                   <a href="https://github.com/ygh1483345314/" class="iconfont  icon-github"> githup</a>
                </div>
              </div>
          </transition>



          <transition name="slide-fade">
            <div v-if="selectRightNav"  class="hi">
              <div class="content-wrap">
                <article-menu class="article-menu" :menu="articleMenu" :start="0" />
              </div>
            </div>
          </transition>

        </div>

      </div>
</template>

<script>
  import '../assets/iconfont/githup/iconfont.css'
  import articleMenu from './views/articleMenu.vue'
  import {
    mapActions,
    mapGetters,
  } from 'vuex'

    export default {
        name: "RightNav",
        data:()=>({
          blogCount:0,
          typeCount:0,
          tagCount:0
        }),
      components: {
        articleMenu
      },
      created(){
        this.getCount();
      },
      computed: {
        ...mapGetters([
          'articleMenu',
          'hideRightNav',
          'selectRightNav',
        ])
      },
      methods:{
        ...mapActions([
            'setHideRightNav',
            'setSelectRightnav'
          ]
        ),
        updateNav(fal){
          this.setSelectRightnav(fal)
        },
        getCount(){
          this.$axios.get('/api/blog/right',null)
            .then(res=>{
              var data=res.data.data;
              if(data!=null) {
                this.blogCount = data.blogCount;
                this.typeCount = data.typeCount;
                this.tagCount = data.tagCount;
              }
            })
        }

      },

    }
</script>

<style>

.navfix-padding{
  /*margin-top: 30px;*/
}
.article-menu {
  /*position: absolute;*/
  /*left: 0;*/
  /*top: 0;*/
  width: 100%;
  padding: 5px;
  text-align: left;
}
.rightNavfix{
  width: 290px;
  position: fixed;
  text-align: center;
  /*margin-top: 30px;*/
  padding-top: 30px;
  font-weight: bolder;
  background-color: #262a30;
  color: #999;
  height: 100%;
}
.rightNav-all{
  flex:none;
  width: 0;

  animation: show2 .8s;
}
.hi{
  position: absolute;
  left: 0;
  top: 60px;
}
.top-photo{
  width: 100px;
  border-radius: 50%;
  border: 4px solid #fff;
  /*margin-top: 15px;*/
}

.right-username{
  font-size: 18px;
  color: #ffffff;
  padding: 7px;
  margin-top: 5px;
}

.right-body{
  font-size: 14px;
  padding-left: 8px;
  padding-right: 8px;
  font-weight: bolder;
  margin-top: 5px;
}

.title_list{
  width: 100%;
  height: auto;
  overflow: hidden;
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.title{
  float: left;
  height: auto;
  font-size: 15px;
  padding:0 14px;
  cursor: pointer;
}

.title:hover{
  color: #ffffff;
  transition: all 0.3s ease 0s;
}
.title p{
  margin: 0;
}
.count{
  font-size: 19px;
}

.line{
  border-left: solid 1px #555;
  border-right: solid 1px #555;
}

.about-item{
  width: 80px;
  height: 32px;
  overflow: hidden;
  margin: 0 auto;
  line-height:32px;
  padding: 20px;
  font-weight: normal;
  border-radius: 5px;
}

.about-item a{
  width: 100%;
  height: 100%;
  padding: 8px;
  border: 1px solid #fc6423;
  border-radius: 5px;
  font-size: 14px;
  line-height: 1;
  color: #fc6423;
  transition: all .3s;
  cursor: pointer;
}

.about-item a:hover{
  color: #ffffff;
  background-color: #fc6423;
}

.rightNav-title{
  padding: 5px;
  font-weight: 700;
  cursor: pointer;
  color: #999;
}

.selectNavClass{
  color: #fff;
}
.slide-fade-enter, .slide-fade-leave-to {
  opacity: 0
}
@media screen and (max-width: 960px){
  .rightNav-all{
     display: none;
  }



}


</style>
