<template>
  <div>
    <vuescroll class="main-content">
    <div class="title"> 인증 요청</div>
     <div class="flex column justify-content-center uncertified-user-list">
       <div  class="flex column" v-for="(item, index) in unCertifiedUserList " :key="'unCertifiedUser'+index">
         <div class="addr">{{item.fields.addressData.address}}</div>
         <div>
          <span class="building-name">{{item.fields.buildingName}}</span>
          <span class="house-type">{{item.fields.houseType.name}}</span>
         </div>
         <img class="addr-img" :src="item.fields.authImgSrc ? item.fields.authImgSrc['img_0'] : ''">
         <input class="comment" placeholder="거절사유를 입력해 주세요." v-model="item.fields.reason"/>
         <div class="btn-content flex justify-content-center">
           <div class="flex auto justify-content-center accept" @click="createAuth(item,true)">승인</div>
           <div class="flex auto justify-content-center reject" @click="createAuth(item,false)">거절</div>
         </div>
       </div>
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
      unCertifiedUserList:[],
      offset:0,
      limit:10,
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
   this.getUncertifiedUsers()
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
}
.uncertified-user-list{
  margin:4vw;
  border-bottom:1px solid #ddd;
}

.uncertified-user-list .addr{
  font-size:4vw;
  font-weight: bold;
  margin-bottom: 2vw;
}
.uncertified-user-list .building-name{
  font-size:6vw;
  color:tomato;
  margin-right:4vw;
}
.uncertified-user-list .house-type{
  font-size:5vw;
  padding:2vw;
  color:white;
  background:tomato;
}
.uncertified-user-list .addr-img{
  font-size:4vw;
  font-weight: bold;
  width:100%;
  min-height: 40vw;
  height:auto;
  margin: 4vw 0;
}
.uncertified-user-list .comment{
  font-size:4vw;
  margin-bottom: 2vw;
  padding:2vw;
  border-bottom:1px solid #ddd;
  
}
.uncertified-user-list .btn-content{
  font-size: 4vw;
  color:white;
  margin-bottom: 12vw;
}
.uncertified-user-list .btn-content div{
  padding:2vw;
}
.uncertified-user-list .btn-content .accept{
  background:tomato;
}
.uncertified-user-list .btn-content .reject{
  background: #555;
}

@media (min-width: 1025px){
  .main-content .title{
    margin:2vw;
    font-size:3vw;
  }
  .uncertified-user-list{
    margin:2vw;
    border-bottom:1px solid #ddd;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .uncertified-user-list > div{
    width:48vw;
    padding:4vw;
  }
  .uncertified-user-list .addr{
    font-size:2vw;
    font-weight: bold;
    margin-bottom: 1vw;
  }
  .uncertified-user-list .addr-img{
    font-size:2vw;
    font-weight: bold;
    width:100%;
    min-height: 20vw;
    height:auto;
    margin-bottom: 1vw;
  }
  .uncertified-user-list .comment{
    font-size:2vw;
    margin-bottom: 1vw;
    padding:1vw;
    border-bottom:1px solid #ddd;
  }
  .uncertified-user-list .btn-content{
    font-size: 2vw;
    color:white;
    margin-bottom: 3vw;
  }
  .uncertified-user-list .btn-content div{
    padding:1vw;
  }
  .uncertified-user-list .btn-content .accept{
    background:tomato;
  }
  .uncertified-user-list .btn-content .reject{
    background: #555;
  }
    
}
</style>