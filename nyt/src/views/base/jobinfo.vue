<template>
  <div>
    <h1>Carding Machine - Job Detail</h1>
      <CForm  @submit.prevent="submitForm">
        <CRow>
          <CCol lg="12">
            <CCard>
              <i class="cid-chevron-square-down"></i>
              <p @click="collapse = !collapse"  style="margin:2%">More Info</p>
              <CCardBody>
                <CRow>
                  <CCol sm="3">
                    <CInput
                    label="Job No."
                    type="text"
                    placeholder=""
                    v-model = job.No      
                    />                
                  </CCol>    
                  
                    <CCol sm="3">
                      <CCollapse :show="collapse">
                        <CInput
                        label="Job Date"
                        type="text"
                        placeholder=""
                        v-model = job.Date            
                        />
                      </CCollapse>
                    </CCol>
                    <CCol sm="3">
                      <CCollapse :show="collapse">                       
                          <CInput
                        label="Machine Type"
                        type="text"
                        placeholder=""
                        v-model = job.Machinetype            
                        />                       
                      </CCollapse>
                    </CCol>     
                    <CCol sm="3">
                      <CCollapse :show="collapse">
                        <CInput
                        label="Machine"
                        type="text"
                        placeholder=""
                        v-model = job.Machine                            
                        />
                      </CCollapse>
                    </CCol>                                
                </CRow>
                <CRow>              
                    <CCol sm="3">  
                      <CCollapse :show="collapse">
                        <CInput
                        label="Starting Date"
                        type="text"
                        placeholder=""
                        v-model = job.StartDate         
                        />
                      </CCollapse>
                    </CCol>
                    <CCol sm="3">
                      <CCollapse :show="collapse">
                        <CInput
                        label="Starting Time"
                        type="text"
                        placeholder=""
                        v-model = job.StartTime        
                        />
                      </CCollapse>
                    </CCol>
                    <CCol sm="3">
                      <CCollapse :show="collapse">
                        <CInput
                        label="Ending Date"
                        type="text"
                        placeholder=""
                        v-model = job.EndDate    
                        />
                      </CCollapse>
                    </CCol>
                    <CCol sm="3">
                      <CCollapse :show="collapse">
                        <CInput
                        label="Ending Time"
                        type="text"
                        placeholder=""
                        v-model = job.EndTime     
                        />
                      </CCollapse>
                    </CCol>              
                </CRow>      
                <CRow>
                  <CCol sm="3">
                    Problem
                    <input type="text"  v-model="problemStatus" class="customs_select" style="width:100%"/>
                  </CCol>
                  <CCol sm="3">
                  Reason
                    <input type="text"  v-if="isreason" v-model="reasonStatus" class="customs_select" style="width:100%"/>
                    <input type="text"  v-if="customReason" v-model="customReason" class="customs_select" style="width:100%"/>
                    <br>
                  </CCol>
                  <CCol sm="6">
                    Response by
                    <input type="text"  v-if="isresponse" v-model="response" class="customs_select" style="width:100%"/>
                    <input type="text"  v-if="customResponse" v-model="customResponse" class="customs_select" style="width:100%"/>
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
                  <CCol sm="3">
                    <CInput
                        label="Job Status"
                        type="text"
                        placeholder=""
                        v-model = job.Status     
                        />
                  </CCol>
                  <CCol sm="9">
                    <CInput
                    label="Remarks"
                    type="text"
                    placeholder="please input remarks"
                    value=""         
                    v-model="job.Remark"
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="3" >
                    <img :src="('../../../../upload/' + imgsrc)" style="width:100px;height:100px"/>                   
                  </CCol>
                  <CCol sm="3">                       
                  </CCol>
                  <CCol sm="6">
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CForm>
  </div>
