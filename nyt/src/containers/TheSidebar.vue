<template>
  <CSidebar 
    fixed 
    :minimize="!minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
    style="background-color:#3474eb"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <img src="img/Capture1.png" style="width:35px;height:35px;margin-right:5%;"/>
      <div class="c-sidebar-brand-full text-center" viewBox="0 0 556 134" style="margin-top:10px">
        <h5>NAN YANG<br>TEXTILE</h5>
      </div>
      <div class="c-sidebar-brand-minimized text-center" viewBox="0 0 110 134" style="margin-top:10px">    
      </div>  
    </CSidebarBrand>

    <CRenderFunction flat :content-to-render="$options.nav"/>
    <CSidebarMinimizer style="background-color:#3474eb;border-radius:50%"
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>
<style scoped>
.c-sidebar-minimizer::before {
  margin-right: 110px;
}
</style>
<script>
import nav from './_nav'

export default {
  name: 'TheSidebar',
  nav,
  computed: {
    show () {
      return this.$store.state.sidebarShow 
    },
    minimize () {
      return this.$store.state.sidebarMinimize 
    }
  }
}
</script>
