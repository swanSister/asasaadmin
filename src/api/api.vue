
<script>
import axios from 'axios'
let ctx = {}
const API_URL = "https://api.asasakorea.com/rest"
export default {
  install(Vue, options){
    ctx.store = options.store
  },
  getByPathWhere: function(path, where){
    console.log("##get API : ",path)
     return axios.get(`${API_URL}/${path}?${where}`)
  },
  getByPath: function(path, offset, limit){
    offset = 0
    limit = 10
    console.log("##get API : ",path)
     return axios.get(`${API_URL}/${path}?offset=${offset}&limit=${limit}`)
  },
  postByPath: function(path, param){
    console.log("post API : ",path,"data:",param)
    return axios.post(`${API_URL}/${path}`,param,{
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        Authorization: ''
      }
    })
  },
  patchByPath: function(path, param){
    console.log("post API : ",path,"data:",param)
    return axios.patch(`${API_URL}/${path}`,param,{
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        Authorization: ''
      }
    })
  }
}
</script>