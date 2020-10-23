<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"    
  >
    <template #toggler >
      <CHeaderNavLink>
        <span style="width:20px"><CIcon name="cil-bell" /></span>
        <CBadge v-if="count_data > 0" color="danger" class="ml-auto flash_alert">{{count_data}}+</CBadge>
      </CHeaderNavLink>
    </template>
    <div style="border-radius:20px">
      <CDropdownHeader tag="div" class="text-center" style="background-color:blue;color:white;">
        <strong>ALERTS CENTER</strong>
      </CDropdownHeader>
      <CDropdownItem v-for="item in detected_machines"  class="flash_alert" style="border-bottom:1px solid #9faec7" @click="itemJob(item.jobId+item.machineId+item.machinetype+item._id)" >
          <img src="img/problem.png" width="34px" style="margin-left:1px;margin-right:10px"/>&nbsp;&nbsp;New problems! Job No.<br>{{item.jobId}} , {{item.machineId}}
      </CDropdownItem>
    </div>
  </CDropdown>
</template>
<style scoped>
.flash_alert{  
  animation: blinker 3s linear infinite;}
@keyframes blinker {  
  50% { opacity: 0; 
  background-color:rgb(168, 185, 221)
  ;}
}
 .c-icon {
    margin-right: 0.3rem;
  }
  .c-sidebar{
    background-color: rgb(52, 52, 238)!important;
  }
</style>
<script>
import detectedMachine from './detectData'
import axios from "axios";
export default {
  name: 'NotificationDropdown',
  data :function() {
    return {
      count_data:"",
      detected_machines:[],
      jobId:"",
      machineId:""
    }
  },
   props: {
		url: {
			type: String,
			default: "http://localhost:3000/"
		}
	},
  created(){
    this.fechdata()
    this.realtimedata()
  },
  methods:{
    realtimedata(){
      setInterval(() => {
        this.fechdata();
      }, 5000)
    },    
    AllAlerts(){
      this.isAll = !this.isAll
    },
    itemJob(val){
      var job = val.substring(0,28)
      var _id = val.substring(28,val.length)
      const params = {
        _id:_id
      }
      axios.post(`${this.url}detectdatadelete/delete`,{
          params : params
      }).then(res => {
        console.log("====deleted===", res.data)
      })
      this.$router.push("/jobcreate/"+job).catch(()=>{});
    },
    fechdata(){
      axios.get(`${this.url}detectdata/info`)
			.then(res => {
        this.detected_machines = res.data
        this.count_data = this.detected_machines.length
      })
    },
  }
}
</script>