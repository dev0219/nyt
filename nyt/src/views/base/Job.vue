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
                <CButton v-if="role_manual == 'Supervisor'" block color="primary" class="ManualCrate" @click="ManualCreateJob()">Create Job</CButton>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6">
                <label>Branch Office</label>
                <select class="form-control" id="Selbranch" name="Selbranch" v-model="branch">
                  <option value="Choose">Choose...</option>
                  <option value="Sai5" selected>สาย 5</option>
                  <option value="Petch">เพชรบุรี</option>
                </select>
              </CCol>
              <CCol sm="3">
                <label>Job Status</label>
                <select class="form-control" id="SelJob" v-model="SelJob" @change="SelProcess">
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
                <div v-if="branch == '' || branch == 'Sai5'">
                  Sai5
                  <CTableWrapper
                    :items="getShuffledJobData1()"
                  />
                </div>
                <div v-if="branch == 'Petch'">
                  Petch
                  <CTableWrapper
                    :items="getShuffledJobData2()"
                  />
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
.ManualCrate{
  width: 35%;
  float: right;
  border-radius: 30px;
}
#job{
  font-size: 16px;
}
</style>
<script>
import Vue from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
Vue.use(Toast);

import CTableWrapper from './table/job.vue'
import TheSidebarVue from '../../containers/TheSidebar.vue'
import axios from "axios";
export default {
  name: 'Tables',
  components: { CTableWrapper },
  data () {
    return {
      jobSelData1:[],
      jobSelData2:[],
      isJob:false,
      file:'',
      SelJob:'',
      customReason:"",
      customResponse:"",
      problemStatus:"",
      reasonStatus:"",
      responseStatus:"",
      branch:'Sai5',
      OpenJob:[],
      PendingJob:[],
      CompletedJob:[],
      CancelledJob:[],
      ProgressJob:[],      
      currentTime:"",
      selStatus:"",
      selected: [], // Must be an array reference!
      SelectStatus: [
        'Open', 'Pending', 'In Process', 'Completed', 'Cancelled'
      ],
      jobData:[],
      jobData1:[],
      role_manual:"",
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
  async created(){
    var time = new Date().toDateString();
    this.currentTime = time
    this.screenRedirect()
    await this.fectchdata1()
    await this.fectchdata2()
  },
  methods: {
    fectchdata1(){
      axios.get(`${this.url}jobread_Sai5/readSai5`)
			.then(res => {			
        this.jobData = res.data; 
        for(var i=0;i < this.jobData.length;i++){ 
          this.jobData[i]['_classes']="";                 
            if(this.jobData[i]['Status'] == "Completed"){
              this.jobData[i]['_classes']="bg-success";
            }else if(this.jobData[i]['Status'] == "Open"){
              this.jobData[i]['_classes']="";
            }else if(this.jobData[i]['Status'] == "Pending"){
              this.jobData[i]['_classes']="bg-warning";
            }else if(this.jobData[i]['Status'] == "Cancelled"){
              this.jobData[i]['_classes']="bg-danger";
            }else if(this.jobData[i]['Status'] == "In Progress"){
              this.jobData[i]['_classes']="bg-info";
            }         
        }
        this.jobSelData1 = this.jobData
        this.jobSelData1.sort(function (a, b) {
        return ('' + a.Status).localeCompare(b.Status);
        })    
      })   
    },
    fectchdata2(){
      axios.get(`${this.url}jobread_Petch/readPetch`)
			.then(res => {				
        this.jobData1 = res.data;  
        for(var i=0;i < this.jobData1.length;i++){
          this.jobData1[i]['_classes']="";
          if(this.jobData1[i]['Status'] == "Completed"){
            this.jobData1[i]['_classes']="bg-success";
          }else if(this.jobData1[i]['Status'] == "Open"){
            this.jobData1[i]['_classes']="";
          }else if(this.jobData1[i]['Status'] == "Pending"){
            this.jobData1[i]['_classes']="bg-warning";
          }else if(this.jobData1[i]['Status'] == "Cancelled"){
            this.jobData1[i]['_classes']="bg-danger";
          }else if(this.jobData1[i]['Status'] == "In Progress"){
            this.jobData1[i]['_classes']="bg-info";
          }
        }
        this.jobSelData2 = this.jobData1
        this.jobSelData2.sort(function (a, b) {
        return ('' + a.Status).localeCompare(b.Status);
        })     
      })     
    },
    SelProcess(){
      if(this.branch == 'Sai5'){
        if(this.SelJob == "All"){
            this.jobSelData1 = this.jobData
        }        
        else if(this.SelJob == "Open"){
          var  OpendataItem=[];
          var  Opendata= [];
          for (var i=0 ; i< this.jobData.length;i++){
            if(this.jobData[i]['Status'] == 'Open'){
              OpendataItem = this.jobData[i]
              Opendata.push(OpendataItem)
            }          
          }
          this.jobSelData1 = Opendata          
        }
        else if(this.SelJob == "Pending"){
          var  PendingdataItem=[];
          var  Pendingdata= [];
          for (var i=0 ; i< this.jobData.length;i++){
            if(this.jobData[i]['Status'] == 'Pending'){
              PendingdataItem = this.jobData[i]
              Pendingdata.push(PendingdataItem)
            }
          }
          this.jobSelData1 = Pendingdata          
        }
        else if(this.SelJob == "In Progress"){
          var  progressdataItem=[];
          var  progressdata= [];
          for (var i=0 ; i< this.jobData.length;i++){
            if(this.jobData[i]['Status'] == 'In Progress'){
              progressdataItem = this.jobData[i]
              progressdata.push(progressdataItem)
            }          
          }
          this.jobSelData1 = progressdata               
        }
        else if(this.SelJob == "Completed"){
          var  CompleteddataItem=[];
          var  Completeddata= [];
          for (var i=0 ; i< this.jobData.length;i++){
            if(this.jobData[i]['Status'] == 'Completed'){
              CompleteddataItem = this.jobData[i]
              Completeddata.push(CompleteddataItem)
            }          
          }
          this.jobSelData1 = Completeddata          
        }
        else if(this.SelJob == "Cancelled"){
          var  CancelleddataItem=[];
          var  Cancelleddata= [];
          for (var i=0 ; i< this.jobData.length;i++){
            if(this.jobData[i]['Status'] == 'Cancelled'){
              CancelleddataItem = this.jobData[i]
              Cancelleddata.push(CancelleddataItem)
            }          
          }
          this.jobSelData1 = Cancelleddata          
        }
      }
      else{
        if(this.SelJob == "All"){
            this.jobSelData2 = this.jobData1         
        }
        else if(this.SelJob == "Open"){
          var  OpendataItem=[];
          var  Opendata= [];
          for (var i=0 ; i< this.jobData1.length;i++){
            if(this.jobData1[i]['Status'] == 'Open'){
              OpendataItem = this.jobData1[i]
              Opendata.push(OpendataItem)
            }          
          }
          this.jobSelData2 = Opendata
        }
        else if(this.SelJob == "Pending"){
          var  PendingdataItem=[];
          var  Pendingdata= [];
          for (var i=0 ; i< this.jobData1.length;i++){
            if(this.jobData1[i]['Status'] == 'Pending'){
              PendingdataItem = this.jobData1[i]
              Pendingdata.push(PendingdataItem)
            }
          }
          this.jobSelData2 = Pendingdata         
        }
        else if(this.SelJob == "In Progress"){
          var  progressdataItem=[];
          var  progressdata= [];
          for (var i=0 ; i< this.jobData1.length;i++){
            if(this.jobData1[i]['Status'] == 'In Progress'){
              progressdataItem = this.jobData1[i]
              progressdata.push(progressdataItem)
            }          
          }
          this.jobSelData2 = progressdata             
        }
        else if(this.SelJob == "Completed"){
          var  CompleteddataItem=[];
          var  Completeddata= [];
          for (var i=0 ; i< this.jobData1.length;i++){
            if(this.jobData1[i]['Status'] == 'Completed'){
              CompleteddataItem = this.jobData1[i]
              Completeddata.push(CompleteddataItem)
            }          
          }
          this.jobSelData2 = Completeddata          
        }
        else if(this.SelJob == "Cancelled"){
          var  CancelleddataItem=[];
          var  Cancelleddata= [];
          for (var i=0 ; i< this.jobData1.length;i++){
            if(this.jobData1[i]['Status'] == 'Cancelled'){
              CancelleddataItem = this.jobData1[i]
              Cancelleddata.push(CancelleddataItem)
            }          
          }
          this.jobSelData2 = Cancelleddata      
        }
      }
        
    },
    ManualCreateJob(){
      var today = new Date();
      var yyyy = today.getFullYear();
      var dddd = today.getDate();
      var mmmm = today.getMonth()+1;
      this.job.Date = yyyy+"-"+mmmm+"-"+dddd;
      this.job.No = "j"+yyyy+(Math.floor(100000 + Math.random() * 900000))
      this.$router.push("/jobcreate/"+this.job.No).catch(()=>{});
    },
    screenRedirect(){
      this.role_manual = localStorage.getItem('superrole')      
      if(screen.width <=500){
        this.$router.push("/mobilejob")
      }
    },
    shuffleArray (array) {
      return array
    },
    getShuffledJobData1 () {
       return this.shuffleArray(this.jobSelData1.slice(0))
    },
    getShuffledJobData2 () {       
       return this.shuffleArray(this.jobSelData2.slice(0))
    }
  }
}
</script>
