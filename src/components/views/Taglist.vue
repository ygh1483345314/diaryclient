<template>
  <div class="taglist animated fadeIn" style="animation-duration: 1000ms" >
     <div class="taglist-body">
       <div class="taglist-down">
          <p class="taglist-title">分类</p>
          <div class="tags">
              <div v-for="type in typelist" class="tag" :key="type.id" @click="btnSearchByType(type.name)">{{type.name}} <span>{{type.qty}}篇</span></div>
          </div>


         <p class="taglist-title">标签</p>
              <div class="labels">
                <div v-for="tag in taglist" :key="tag.id"    @click="btnSearchByTag(tag.name)" class="label">{{tag.name}}</div>
              </div>
       </div>
      </div>
  </div>
</template>

<script>
    export default {
        name: "Taglist",
        methods:{
          typeList(){
            this.$axios.get('/api/blog/typeList')
              .then(res=>{
                var data=res.data.data;
                this.typelist=data.typelist
                this.taglist=data.taglist
              })
          },
          btnSearchByType(name){
            this.$router.push({path: "/Home",query: { type:name}})
          },
          btnSearchByTag(name){
            this.$router.push({path: "/Home",query: { tag:name}})
          }


        },
        data:()=>({
            typelist:[],
            taglist:[],
        }),
        created(){
          this.typeList();
        }
    }
</script>

<style>

.taglist{
  max-width: 1000px;
  min-width: 320px;
  height: auto;
  margin: 0 auto;
  padding: 0 10px;
}

.taglist-down{
  animation: show 0.8s;
}


.taglist-body{
  margin: 0 auto;
  /*width: 50%;*/
  height: 100%;
  padding: 30px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /*animation: show 0.8s;*/
}

.taglist-title{
  font-size: 22px;
  text-align: center;
}

.tags{
  width: 100%;
  /*height: auto;*/
  text-align: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 6%;
  /*min-width: 600px;*/
  max-width: 600px;
  justify-content: center
}

.tag{
  width: auto;
  /*height: 18px;*/
  padding: 5px 10px;
  border: 1px solid #eee;
  margin-right: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s all ;
}
.tag:hover{
  background-color: #555;
  color: #ffffff;
}
.tag span{
   font-size: 5px;
   color: #999;
}



.labels{
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content:center;
  /*min-width: 600px;*/
  max-width: 600px;
}

.label{
  position: relative;
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;
  font-size: 14px;
  color: rgba(38, 42, 48, 0.56);
  -webkit-tap-highlight-color: rgba(0,0,0,0);

}


.label:after{
  content: "";
  width: 0;
  height: 2px;
  background: #555;
  position: absolute;
  bottom: 0;
  left: 50%;
  transition: all .2s;
}


.label:hover:after,.label.active:after{
  left: 0%;
  width: 100%;
}
p{
  margin-bottom: 20px;
}


@media screen and (max-width: 650px) {
  .taglist-body{
    width: 100%;
    padding: 30px 0;
  }
  .taglist{
    width: 100%;
    padding: 0;
  }
  .tag{
   font-size: 8px;
  }
  .label{
    font-size: 14px;
    padding: 3px 6px;
    margin: 3px;
  }

}

/*@media screen and (max-width: 1300px  ) {
  .taglist-body{
    width: 65%;
    padding: 30px 0;
  }
  .taglist{
    width: 65%;
    !*padding: 0;*!
  }
  !*.taglist{*!
    !*width: 100%;*!
    !*padding: 0;*!
  !*}*!
  !*.tag{*!
    !*font-size: 8px;*!
  !*}*!
  !*.label{*!
    !*font-size: 14px;*!
    !*padding: 3px 6px;*!
    !*margin: 3px;*!
  !*}*!

}*/







</style>
