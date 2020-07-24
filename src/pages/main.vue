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
    async getUncertifiedUsers(){
      let res = await this.$api.getByPathWhere('users',`isAuth=false&offset=${this.offset}&limit=${this.limit}`)

      this.unCertifiedUserList = res.data.documents
      this.unCertifiedUserList = this.unCertifiedUserList.filter(item=> !item.fields.auth)
      this.unCertifiedUserList.map(item=>item.fields.reason = '')
      console.log(this.unCertifiedUserList)
    },
    async createAuth(item, isAuthComplete){
      let res = await this.$api.postByPath('auth',{
        isAuthComplete:isAuthComplete,
        reason:isAuthComplete ? '' : item.fields.reason,
        id: item.id,
        path: item.path
      })
      let patchRes = await this.$api.patchByPath(item.path,{
          isAuth: isAuthComplete,
          auth: 'ref ' + res.headers.location
      })
      console.log('patchRes',patchRes)
      this.getUncertifiedUsers()
      
    }
  },
  async mounted(){
   
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