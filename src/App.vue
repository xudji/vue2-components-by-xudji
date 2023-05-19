<template>
  <div id="app">
    <router-link to="/form">form</router-link> &nbsp; &nbsp;
    <router-link to="/table">table</router-link> &nbsp; &nbsp;
    <router-link to="/toastConfirm">toastConfirm</router-link>&nbsp; &nbsp;
    <router-link to="/tree">tree</router-link>&nbsp; &nbsp;
    <router-link to="/tree-select">tree-select</router-link>&nbsp; &nbsp;

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
</style>
