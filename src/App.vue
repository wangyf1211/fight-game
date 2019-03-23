<template>
  <div id="app">
    <embed src="/static/bgm/bg.mp3" loop="true" autostart="true" />
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top:50px;
}

embed{
  visibility: hidden;
  height:5px;
}
</style>
