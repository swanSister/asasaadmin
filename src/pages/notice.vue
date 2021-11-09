<template>
  <div>
    <div class="flex align-items-center header">
      <div class="flex none justify-content-start">
        <span @click="$router.go('-1')" class="icon-left-open"></span>
      </div>
      <div class="title flex auto justify-content-center">
        공지사항
      </div>
    </div>
    <div class="flex justify-content-start auto add-btn" @click="$router.push('noticeWriting')">
      <div class="flex none align-items-center"><span class="icon icon-plus"></span>추가</div>
    </div>

    <vuescroll class="notice-content"
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
        <div class="notice-item" v-for="(item, index) in noticeList" :key="'noticeList'+index" @click="$router.push({name:'noticeDetail', query:{noticeId:item.noticeId}})">
          
          <div class="flex btn-content justify-content-end">
             <div class="flex none" @click.stop="deleteNotice(item)">삭제</div>
          </div>
          <div class="title">{{item.title}}</div>
          
          <div class="text">
            <div>
              {{item.text}}
            </div>
          </div>
          <div class="flex writer-content">
            <div class="writer">{{item.writerId}}</div>
            <div class="time">{{$moment(item.createdAt).format('YYYY-MM-DD')}}</div>
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
      noticeList:[],
      offset:0,
      limit:10,
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
    async deleteNotice(item){
      if(confirm('공지를 삭제 하시겠습니까?')){
        await this.$api.deleteNotice({noticeId:item.noticeId})
        let that = this
        this.noticeList = []
        setTimeout(function(){
           that.getNotice()
        },300)
       
      }
    },
    async handleRS(vsInstance, refreshDom, done) {//위로 당겨서 새로고침
      this.noticeList = []
      this.offset = 0
      this.getNotice()
      done();
    },
    handleRBD(vm, loadDom, done) {
      console.log("handleRS4")
      done();
    },
    async handleLoadStart(vm, dom, done) {//아래 당겨서 더보기
      this.offset+=this.limit
      this.getNotice()
      done();
    },
    handleLBD(vm, loadDom, done) {
      console.log("handleRS3")
      done();
    },
    async getNotice(){
      let res = await this.$api.getNotice({
        offset:this.offset,
        limit:this.limit,
      })
      console.log("notice list :",res)

      res.data.data.map(item=> this.noticeList.push(item))
    }
  },
  async mounted(){
  if(sessionStorage.login != "success"){
     this.$router.push('login')
   }else{
     this.getNotice()
   }
   
  }
}
</script>
<style scoped>
.header{
  margin:4vw 4vw 0 4vw;
  padding:2vw;
}
.header .title{
  font-size:6vw;
  font-weight: bold;
}
.add-btn{
  padding:4vw 4vw 0 4vw;
  text-align: right;
}
.add-btn div{
  color:white;
  background:tomato;
  padding:1vw 4vw;
  border-radius: 4vw;
  font-weight: bold;
}
.notice-content{
  width:100%;
  height:calc(100% - 30vw) !important;
  padding:2vw !important;
}
.notice-item{
  border-bottom: 1px solid #eee;
  text-align: left;
  padding:2vw;
}
.notice-item .btn-content{
  text-align: right;
  color:tomato;
}
.notice-item .title{
  font-size: 5vw;
  color: #000;
  font-weight: bold;
  margin-bottom: 1vw;
}
.notice-item .text{
  margin-bottom: 2vw;
  width:100%;
}
.notice-item .text div{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.notice-item .writer-content{
  font-size: 3vw;
}
.notice-item .writer-content .writer{
  color:tomato;
  margin-right: 2vw;
}
</style>