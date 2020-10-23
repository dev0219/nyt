<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler >
      <CHeaderNavLink>
       <!-- <b>{{username}}</b> -->
        <div class="c-avatar" style="margin-left:11px">
          <img
            src="img/avatars/6.jpg"
            class="c-avatar-img "
          />
        </div>        
      </CHeaderNavLink>
      
    </template>
    
    <CDropdownItem  @click="su(Supervisor)">
       {{Supervisor}}/Foreman  
    </CDropdownItem>
    <CDropdownItem @click="su(Technician)">
      {{Technician}}      
    </CDropdownItem>
  </CDropdown>
</template>

<script>
export default {
  name: 'TheHeaderDropdownAccnt',
  data () {
    return { 
      super:"",
      itemsCount: 42,
      username:"Joe",
      Supervisor:"Supervisor",
      Technician:"Technician"
    }
  },
  created(){
    this.rolesetting()
  },
  methods:{
    rolesetting(){
      if(localStorage.getItem("superrole") == null){
        localStorage.setItem("superrole", "Supervisor")
      }
    },
    su(val){
     localStorage.setItem("superrole", val);
     location.reload()
    }
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>