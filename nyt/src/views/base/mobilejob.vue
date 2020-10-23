<template onload="setTimeout('redirect()', 300)">
  <div id="job">
    <h1>Carding Machine - Jobs Problem</h1>
    <CRow>
      <CCol lg="12">
        <CCard>
          <CCardBody>           
            <CRow>
              <CCol sm="6">               
              </CCol>
              <CCol sm="3">
              </CCol>
              <CCol sm="3">
                <CButton block  class="ManualCrate" @click="ManualCreateJob()">Create Job</CButton>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6">
                <label>Branch Office</label>
                <select class="form-control" id="SelbranchMobile" name="SelbranchMobile" v-model="branch">
                  <option value="Choose">Choose...</option>
                  <option value="Sai5" selected>สาย 5</option>
                  <option value="Petch">เพชรบุรี</option>
                </select>
              </CCol>
              <CCol sm="3">
                <label>Machine Status</label>
                <select class="form-control" v-model="selStatus" id="SelJob" name="SelJob" @change="selectjob()">
                  <option value="Choose">Choose...</option>
                  <option value="All" selected>All</option>
                  <option value="Open">Open</option>
                  <option style="background-color:#fca903;color:white" value="Pending">Pending</option>
                  <option style="background-color:#3474eb;color:white" value="In Progress">In Progress</option>
                  <option style="background-color:green;color:white" value="Completed">Completed</option>
                  <option style="background-color:red;color:white" value="Cancelled">Cancelled</option>
                </select>
              </CCol>
              <CCol sm="3">
                <CInput
                  label="Date"
                  type="text"
                  :value=currentTime                 
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol lg="12">
        <CCard>
          <CCardBody>
            <CRow>
                <CCol lg="12">
                    <h4>Job List</h4>
                    <div class="job" v-if="branch == 'Sai5' || branch == '' " v-for="item in items" >
                        <div class="extra_open" @click="jobs(item._id)" v-if="item.Status == 'Open'">
                            <p class="job_status"><b>{{item.Status}}</b></p>                       
                        </div>
                        <div class="extra_pending" @click="jobs(item._id)" v-if="item.Status == 'Pending'">
                            <p class="job_status"><b>{{item.Status}}</b></p>                       
                        </div>
                        <div class="extra_cancelled" @click="jobs(item._id)" v-if="item.Status == 'Cancelled'">
                            <p class="job_status"><b>{{item.Status}}</b></p>                       
                        </div>
                        <div class="extra_progress" @click="jobs(item._id)" v-if="item.Status == 'In Progress'">
                            <p class="job_status"><b>{{item.Status}}</b></p>                       
                        </div>
                        <div class="extra_completed" @click="jobs(item._id)" v-if="item.Status == 'Completed'">
                            <p class="job_status"><b>{{item.Status}}</b></p>                       
                        </div>
                        <div class="job_row">
                            <div style="display:flex">
                                <p class="custom_title">Job No: {{item.jobNo}}</p><br>
                                <p class="custom_title res">Response By:{{item.Response}}</p>
                            </div>
                            <div class="job_info">
                                <div style="width:30%">
                                    <p class="custom_title">Machine</p>
                                    <p class="custom_title">{{item.Machine}}</p>
                                </div>
                                <div style="width:30%;">
                                    <p class="custom_title">Job Date</p>
                                    <p class="custom_title">{{item.Date}}</p>
                                </div>
                            </div>
                            <div class="job_info"> 
                                <div style="width:25%">
                                    <p class="custom_title">Starting Date:</p>
                                    <p class="custom_title">{{item.StartDate}}</p>
                                </div>
                                <div style="width:25%">
                                    <p class="custom_title">Time</p>
                                    <p class="custom_title">{{item.StartTime}}</p>
                                </div>
                                <div style="width:25%">
                                    <p class="custom_title">Ending Date:</p>
                                    <p class="custom_title">{{item.EndDate}}</p>
                                </div>
                                <div style="width:25%">
                                    <p class="custom_title">Time</p>
                                    <p class="custom_title">{{item.EndTime}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="job" v-if="branch == 'Petch'" v-for="item in items" >
                        <div class="extra_open" @click="jobs(item._id)" v-if="item.Status == 'Open'">
                            <p class="job_status"><b>{{item.Status}}</b></p>                       
                        </div>
                        <div class="extra_pending" @click="jobs(item._id)" v-if="item.Status == 'Pending'">
                            <p class="job_status"><b>{{item.Status}}</b></p>                       
                        </div>
                        <div class="extra_cancelled" @click="jobs(item._id)" v-if="item.Status == 'Cancelled'">
                            <p class="job_status"><b>{{item.Status}}</b></p>                       
                        </div>
                        <div class="extra_progress" @click="jobs(item._id)" v-if="item.Status == 'In Progress'">
                            <p class="job_status"><b>{{item.Status}}</b></p>                       
                        </div>
                        <div class="extra_completed" @click="jobs(item._id)" v-if="item.Status == 'Completed'">
                            <p class="job_status" ><b>{{item.Status}}</b></p>                       
                        </div>
                        <div class="job_row">
                            <div style="display:flex">
                                <p class="custom_title">Job No: {{item.jobNo}}</p>
                                <p class="custom_title res">Response By:{{item.Response}}</p>
                            </div>
                            <div class="job_info">
                                <div style="width:30%">
                                    <p class="custom_title">Machine</p>
                                    <p class="custom_title">{{item.Machine}}</p>
                                </div>
                                <div style="width:30%">
                                    <p class="custom_title">Response By:</p>
                                    <p class="custom_title">{{item.Response}}</p>
                                </div>
                                <div style="width:30%;">
                                    <p class="custom_title">Job Date</p>
                                    <p class="custom_title">{{item.Date}}</p>
                                </div>
                            </div>
                            <div class="job_info"> 
                                <div style="width:25%">
                                    <p class="custom_title">Starting Date:</p>
                                    <p class="custom_title">{{item.StartDate}}</p>
                                </div>
                                <div style="width:25%">
                                    <p class="custom_title">Time</p>
                                    <p class="custom_title">{{item.StartTime}}</p>
                                </div>
                                <div style="width:25%">
                                    <p class="custom_title">Ending Date:</p>
                                    <p class="custom_title">{{item.EndDate}}</p>
                                </div>
                                <div style="width:25%">
                                    <p class="custom_title">Time</p>
                                    <p class="custom_title">{{item.EndTime}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<style scoped>
.res{
  margin-left: 5%;
}
.job_row{
font-size:12px;
font-weight:600;
padding-left:5%;
}
.ManualCrate{
  width: 35%;
  float: right;
  border-radius: 30px;
  background-color: #3574b2;
  color: #fff;
}
#job{
  font-size: 16px;
}
.job_status{
  color:#fff;
  font-size: 15px!important;
}
.custom_title{
    margin-bottom: 0px!important;
}
.job_info{
    width:110%;display:flex
}
.extra_open{
    margin-top: -4%;
    margin-left: 70%;
    margin-right: 1%;
    background-color: rgb(221, 233, 236);
    border-radius: 12px;
    text-align: center;
    height: 35%;
    
}
.extra_pending{
    margin-top: -4%;
    margin-left: 70%;
    margin-right: 1%;
    background-color: rgb(230, 226, 35);
    border-radius: 12px;
    text-align: center;
    height: 35%;
    color: #fff;
}
.extra_cancelled{
    margin-top: -4%;
    margin-left: 70%;
    margin-right: 1%;
    background-color:#d85b58;
    border-radius: 12px;
    text-align: center;
    height: 35%;
    color: #fff;
}
.extra_completed{
    margin-top: -4%;
    margin-left: 70%;
    margin-right: 1%;
    background-color:#5db262;
    border-radius: 12px;
    text-align: center;
    height: 35%;
    color: #fff;
}
.extra_progress{
    margin-top: -4%;
    margin-left: 70%;
    margin-right: 1%;
    background-color:#5f90c8;
    border-radius: 12px;
    text-align: center;
    height: 35%;
    color: #fff;
}
.job{
  border:1px solid rgb(139, 139, 168);
  border-radius:12px;  
  color: black;
  margin-top: 5%;
  

}
</style>
<script>
import Vue from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
Vue.use(Toast);
import CTableWrapper from './table/job.vue'
import axios from "axios";
import TheSidebarVue from '../../containers/TheSidebar.vue'
export default {
  name: 'Tables',
  components: { CTableWrapper },
  data () {
    return {
      file:'',
      customReason:"",
      customResponse:"",
      problemStatus:"",
      reasonStatus:"",
      responseStatus:"",
      branch:"",
      items:[],
      OpenJob:[],
      PendingJob:[],
      CompletedJob:[],
      CancelledJob:[],
      ProgressJob:[],      
      currentTime:"",
      selStatus:"",
      selected: [], // Must be an array reference!
      SelBranch:['เพชรบุรี', 'สาย 5'],
      SelectStatus: [
        'Open', 'Pending', 'In Process', 'Completed', 'Cancelled'
      ],
      jobData:[],
      job:{
          No:"",
          Date:"",
          StartTime:"",
          StartDate:"",
          EndTime:"",
          EndDate:"",
          Machine:"",
          Status:"",
          Remark:""
      },
    }
  },
  props: {
		url: {
			type: String,
			default: "http://localhost:3000/"
		}
	},
  created(){
    var time = new Date().toDateString();
    this.currentTime = time;
    this.fetchData()   
   
    this.checkScreen()
  },
  methods: {
    jobs(val){
      this.$router.push("/jobdetail/"+val); 
    },
    checkScreen(){
      setInterval(() => {
        this.fetchData()
      }, 6000)
    },
    async fetchData(){
      if(this.branch == "" || this.branch == "Sai5"){
          await axios.get(`${this.url}jobread_Sai5/readSai5`)
        .then(res => {				
          this.jobData = res.data;        
        }) 
        if(this.selStatus == "" || this.selStatus == "All" || this.selStatus == "Choose"){       
          this.items = this.jobData
          
          this.items.sort(function (a, b) {
          return ('' + a.Status).localeCompare(b.Status);
          })
          return this.items      
        }
        else{
          var Job = []
          for(var i=0;i<this.jobData.length;i++){
              if(this.jobData[i].Status === this.selStatus){
                  Job.push(this.jobData[i])           
              }
          }
          this.items = Job
          return this.items
        } 
      }else{
        await axios.get(`${this.url}jobread_Petch/readPetch`)
        .then(res => {				
          this.jobData = res.data;        
        }) 
        if(this.selStatus == "" || this.selStatus == "All" || this.selStatus == "Choose"){       
          this.items = this.jobData
          
          this.items.sort(function (a, b) {
          return ('' + a.Status).localeCompare(b.Status);
          })
          return this.items      
        }
        else{
          var Job = []
          for(var i=0;i<this.jobData.length;i++){
              if(this.jobData[i].Status === this.selStatus){
                  Job.push(this.jobData[i])           
              }
          }
          this.items = Job
          return this.items
        }       
      }     
    },
    ManualCreateJob(){
      var today = new Date();
      var yyyy = today.getFullYear();
      var dddd = today.getDate();
      var mmmm = today.getMonth()+1;
      this.job.Date = mmmm + "/" + dddd + "/" + yyyy;
      this.job.No = "j"+yyyy+(Math.floor(Math.random() * 10000) + 1)
      this.$router.push("/jobcreate/"+this.job.No).catch(()=>{});
    },
    async selectjob(){ 
      var e =await document.getElementById("SelJob");
      this.selStatus = e.options[e.selectedIndex].value;      
    },
    shuffleArray (array) {
      return array
    },
  }
}
</script>
