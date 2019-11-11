import store from './store'
import router from './router/index'


export  default {

 AdminLoginSetStatus(decode){
  store.dispatch("setAuthenticated",decode!="")
  store.dispatch("setUser",decode.user);
  router.push('/admin')
},
  AdminLogOut(){
    localStorage.removeItem("token");
    store.dispatch("setAuthenticated",false)
    store.dispatch("setUser","")
    router.push('/adminLogin')
  },

  nowDateTime(){
    var now = new Date();
    var year = now.getFullYear(); //得到年份
    var month = now.getMonth(); //得到月份
    var date = now.getDate(); //得到日期
    var houre=now.getHours();
    var min=now.getMinutes();
    var ss=now.getSeconds();
    month = month + 1;
    month = month.toString().padStart(2, "0");
    date = date.toString().padStart(2, "0");

    houre = houre.toString().padStart(2, "0");
    min = min.toString().padStart(2, "0");
    ss = ss.toString().padStart(2, "0");

    var defaultDate = `${year}-${month}-${date} ${houre}:${min}:${ss}`;
    // this.$set(this.searchFormField, "date", defaultDate);
    return  defaultDate
  },

  // padLeftZero(str) {
  // return ('00' + str).substr(str.length);
  // }

};



