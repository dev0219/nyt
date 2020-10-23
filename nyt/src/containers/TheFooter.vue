<template>
  <CFooter :fixed="false">
    <div  class="ml-auto">
      <a href="#">NAN YANG TEXTILE</a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}} </span>
    </div>
    <!-- <div class="ml-auto">
      <span class="mr-1">Powered by</span>
      <a href="https://coreui.io/vue" target="_blank">CoreUI for Vue</a>
    </div> -->
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
