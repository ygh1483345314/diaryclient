<template>
  <div class="all">
         <main-detail ></main-detail>
  </div>
</template>

<script>
  import  MainDetail from  '../components/MainDetail'

    export default {
        name: "Home",
        components:{
            MainDetail,
          },
        methods:{

        }
        //   data(){
        //     searchVo:{
        //       title:""
        //     }
        //   },
        //   created(){
        //     this.getBlogList()
        //
        //   },
        // methods:{
        //   getBlogList(){
        //     this.$axios.post('/api/blog/bolgList',this.searchVo)
        //       .then(res=>{
        //         console.log(res)
        //         // var data=res.data.data;
        //         // this.searchVo.total=data.total;
        //         // this.searchVo.page=data.page;
        //         // this.articlesArr=data.articlesArr
        //       })
        //   },
        // }
    }
</script>

<style>


.all{

}
</style>
