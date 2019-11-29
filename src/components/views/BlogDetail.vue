<template>
  <div class="blogDetail-main" v-wechat-title="article.title">
      <div class="blogDetail-all" v-if="article.id">
        <div class="blogDetail-tetile">{{article.title}}</div>
        <div class="blogDetail-date">
          <div style="text-align: center ">
            <i class="el-icon-date"></i>
            <span class="pc-ishide">发表于 </span><span >{{article.dateb}}</span> | <i class="el-icon-folder"></i>
            <span class="pc-ishide">分类于</span>
            <router-link :key="t" v-for="t  in article.type" class="detail-type"
                         :to="{path:'/Home',query:{type:t}}" >{{t}}</router-link>
            |
            <i class="el-icon-view"></i>
            <span class="pc-ishide"> 浏览数 </span><span >{{article.reading}}</span>

          </div>

          <md-preview :contents="article.html" />
           <div class="blogDetail-boom-body">
                 <p>如果我的文章对您有帮助！有钱的捧个钱场，没钱的捧个人场，谢谢您！</p>
                 <el-button type="danger" class="btnThank" @click="showQrcode = !showQrcode" >赞赏支持</el-button>

             <transition name="slide-fade">
               <div class="qrcode-wrap" v-show="showQrcode" >
                  <span class="qrcode">
                    <img src='http://img.yeblog.club/wechat.png'/>
                    <p>微信支付</p>
                  </span>
                 <span class="qrcode">
                    <img src='http://img.yeblog.club/zhifubao.png'/>
                    <p>支付宝支付</p>
                  </span>
               </div>
             </transition>


           </div>
          <div class="blogDetail-boom-tag">
              <i class="el-icon-s-promotion" v-for="t in article.tag" >
                {{t}}
              </i>
          </div>

          <div class="pre-next-wrap">
                   <span v-if="onBlog!=null" class="pre-wrap" @click="$router.push({path:'/BlogDetail/'+onBlog.id})">
                     <i class="el-icon-arrow-left"></i>
                     {{onBlog.title}}
                      <!--<router-link  class="detail-type"  :to="{path:'/BlogDetail',query:{id:onBlog.id}}"  v-html="onBlog.title"></router-link>-->
                   </span>
                   <span   v-if="nexBlog!=null" class="next-wrap" @click="$router.push({path:'/BlogDetail/'+nexBlog.id})">
                      <!--<router-link  class="detail-type" :to="{path:'/BlogDetail',query:{id:nexBlog.id}}"  v-html="nexBlog.title"></router-link>-->
                     {{nexBlog.title}}
                     <i class="el-icon-arrow-right"></i>
                   </span>
          </div>

          <comments v-if="article.comments==1" :id="article.id" />
        </div>
      </div>

    <!--<no-data-->
      <!--v-if="!article.id"-->
      <!--text="没有找到该文章~"/>-->
  </div>

</template>

<script>
  import mdPreview from './mdPreview'
  import noData from './noData'
  import comments from './comments'
    export default {
        name: "BlogDetail",
        components: {
          mdPreview,
          noData,
          comments
        },
      created(){
          // console.log(this.$route.params.pathMatch)
        var id=this.$route.params.pathMatch;
        this.getArticleData(id);
      },
      watch:{
        '$route' (to, from) {
          // var id=this.$route.query.id;
          var id=this.$route.params.pathMatch;
          this.getArticleData(id);
        }
      },
      data:()=>({
        showQrcode:false,
        nexBlog:{id:0,title:""},
        onBlog:{id:0,title:""},
        article:{
          id:0,
          html:"#年后",
          article:0
        }
      }),
      methods:{
        getArticleData(id){
          this.article={};
          this.nexBlog={};
          this.onBlog={};
          if(id){
            this.$axios.get('/api/blog/'+id,null)
              .then(res=>{
                var data=res.data.data;
                if(data.article!=null) {
                  this.article = data.article;
                  this.nexBlog = data.nexBlog;
                  this.onBlog = data.onBlog;
                }
              })
          }

        },
      }
    }
</script>

<style>

  .slide-fade-enter-active{
    transition: all .3s ease
  }

  .slide-fade-leave-active {
    transition: all .3s ease
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(20px);
    opacity: 0
  }

.blogDetail-all{
  max-width: 1000px;
  min-height:100%;
  height: 100%;
  margin:0 auto;
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 2%;
  padding-right: 2%;
  border-radius: 15px;
  border: solid 1px #ccc ;
  box-shadow: 5px 5px 10px #ccc;
  animation: show .8s;
  display:block;
}
.blogDetail-boom-body{
  width: 100%;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.blogDetail-boom-body p{
  line-height: 2;
  color: #555;
  font-size: 14px;
  margin-top: 20px;
  text-align: center;
}

.blogDetail-boom-tag i{
  color: #fff;
  padding: 5px;
  background-color: #262a30;
  font-size: 12px;
  margin-right: 5px;
  border-radius: 5px;
  transition: all .3s;
  position: relative;
  margin-left: 10px;
  margin-top: 10px;
  line-height: 1;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}

.blogDetail-boom-tag{
  width: 100%;
  padding: 10px 0;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  border-bottom: 1px solid #eee;
}

.blogDetail-date{
  font-size: 12px;
  color: #555;
  margin-top: 10px;
  margin-bottom: 10px;
  /*text-align: center;*/
}

.blogDetail-tetile{
  font-size: 27px;
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
  font-weight: bolder;
}
#md-preview{
  position: relative;
  width: 100%;
  margin-top: 20px
}
.btnThank{
  margin-top: 10px;
  padding: 10px 24px;
  background-color: #f44336;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  transition: background-color .3s;
}
#comment{
  margin-top: 20px;
  position: relative;
  background-color: #fff;

}
.pre-next-wrap{
  width: 100%;
  padding-top: 25px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  color: #555;
  font-weight: 700;
}
.pre-wrap{
  flex: 1;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  padding-right: 10px;
  text-align: left;
}

.next-wrap{
  flex: 1;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  padding-left: 10px;
  text-align: right;
}
.qrcode-wrap{
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.qrcode{
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  padding: 10px;
}



.blogDetail-main{
  /*padding: 40px*/
  min-height: 100%;
  margin: 30px auto;
  width: auto;
  /*padding-top: 60px;*/
  padding-left: 3%;
  padding-right: 3%;

}
  @media screen and (max-width: 650px) {
    .blogDetail-all {
      width: 96%;
      padding: 2%;
      min-width: auto;
    }

    .blogDetail-main {
      min-height: 100%;
      height: 100%;
      margin: 10px auto;
      /*padding-top: 60px;*/
      padding-left: 3%;
      padding-right: 3%;
    }
    .blogDetail-boom-body{
      padding: 0;
    }
  }




.qrcode img{
  width: 180px;
}
  @keyframes show2 {
    from {
      margin-top: -20px;
      opacity: 0;
    }
    to {
      margin-top: 0px;
      opacity: 1;
    }
  }

</style>
