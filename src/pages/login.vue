<template>
  <div>
    <vuescroll class="login-content">
    <div class="title">로그인</div>
      <textarea @keypress="onKeyPress"  placeholder="password" v-model="password">
      </textarea>
     
    </vuescroll>
  </div>
</template>

<script>
import vuescroll from 'vuescroll';
export default {
  components:{
    vuescroll
  },
  props:{
    
  },
  data () {
    return {
      password:''
    }
  },
  methods:{
    async onKeyPress(e){
      if (e.keyCode == 13) {
        let res = await this.$api.login({"password":this.password})
        console.log("login result:",res.data)
        if(res.data.data=="success"){
          sessionStorage.setItem("login","success")
          this.$router.push('main')
        }else{
          sessionStorage.setItem("login","")
        }
      }
    }
  },
  async mounted(){
   
  }
}
</script>
<style scoped>
.login-content .title{
  margin:4vw;
  font-size:6vw;
  font-weight: bold;
  padding-bottom:4vw;
  border-bottom:1px solid #eee;
}
.login-content textarea{
    width:80%;
    font-size: 5vw;
    line-height:1.5;
    font-weight: bold;
 }
</style>