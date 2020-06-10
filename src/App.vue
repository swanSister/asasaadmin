<template>
  <div id="app" style="height:100%; width:100%; margin:0; padding:0;">
    <router-view style="height:100%; width:100%;"/>
  </div>
</template>

<script>

import { polyfill } from 'es6-promise'
polyfill()

import Vue from 'vue'
import vuescroll from 'vuescroll'

Vue.use(vuescroll, {
  ops: {
    // The global config
  }
});
Vue.prototype.$vuescrollConfig = {
  bar: {
    background: '#000'
  }
};

import "@/assets/css/main.css"
import "@/assets/css/fontello.css"

export default {
  name: 'App',
   data: function () {
    return {
      varUA:null,
    }
  },
  methods:{
    
  },
  mounted:function(){
    
  }
}


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
 
}
</style>
