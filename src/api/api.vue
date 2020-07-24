
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
    console.log("##get API : ",path)
     return axios.get(`${API_URL}/${path}?offset=${offset}&limit=${limit}&orderBy=createdAt desc`)
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
  deleteByPath: function(path, param){
    console.log("post API : ",path,"data:",param)
    return axios.delete(`${API_URL}/${path}`)
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