</template>
<style scoped>
.save_button{
  border-radius:20px
}
.pending{
  background-color: #fca903;
  color:white
}
.progress{
  background-color: #3474eb;
  color:white
}
.complete{
  background-color: green;
  color:white
}
.cancel{
  background-color: red;
  color:white
}
.button-wrapper {
  position: relative;
  width: 100%;
  text-align: center;
  
}
.button-wrapper span.label {
  position: relative;
  z-index: 0;
  display: inline-block;
  width: 100%;
  background: #0e9424;
  cursor: pointer;
  color: #fff;
  padding: 10px 0;
  border-radius: 20px;
  font-size:12px;
}

#file {
    display: inline-block;
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 50px;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
    
}
.customs_select{
  border-radius: 30px;
  height: 70%;
  background-color: #cde4f5;
  border:1px solid white;
  margin-bottom:1%
}
.res_select{
  border-radius: 30px;
  height: 30%;
  background-color: #cde4f5;
  border:1px solid white;
  margin-bottom:5%
}
.customs_select:focus{
  outline: none;
}
.res_select:focus{
  outline: none;
}

</style>
<script>
import Vue from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
Vue.use(Toast);
import moment from 'moment'
import axios from "axios";
import vueDropdown from "../vue-dropdown/vue-dropdown";
export default {  
   components: {
    vueDropdown
  },
  data:function() {
    return {
      alldata:[],
      file:'',
      customReason:"",
      customResponse:"",
      problemStatus:"",
      reasonStatus:"",
      response:"",
      res_sel : false,
      custom_sel:false,
      collapse: false,
      innerCollapse: false,
      isPDSel:false,
      isQSel:false,
      isPMSel:false,
      isEESel:false,
      isMESel:false,
      isUTSel:false,
      isCCSel:false,      
      issuper:false,
      tech:localStorage.getItem('tech'),
      sel:'',
      imgsrc:"",
      isreason:"",
      isresponse:"",
      job:{
          No:"",
          Date:"",
          StartTime:"",
          StartDate:"",
          EndTime:"",
          EndDate:"",
          Machine:"",
          Status:"",
          Remark:"",
          Machinetype:""
      },
      selected: [] // Must be an array reference!      
    }
  }, 
  props: {
		url: {
			type: String,
			default: "http://:3000/"
		}
	},
  created() {
    this.geturl(),
    this.SelMoinfo()
   
  },
  methods: {
    geturl(){
       var jobInfo = this.$route.params.id      
       this.job.No = jobInfo.substring(0, 10)  
       this.job.Machine = jobInfo.substring(10,20)   
       this.fetchdata()       
    },
    fetchdata(){
      axios.get(`${this.url}jobinfo/info`)
			.then(res => {				
          this.alldata = res.data         
          for(var i=0; i < this.alldata.length;i++){
            if(this.job.No == this.alldata[i].jobNo){
              this.job.Date = this.alldata[i].jobDate;
              this.job.Machine = this.alldata[i].jobMachine;
              this.job.Machinetype = this.alldata[i].jobMachinetype;
              this.job.StartDate = this.alldata[i].jobStartDate;
              this.job.StartTime = this.alldata[i].jobStarttime;
              this.job.EndDate = this.alldata[i].jobEndDate;
              this.job.EndTime = this.alldata[i].jobEndTime;
              this.job.Status = this.alldata[i].jobStatus;
              this.problemStatus = this.alldata[i].jobProblem;
              this.reasonStatus = this.alldata[i].jobReason;
              this.response = this.alldata[i].jobResponse;
              this.customReason = this.alldata[i].custom_reason;
              this.customResponse = this.alldata[i].custom_response;
              this.job.Remark = this.alldata[i].jobRemark;
              this.imgsrc = this.alldata[i].attched
              if(this.reasonStatus == 'Customs'){
                this.isreason = false
              }else{
                this.isreason = true
              }
              if(this.response == "Customs"){
                this.isresponse = false
              }else{
                this.isresponse = true
              }
            }
          }
      }) 
    },
    SelMoinfo(){
      if(screen.width >500){
        this.collapse = true
      }
    },    
  }
}
</script>
