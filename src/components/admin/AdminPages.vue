<template>
  <div class="admin-articles-all" >
    <div class="admin-articles-row">


      <div class="admin-articles-col" style="text-align: right">
        <el-button type="success"  class="btnwidth" round size="medium" @click="btnNewPage('AdminPagesNew')"  >添加新页面</el-button>

      </div>


    </div>

    <el-table
      :data="pagesArr"
      border
      class="article-table">

      <el-table-column
        label="页面名称"
        min-width="150px">
        <template slot-scope="scope">
          <a href="#">{{scope.row.title}}</a>
        </template>
      </el-table-column>

      <el-table-column
        prop="url"
        label="页面路径"
        min-width="100px"
      >
      </el-table-column>


      <el-table-column
        prop="dateb"
        label="发布时间"
        min-width="100px"
      >
      </el-table-column>



      <el-table-column
        prop="status"
        label="发布状态"
        min-width="100px"
      >
      </el-table-column>


      <el-table-column
        label="操作"
        min-width="170px"
      >
        <template slot-scope="scope">
          <el-button title="编辑" type="primary" @click="handleClick(scope.row)" icon="el-icon-edit" circle></el-button>
          <el-button  title="预览" type="warning"  @click="selectClick(scope.row.id)" icon="el-icon-search" circle></el-button>
          <el-button  title="删除" type="danger"  @click="deleteClick(scope.row.id)" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>



    <!--<el-pagination-->
      <!--class="pages-Pc"-->
      <!--style="text-align: right"-->
      <!--background-->
      <!--layout="prev, pager, next"-->
      <!--:total="1000">-->
    <!--</el-pagination>-->


    <!--<el-pagination-->
      <!--class="pages-mobile"-->
      <!--style="text-align: right"-->
      <!--small-->
      <!--layout="prev, pager, next"-->
      <!--:total="50">-->
    <!--</el-pagination>-->



  </div>


</template>

<script>
  export default {
    name: "AdminPages",
    data:()=>({
      pagesArr: [
      //   {
      //   dateb: '2016-05-02',
      //   title: '关于',
      //   url:"about",
      //   id:"",
      //   status: "已发布",
      // }
      ],
    }),
    created(){
      this.getData()
    },
    methods:{
      handleClick(row) {
        this.$router.push({path: "/AdminPagesNew",query: { id:row.id}})
      },
      btnNewPage(pages){
        this.$router.push({path: pages,query: { pathName:this.$route.path.replace("/","")}})
      },
      getData(){
        this.$axios.get('/api/admin/page')
          .then(res=>{
            var data=res.data.data;
            this.pagesArr=data
          })
      },
      deleteClick(row) {
        this.$confirm('是否删除该文章?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          this.$axios.delete("/api/admin/article/"+row,null).then(res=>{
            this.getData()
          })
        })
      },
      selectClick(row) {
        this.$router.push({path: "/BlogDetail",query: { id:row}})
      },


    }
  }
</script>

<style>



</style>
