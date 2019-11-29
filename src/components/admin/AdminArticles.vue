<template>
  <div class="admin-articles-all" >
    <div class="admin-articles-row">
        <div class="admin-articles-col">
            <el-input  size="medium " v-model="searchVo.title" placeholder="文章标题"></el-input>
        </div>

      <div class="admin-articles-col">
        <el-select   size="medium"  v-model="searchVo.status" multiple placeholder="发布状态">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

      </div>


      <div class="admin-articles-col">
        <el-button type="success"  class="btnwidth" @click="btnGo" round size="medium ">查询</el-button>
      </div>


    </div>

    <el-table
      :data="articlesArr"
       border
       class="article-table">

      <el-table-column
        label="文章标题"
        min-width="150px">
        <template slot-scope="scope">
          <!--<a :href="'/#'+'/BlogDetail/'+scope.row.id">{{scope.row.title}}</a>-->
          {{scope.row.title}}
        </template>
      </el-table-column>

      <el-table-column
        prop="dateb"
        label="发布时间"
        min-width="100px"
       >
      </el-table-column>

      <el-table-column
        prop="reading"
        label="浏览量"
        min-width="50px"
       >
      </el-table-column>

      <!--prop="type"-->
      <el-table-column
        label="文章类型"
        min-width="150px">
        <template slot-scope="scope">
          <el-select   :disabled="true" v-model="scope.row.type" multiple placeholder="请选择文章类型">
            <el-option
              v-for="item in types"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column
        label="发布状态"
        min-width="100px"
        >
        <template slot-scope="scope">
          <el-select   :disabled="true" v-model="scope.row.status"  placeholder="发布状态">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="170px"
        >
        <template slot-scope="scope">
          <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
          <el-button title="编辑" type="primary" @click="updateClick(scope.row)" icon="el-icon-edit" circle></el-button>
          <el-button  title="查看" type="warning" @click="selectClick(scope.row.id)" icon="el-icon-search" circle></el-button>
          <el-button  title="删除" type="danger" @click="deleteClick(scope.row.id)" icon="el-icon-delete" circle></el-button>

        </template>
      </el-table-column>
    </el-table>



    <el-pagination
      class="pages-Pc"
      style="text-align: right"
      background
      layout="prev, pager, next"
      :page-size="searchVo.size"
      :total="searchVo.total"
      :current-page="searchVo.page"
      :pager-count="5"
      @current-change="handleCurrentChange"
    >
    </el-pagination>


    <el-pagination
      class="pages-mobile"
      style="text-align: right"
      small
      layout="prev, pager, next"
      :page-size="searchVo.size"
      :total="searchVo.total"
      :pager-count="5"
      :current-page="searchVo.page"
      @current-change="handleCurrentChange"
    >
    </el-pagination>



  </div>


</template>

<script>
    export default {
        name: "AdminArticles",
        data:()=>({
          articlesArr: [],
          types:[],
          statusList:[
            {label:"已发布",value:"1"},
            {label:"草稿",value:"0"},
          ],
          searchVo:{
            type:[],
            title:"",
            status:[],
            page:0,
            size:5,
            total:0
          },
        }),
      created(){
          this.getDataType();
          this.getArriclesList();
      },
      methods:{
        btnGo(){
          this.searchVo.page=0;
          this.getArriclesList();
        }
        ,
        updateClick(row) {
          this.$router.push({path: "/AdminNew",query: { id:row.id}})
        },
        selectClick(row) {
          this.$router.push({path: "/BlogDetail/"+row})
        },
        deleteClick(row) {
          this.$confirm('是否删除该文章?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error'
          }).then(() => {
            this.$axios.delete("/api/admin/article/"+row,null).then(res=>{
              this.getArriclesList()
            })
          })
        },
        handleCurrentChange(val) {
          this.searchVo.page=val
          this.getArriclesList();
        },

        getArriclesList(){
          this.$axios.post('/api/admin/article/search',this.searchVo)
            .then(res=>{
              var data=res.data.data;
              this.searchVo.total=data.total;
              this.searchVo.page=data.page;
              this.articlesArr=data.articlesArr
            })
        },
        getDataType(){
          this.$axios.get('/api/admin/type',null)
            .then(res=>{
              this.types=res.data.data;
            })
        },

      }
    }
</script>

<style>
</style>
