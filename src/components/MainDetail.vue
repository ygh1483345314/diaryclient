<template>
  <div class="main loadingtext">
    <div  v-for="arr in articlesArr" :key="arr.id" class="main-detail">
      <div style="animation-duration: 1000ms;" class="animated fadeIn">
        <div class="detail-tetile">
          <router-link :to="{path:'/BlogDetail/'+arr.id}"  v-html="arr.title"></router-link>
          <span v-if="arr.top==1" class="blog-top" >置顶</span>
        </div>

        <div class="detail-date"><i class="el-icon-date"></i>
          <span class="pc-ishide">发表于 </span><span >{{arr.dateb}}</span> | <i class="el-icon-folder"></i>
          <span class="pc-ishide">分类于</span>
          <router-link :key="t" v-for="t  in arr.type" class="detail-type"
                        :to="{path:'/Home',query:{type:t}}">{{t}}</router-link>
        </div>

        <div class="detail-note" v-html="arr.html"></div>

        <div class="body-items-lable">
          <i v-for="ta  in arr.tag"  class="body-lable el-icon-s-promotion" >
            {{ta}}
          </i>
        </div>

        <div class="detail-href">
          <router-link :to="{path:'/BlogDetail/'+arr.id}">阅读全文 » </router-link>
        </div>
      </div>
    </div>

    <el-pagination
      class="pages-Pc"
      style="text-align: center"
      background
      layout="prev, pager, next"
      :page-size="searchVo.size"
      :total="searchVo.total"
      :current-page="searchVo.page"
      :hide-on-single-page="true"
      @current-change="handleCurrentChange"
    >
    </el-pagination>


    <el-pagination
      class="pages-mobile"
      style="text-align: center"
      small
      background
      layout="prev, pager, next"
      :page-size="searchVo.size"
      :total="searchVo.total"
      :current-page="searchVo.page"
      :hide-on-single-page="true"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
  import  rightNav from  '../components/rightNav'
    export default {
        name: "MainDetail",
        components:{
          rightNav
        },
      computed:{
        btnSerch(){
          return this.$store.getters.search;
        }
      },
      watch:{
        btnSerch () {
          return this.getBlogList(this.$store.getters.title)
        },
        '$route' (to, from) {
          this.initTypeAndTag();
          this.getBlogList();//初始化 类型
        }
      },
      data:()=>({
        searchVo:{
          title:"",
          page:0,
          size:10,
          total:0,
          types:[],
          tags:[]
        },
        articlesArr: [],

      }),
      created(){
        // var type=this.$route.query.type
        // var tag=this.$route.query.tag
        // if(type){
        //   var  types=new Array();
        //   types.push(type);
        //   this.searchVo.type=types
        // }
        // if(tag){
        //   var  tags=new Array();
        //   tags.push(tag);
        //   this.searchVo.tags=tags
        // }
        this.initTypeAndTag();
        this.getBlogList()
      },
      mounted(){

        // Object.assign(this.$data, this.$options.data())
      },
      methods:{
        initTypeAndTag(){
          var query=this.$route.query;
          if(Object.keys(query).length==0) {
            Object.assign(this.$data, this.$options.data())
          }
          var type=query.type
          var tag=query.tag
          if(type){
            var  types=new Array();
            types.push(type);
            this.searchVo.type=types
          }
          if(tag){
            var  tags=new Array();
            tags.push(tag);
            this.searchVo.tags=tags
          }
        },
        getBlogList(title){


          if(title!=null){
            this.searchVo.page=0;
            this.searchVo.title=title
          }
          this.$axios.post('/api/blog/bolgList',this.searchVo)
            .then(res=>{
              var data=res.data.data;
              this.searchVo.total=data.total;
              this.searchVo.page=data.page;
              this.articlesArr=data.articlesArr
            })
        },


        handleCurrentChange(val){
          this.searchVo.page=val
          this.getBlogList();
        }
      }
    }
</script>

<style>


.main{
  /*width: 50%;*/
  max-width: 1000px;
  min-width: 652px;
  min-height:100%;
  height: 100%;
  margin:30px auto;
  padding-top: 60px;
  padding-left: 3%;
  padding-right: 3%;
}




.main-detail{
  height: auto;
  min-height: 240px;
  margin: 0 auto;
  padding: 25px;
  margin-bottom: 80px;
  border-radius: 15px;
  border: solid 1px #ccc ;
  box-shadow: 5px 5px 10px #ccc;
  animation: show 0.8s;
}

@media screen and (max-width: 1100px){
  .main-detail{
    box-shadow: 5px 5px 10px #ccc;
    width: 65%;
    height: auto;
    margin: 0 auto;
    padding: 25px;
    margin-bottom: 80px;
    min-width: 600px;
  }

}




.detail-tetile a:after{
  content: "";
  width: 0;
  height: 3px;
  background: #555;
  position: absolute;
  bottom: 0;
  left: 50%;
  transition: all .2s;
}


.detail-tetile a:hover:after,.detail-tetile a.active:after{
  left: 0%;
  width: 100%;
}


.detail-tetile{
  font-size: 27px;
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
}
.detail-tetile a{
  color: #555;
  position: relative;
  display: inline-block;
}
.detail-date{
  font-size: 12px;
  color: #555;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
}
.detail-date a{
  color: #555;
}
.detail-note{
  font-size: 16px;
  color: #555;
  margin-top: 15px;
  padding-bottom: 15px;
  line-height: 2;
  animation:show-data-v-09c83323 .8s

}
.detail-href{
  font-size: 14px;
  margin-top: 20px;
  text-align: center;
}

.detail-href a:hover{
  background-color:black;
  color: #fff;
}
.detail-href a{
  display: inline-block;
  padding: 0 20px;
  font-size: 14px;
  color: #555;
  background: #fff;
  border: 2px solid #555;
  text-decoration: none;
  border-radius: 2px;
  transition-property: background-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  transition-delay: 0s;
  line-height: 2;
}

/*.detail-type:hover{*/
  /*color: black;*/
/*}*/
/*.detail-type{*/
  /*border-bottom: 1px solid #555;*/
  /*color: #555;*/
  /*margin: 0 3px;*/
/*}*/


.body-items-lable{
  width: 100%;
  padding: 5px 0;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  border-bottom: 2px solid #eee;
  margin-bottom: 10px;
  text-align: center;
  justify-content: center;
}

.body-lable{
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

.page-class{
  display: flex;
  justify-content: center;
}

.page-mobile{
  display: none;
}
.body-lable:hover{
  background-color: #262a30c2;
}


.blog-top{
  width: 27px;
  height: 27px;
  border-radius: 4px;
  border: 1px solid #f56c6c7a;
  font-size: 14px;
  text-align: center;
  color: #ca0c16db;
  line-height: 27px;
  margin-left: 4px;
}
@media screen and (max-width: 650px){
  .main-detail{
    width: 90%;
    padding: 5%;
    min-width: auto;
  }

  .main{
    width: 94%;
    min-width: auto;
    /*padding-left: 3%;*/
    /*padding-right: 3%;*/
  }
  .detail-tetile{
    font-size: 20px;
    text-align: center;
    margin-bottom: 10px;
  }
  .pc-ishide{
    display: none;
  }
  .detail-date{
    text-align: center;
  }
  .detail-note{
    font-size: 12px;
    text-align: center;
  }
  .page-mobile{
    display: block;
  }
  .page-pc{
    display:none;
  }


}

</style>
