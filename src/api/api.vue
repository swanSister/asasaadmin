
<script>
import axios from 'axios'
let ctx = {}
const API_URL = "https://api.asasakorea.com"
export default {
  install(Vue, options){
    ctx.store = options.store
  },
  getUncertifiedUsers:function(param){
    return axios.post(`${API_URL}/users/getUncertifiedUsers`,param,{
      headers: {
        accept: 'application/json',
      }
    })
  },
  setAuth:function(param){
    console.log(param)
    console.log(param.addressData.sido)
    return axios.patch(`${API_URL}/users/setAuth`,param,{
      headers: {
        accept: 'application/json',
      }
    })
  },
  getUserByUserId:function(param){
    return axios.post(`${API_URL}/users/getByTopicId`,param,{
      headers: {
        accept: 'application/json',
      }
    })
  },
  uploadNotice:function(param){
    return axios.post(`${API_URL}/notice/upload`,param,{
      headers: {
        accept: 'application/json',
      }
    })
  },
  getNotice:function(param){
    return axios.post(`${API_URL}/notice/get`,param,{
      headers: {
        accept: 'application/json',
      }
    })
  },
  deleteNotice:function(param){
    return axios.post(`${API_URL}/notice/delete`,param,{
      headers: {
        accept: 'application/json',
      }
    })
  }
}
</script>