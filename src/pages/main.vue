<template>
  <div>
    <vuescroll class="main-content">
    <div class="title">관리</div>
    <div class="main-menu">
      <div @click="$router.push('auth')">인증</div>
      <div @click="$router.push('notice')">공지</div>
    </div>
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
      
    }
  },
  methods:{
  },
  async mounted(){
   if(sessionStorage.login != "success"){
     this.$router.push('login')
   }
  }
}
</script>
<style scoped>
.main-content{
  width:100%;
  height:100%;
  overflow-y:auto;
}
.main-content .title{
  margin:4vw;
  font-size:6vw;
  font-weight: bold;
  padding-bottom:4vw;
  border-bottom:1px solid #eee;
}
.main-menu{
  padding:2vw 20vw;
}
.main-menu div{
  margin-bottom:4vw;
  font-size:4vw;
  color:white;
  background:tomato;
  padding:2vw;
  font-weight: bold;
  border-radius: 4vw;
}
</style>