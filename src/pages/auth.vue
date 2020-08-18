<template>
  <div>
    <div class="flex align-items-center header">
      <div class="flex none justify-content-start">
        <span @click="$router.go('-1')" class="icon-left-open"></span>
      </div>
      <div class="title flex auto justify-content-center">
        재인증
      </div>
    </div>
    <vuescroll class="auth-content"
     :ops = "ops"
        @refresh-start="handleRS"
        @load-before-deactivate="handleLBD"
        @refresh-before-deactivate="handleRBD"
        @load-start="handleLoadStart">
     
      <div class="slot-load" slot="load-beforeDeactive"></div>
      <div class="slot-load" slot="load-deactive"></div>
      <div class="slot-load" slot="load-start"></div>
      <div class="slot-load" slot="load-active"></div>
      <div class="slot-refresh" slot="refresh-deactive"></div>
      <div class="slot-refresh" slot="refresh-beforeDeactive"></div>
      <div class="slot-refresh" slot="refresh-start"></div>
      <div class="slot-refresh" slot="refresh-active"></div>
      <div class="child">
        <div class="flex column justify-content-center uncertified-user-list">
          <div class="flex column" v-for="(item, index) in unCertifiedUserList " :key="'unCertifiedUser'+index">
            <div class="addr">{{item.addressData.address}}</div>
            <div>
              <span class="building-name">{{item.buildingName}}</span>
              <span class="house-type">{{item.houseType == 1 ? '아파트' : (item.houseType == 2 ? '오피스텔' : '주택') }}</span>
            </div>
            <img class="addr-img" :src="item.authImgUrl">
            <input class="comment" placeholder="거절사유를 입력해 주세요." v-model="reason"/>
            <div class="btn-content flex justify-content-center">
              <div class="flex auto justify-content-center accept" @click="createAuth(item,true)">승인</div>
              <div class="flex auto justify-content-center reject" @click="createAuth(item,false)">거절</div>
            </div>
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
      reason:'',
      unCertifiedUserList:[],
      offset:0,
      limit:10,
      size:0,
      ops : {
      vuescroll: {
        mode: 'slide',
        pullRefresh: {
          enable: true,
          tips:{
            deactive: '',
          active: '',
          start: '',
          beforeDeactive: ''
          }
        },
        pushLoad: {
          enable: true,
          auto: true,
          autoLoadDistance: 10,
          tips:{
            deactive: '',
          active: '',
          start: '',
          beforeDeactive: ''
          }
        }
      }
    },
    }
  },
  methods:{
    async handleRS(vsInstance, refreshDom, done) {//위로 당겨서 새로고침
      this.unCertifiedUserList = []
      
      this.offset = 0
      this.getUncertifiedUsers()
      done();
    },
    handleRBD(vm, loadDom, done) {
      console.log("handleRS4")
      done();
    },
    async handleLoadStart(vm, dom, done) {//아래 당겨서 더보기
      this.offset+=this.limit
      this.getUncertifiedUsers()
      done();
    },
    handleLBD(vm, loadDom, done) {
      console.log("handleRS3")
      done();
    },
    async getUncertifiedUsers(){
      let res = await this.$api.getUncertifiedUsers({offset:this.offset, limit:this.limit})
      console.log("getUncertifiedUsers:",res)
      res.data.data.map(item => this.unCertifiedUserList.push(item))
    },
    async createAuth(item, isAuthSuccess){
      item.isAuthWait = false
      item.isAuthSuccess = isAuthSuccess
      if(!item.isAuthSuccess){
        item.reason = this.reason
      }
      let res = await this.$api.setAuth(item)
      console.log(res)

      let that = this
      setTimeout(function(){
        that.unCertifiedUserList = []
        that.offset = 0
        that.getUncertifiedUsers()
      },300)
    }
  },
  async mounted(){
   this.getUncertifiedUsers()
  }
}
</script>
<style scoped>
.auth-content{
  width:100%;
  height:calc(100vh - 20vw) !important;
}
.header{
  margin:4vw 4vw 0 4vw;
  padding:2vw;
}
.title{
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
  font-size:4vw;
  color:tomato;
  margin-right:4vw;
}
.uncertified-user-list .house-type{
  font-size:4vw;
  padding:1vw 2vw;
  color:white;
  background:tomato;
  border-radius: 2vw;
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
  .auth-content .title{
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