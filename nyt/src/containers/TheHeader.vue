<template>
  <CHeader fixed with-subheader light>
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="$store.commit('toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.commit('toggleSidebarDesktop')"
    />
    
    <CHeaderNav class="d-md-down-none mr-auto">
      
    </CHeaderNav>
    <CHeaderNav class="mr-4">
      <!-- <CHeaderNavItem class="d-md-down-none mx-0"> -->
        <NotificationBell/>
      <!-- </CHeaderNavItem> -->
      <TheHeaderDropdownAccnt/>
      
    </CHeaderNav>
    
    <CSubheader class="px-3">       
      <CBreadcrumbRouter class="border-0 mb-0"/>   
      <p class="role_name">{{role_name}}</p>   
    </CSubheader>
    
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'
import NotificationBell from './NotificationDropdown'

export default {
  name: 'TheHeader',
  components: {
    TheHeaderDropdownAccnt, NotificationBell
  },
  data(){
    return{
      role_name:"",
      isalert:false
    }
    
  },
  created(){
    if(localStorage.getItem('superrole') == "Supervisor" || localStorage.getItem('superrole') == ""){
      this.role_name = "Supervisor/Foreman"
    }else{
      this.role_name = "Technician"
    }
     
  },
  methods:{
    Notification(){
      this.isalert = true;
    }
  }
}
</script>
<style scoped>
.role_name{
  margin-left: 84%;
}
@media only screen and (max-width: 1783px) {
  .role_name {
    margin-left: 83%;
  }
}
@media only screen and (max-width: 1694px) {
  .role_name {
    margin-left: 82%;
  }
}
@media only screen and (max-width: 1600px) {
  .role_name {
    margin-left: 81%;
  }
}
@media only screen and (max-width: 1495px) {
  .role_name {
    margin-left: 78%;
  }
}
@media only screen and (max-width: 1328px) {
  .role_name {
    margin-left: 75%;
  }
}
@media only screen and (max-width: 1185px) {
  .role_name {
    margin-left: 71%;
  }
}
@media only screen and (max-width: 976px) {
  .role_name {
    margin-left: 65%;
  }
}
@media only screen and (max-width: 815px) {
  .role_name {
    margin-left: 61%;
  }
}
@media only screen and (max-width: 732px) {
  .role_name {
    margin-left: 57%;
  }
}
@media only screen and (max-width: 665px) {
  .role_name {
    margin-left: 53%;
  }
}
@media only screen and (max-width: 614px) {
  .role_name {
    margin-left: 47%;
  }
}
@media only screen and (max-width: 550px) {
  .role_name {
    margin-left: 40%;
  }
}
@media only screen and (max-width: 487px) {
  .role_name {
    margin-left: 34%;
  }
}
@media only screen and (max-width: 445px) {
  .role_name {
    margin-left: 30%;
  }
}
@media only screen and (max-width: 422px) {
  .role_name {
    margin-left: 25%;
  }
}
@media only screen and (max-width: 394px) {
  .role_name {
    margin-left: 20%;
  }
}
@media only screen and (max-width: 380px) {
  .role_name {
    margin-left: 17%;
  }
}
@media only screen and (max-width: 330px) {
  .role_name {
    margin-left: 1%;
  }
}
/* .header{
  margin-left:90%;
}
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
@media only screen and (max-width: 375px) {
  .header {
    margin-left: 60%;
  }
} */
</style>