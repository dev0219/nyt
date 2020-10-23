<template>
  <div>
    <h1>Carding Machine - Job Problem Detail</h1>
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
                        type="date"
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
                        type="date"
                        placeholder=""
                        v-model = job.EndDate    
                        />
                      </CCollapse>
                    </CCol>
                    <CCol sm="3">
                      <CCollapse :show="collapse">
                        <CInput
                        label="Ending Time"
                        type="time"
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
                    <label>Job Status</label>
                    <select v-model="job.Status" class="form-control" :class="sel">
                      <option>Choose...</option>
                      <option v-if="issuper" value="Open" >Open</option>
                      <option v-if="issuper" style="background-color:#fca903;color:white" value="Pending">Pending</option>
                      <option v-if="issuper" style="background-color:#3474eb;color:white" value="In Progress">In Progress</option>
                      <option style="background-color:green;color:white" value="Completed">Completed</option>
                      <option style="background-color:red;color:white" value="Cancelled">Cancelled</option>
                    </select>
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
                    <CRow>
                        <CCol>
                          <CButton class="save_button" block color="info" type="submit">Save</CButton>
                        </CCol>
                        <CCol>
                          <img v-if="file" src="img/attached.png" style="width:30%;margin-left: 40%;"/> 
                        </CCol>
                        <CCol>
                          <div class="button-wrapper">                              
                            <span class="label">
                              Attach
                            </span>                                
                            <input type="file" name="upload"  id="fileupload" ref="file" class="upload-box" placeholder="Upload File" @change="upload(upload)">                                           
                          </div>                          
                        </CCol>                  
                    </CRow>
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

#fileupload {
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
      isreason:"",
      isresponse:"",
      id:"",
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
      problem: {
        options: [
          {
            value: "PD"
          },
          {
            value: "Q"
          },
          {
            value: "PM"
          },
          {
            value: "ME"
          },
          {
            value: "EE"
          },
          {
            value: "UT"
          },
          {
            value: "CC"
          }
        ],
        placeholder: "Choose..",
        backgroundColor: "#cde4f5",
        textColor: "black",
        borderRadius: "1.5em",
        border: "1px solid gray",
      },
      reasonpd: {
        options: [
          {value:"Reason PD1"},
          {value:"Reason PD2"},
          {value:"Customs"},
        ],
        placeholder: "Choose..",
        backgroundColor: "#cde4f5",
        textColor: "black",
        borderRadius: "1.5em",
        border: "1px solid gray",
      },
      reasonq: {
        options: [
          {value:"Reason Q1"},
          {value:"Reason Q2"},
          {value:"Customs"},
        ],
        placeholder: "Choose..",
        backgroundColor: "#cde4f5",
        textColor: "black",
        borderRadius: "1.5em",
        border: "1px solid gray",
      },
      reasonpm: {
        options: [
          {value:"Reason PM1"},
          {value:"Reason PM2"},
          {value:"Customs"},
        ],
        placeholder: "Choose..",
        backgroundColor: "#cde4f5",
        textColor: "black",
        borderRadius: "1.5em",
        border: "1px solid gray",
      },
      reasonme: {
        options: [
          {value:"Reason ME1"},
          {value:"Reason ME2"},
          {value:"Customs"},
        ],
        placeholder: "Choose..",
        backgroundColor: "#cde4f5",
        textColor: "black",
        borderRadius: "1.5em",
        border: "1px solid gray",
      },
      reasonee: {
        options: [
          {value:"Reason EE1"},
          {value:"Reason EE2"},
          {value:"Customs"},
        ],
        placeholder: "Choose..",
        backgroundColor: "#cde4f5",
        textColor: "black",
        borderRadius: "1.5em",
        border: "1px solid gray",
      },
      reasonut: {
        options: [
          {value:"Reason UT1"},
          {value:"Reason UT2"},
          {value:"Customs"},
        ],
        placeholder: "Choose..",
        backgroundColor: "#cde4f5",
        textColor: "black",
        borderRadius: "1.5em",
        border: "1px solid gray",
      },
      reasoncc: {
        options: [
          {value:"Reason CC1"},
          {value:"Reason CC2"},
          {value:"Customs"},
        ],
        placeholder: "Choose..",
        backgroundColor: "#cde4f5",
        textColor: "black",
        borderRadius: "1.5em",
        border: "1px solid gray",
      },
      response: {
        options: [
          {
            value: "Technician 1"
          },
          {
            value: "Technician 2"
          },
          {
            value: "Customs"
          }
        ],
        placeholder: "Choose..",
        backgroundColor: "#cde4f5",
        textColor: "black",
        borderRadius: "1.5em",
        border: "1px solid gray",
      },
      
      issuper:false,
      tech:localStorage.getItem('tech'),
      sel:'',
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
      PdRemove:document.getElementById("reasonpd"),
      QRemove:document.getElementById("reasonq"),
      PMRemove:document.getElementById("reasonpm"),
      MERemove:document.getElementById("reasonme"),
      EERemove:document.getElementById("reasonee"),
      UTRemove:document.getElementById("reasonut"),
      CCRemove:document.getElementById("reasoncc"),
       select:true,
      selected: [] // Must be an array reference!      
    }
  }, 
  props: {
		url: {
			type: String,
			default: "http://localhost:3000/"
		}
	},
  created() {
    this.geturl(),
    this.SelMoinfo()
  },
  mounted(){
    if (localStorage.getItem('superrole')) {
      if(localStorage.getItem('superrole') == "Supervisor" || localStorage.getItem('superrole') == ""){
        this.issuper = true
      }else{
        this.issuper = false
      }
    }    
  },
  methods: {
    SelMoinfo(){
      if(screen.width >500){
        this.collapse = true
      }
    },
    async upload(){
      this.file = this.$refs.file.files[0];
      console.log(this.file)
      const formData = new FormData();
      formData.append('file', this.file);
      try{
        await axios.post(`${this.url}fileupload`, formData);
      }
      catch(err){
        console.log(err);
      }
      
    },
    submitForm(){
      if(this.job.Status == 'Cancelled' || this.job.Status == 'Completed'){
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes();
        this.job.EndDate = date
        this.job.EndTime = time
      }
      const job = {
          _id: this.id,
          jobNo: this.job.No,
          jobDate: this.job.Date,
          jobStarttime: this.job.StartTime,  
          jobStartDate: this.job.StartDate,
          jobEndDate: this.job.EndDate,
          jobEndTime: this.job.EndTime,    
          jobMachine: this.job.Machine,
          jobStatus: this.job.Status,
          jobRemark: this.job.Remark,
          jobProblem: this.problemStatus,
          jobReason: this.reasonStatus,
          jobResponse: this.responseStatus,
          custom_reason: this.customReason,
          custom_response: this.customResponse,
          attched:this.file.name,
      
          machinetype:this.job.Machinetype
      }
      axios.post(`${this.url}jobupdate/update`,{
          job : job
      })
      .then(res => {
        console.log(res.data.message)
        if(res.data.message === "OK"){
          this.$toast("Successfully created Job!", {
              timeout: 2000
          });
          this.$router.push('/job')
        }else{
          this.$toast("Failed Job!", {
              timeout: 2000
          });
          this.$router.push('/job')
        }               
      })
    },
    setNewSelectedOptionproblem(selectedOption) {
      this.problemStatus = selectedOption.value;
      this.problem.placeholder = selectedOption.value;     

      if (selectedOption.value == "PD"){
        
        if(this.isQSel == true){
          this.QRemove = document.getElementById("reasonq");
          this.QRemove.remove();     
        }
        if(this.isPMSel == true){
          this.PMRemove = document.getElementById("reasonpm");
          this.PMRemove.remove();          
        }
        if(this.isMESel == true){
          this.MERemove = document.getElementById("reasonme");
          this.MERemove.remove();          
        }
        if(this.isEESel == true){
          this.EERemove = document.getElementById("reasonee");
          this.EERemove.remove();          
        }
        if(this.isUTSel == true){
          this.UTRemove = document.getElementById("reasonut");
          this.UTRemove.remove();          
        }
        if(this.isCCSel == true){
          this.CCRemove = document.getElementById("reasoncc");
          this.CCRemove.remove();          
        }
        this.isPDSel = true
      }else if(selectedOption.value == "Q"){  
              
        if(this.isPDSel == true){
          this.PdRemove = document.getElementById("reasonpd");
          this.PdRemove.remove(); 
          // this.isPDSel = false     
        }
        if(this.isPMSel == true){
          this.PMRemove = document.getElementById("reasonpm");
          this.PMRemove.remove();          
        }
        if(this.isMESel == true){
          this.MERemove = document.getElementById("reasonme");
          this.MERemove.remove();          
        }
        if(this.isEESel == true){
          this.EERemove = document.getElementById("reasonee");
          this.EERemove.remove();          
        }
        if(this.isUTSel == true){
          this.UTRemove = document.getElementById("reasonut");
          this.UTRemove.remove();          
        }
        if(this.isCCSel == true){
          this.CCRemove = document.getElementById("reasoncc");
          this.CCRemove.remove();          
        }
        this.isQSel = true
      }else if(selectedOption.value == "PM"){     
        if(this.isQSel == true){
          this.PdRemove = document.getElementById("reasonq");
          this.PdRemove.remove();          
        }
        if(this.isPDSel == true){
          this.PdRemove = document.getElementById("reasonpd");
          this.PdRemove.remove();          
        }
        if(this.isMESel == true){
          this.MERemove = document.getElementById("reasonme");
          this.MERemove.remove();          
        }
        if(this.isEESel == true){
          this.EERemove = document.getElementById("reasonee");
          this.EERemove.remove();          
        }
        if(this.isUTSel == true){
          this.UTRemove = document.getElementById("reasonut");
          this.UTRemove.remove();          
        }
        if(this.isCCSel == true){
          this.CCRemove = document.getElementById("reasoncc");
          this.CCRemove.remove();          
        }
         this.isPMSel = true
      }else if(selectedOption.value == "ME"){ 
        if(this.isPDSel == true){
          this.PdRemove = document.getElementById("reasonpd");
          this.PdRemove.remove();          
        }
        if(this.isPMSel == true){
          this.PRemove = document.getElementById("reasonpm");
          this.PdRemove.remove();          
        }
        if(this.isQSel == true){
          this.QRemove = document.getElementById("reasonq");
          this.QdRemove.remove();          
        }
        if(this.isEESel == true){
          this.EERemove = document.getElementById("reasonee");
          this.EERemove.remove();          
        }
        if(this.isUTSel == true){
          this.UTRemove = document.getElementById("reasonut");
          this.UTRemove.remove();          
        }
        if(this.isCCSel == true){
          this.CCRemove = document.getElementById("reasoncc");
          this.CCRemove.remove();          
        }
        this.isMESel = true 
      }else if(selectedOption.value == "EE"){
        if(this.isPDSel == true){
          this.PdRemove = document.getElementById("reasonpd");
          this.PdRemove.remove();          
        }
        if(this.isPMSel == true){
          this.PRemove = document.getElementById("reasonpm");
          this.PdRemove.remove();          
        }
        if(this.isQSel == true){
          this.QRemove = document.getElementById("reasonq");
          this.QdRemove.remove();          
        }
        if(this.isMESel == true){
          this.MERemove = document.getElementById("reasonme");
          this.MERemove.remove();          
        }
        if(this.isUTSel == true){
          this.UTRemove = document.getElementById("reasonut");
          this.UTRemove.remove();          
        }
        if(this.isCCSel == true){
          this.CCRemove = document.getElementById("reasoncc");
          this.CCRemove.remove();          
        }
        
         this.isEESel = true
    
      }else if(selectedOption.value == "UT"){
        if(this.isPDSel == true){
          this.PdRemove = document.getElementById("reasonpd");
          this.PdRemove.remove();          
        }else if(this.isPMSel == true){
          this.PRemove = document.getElementById("reasonpm");
          this.PdRemove.remove();          
        }else if(this.isQSel == true){
          this.QRemove = document.getElementById("reasonq");
          this.QdRemove.remove();          
        }else if(this.isMESel == true){
          this.MERemove = document.getElementById("reasonme");
          this.MERemove.remove();          
        }else if(this.isEESel == true){
          this.EERemove = document.getElementById("reasonee");
          this.EERemove.remove();          
        }else if(this.isCCSel == true){
          this.CCRemove = document.getElementById("reasoncc");
          this.CCRemove.remove();          
        }  
         this.isUTSel = true       
      }else if(selectedOption.value == "CC"){ 
        if(this.isPDSel == true){
          this.PdRemove = document.getElementById("reasonpd");
          this.PdRemove.remove();          
        }else if(this.isPMSel == true){
          this.PRemove = document.getElementById("reasonpm");
          this.PdRemove.remove();          
        }else if(this.isQSel == true){
          this.QRemove = document.getElementById("reasonq");
          this.QdRemove.remove();          
        }else if(this.isMESel == true){
          this.MERemove = document.getElementById("reasonme");
          this.MERemove.remove();          
        }else if(this.isEESel == true){
          this.EERemove = document.getElementById("reasonee");
          this.EERemove.remove();          
        }else if(this.isUTSel == true){
          this.UTRemove = document.getElementById("reasonut");
          this.UTRemove.remove();          
        } 
         this.isCCSel = true
      }
    },
    setNewSelectedOptionreason(selectedOption) {
      this.reasonStatus = selectedOption.value;
      if (selectedOption.value == "Customs"){
        this.reasonpd.placeholder = selectedOption.value;
        this.reasonq.placeholder = selectedOption.value;
        this.reasonpm.placeholder = selectedOption.value;
        this.reasonme.placeholder = selectedOption.value;
        this.reasonee.placeholder = selectedOption.value;
        this.reasoncc.placeholder = selectedOption.value;
        this.reasonut.placeholder = selectedOption.value;
        this.custom_sel = true
      }else if(selectedOption.value == "Reason PD1"){
        this.reasonpd.placeholder = selectedOption.value;
        this.custom_sel = false
      }else if(selectedOption.value == "Reason PD2"){
        this.reasonpd.placeholder = selectedOption.value;
        this.custom_sel = false
      }else if(selectedOption.value == "Reason PM1"){
        this.reasonpm.placeholder = selectedOption.value;
        this.custom_sel = false
      }else if(selectedOption.value == "Reason PM2"){
        this.reasonpm.placeholder = selectedOption.value;
        this.custom_sel = false
      }else if(selectedOption.value == "Reason Q1"){
        this.reasonq.placeholder = selectedOption.value;
        this.custom_sel = false
      }else if(selectedOption.value == "Reason Q2"){
        this.reasonq.placeholder = selectedOption.value;
        this.custom_sel = false
      }else if(selectedOption.value == "Reason ME1"){
        this.reasonme.placeholder = selectedOption.value;
        this.custom_sel = false
      }else if(selectedOption.value == "Reason ME2"){
        this.reasonme.placeholder = selectedOption.value;
        this.custom_sel = false
      }else if(selectedOption.value == "Reason CC1"){
        this.reasoncc.placeholder = selectedOption.value;
        this.custom_sel = false
      }else if(selectedOption.value == "Reason CC2"){
        this.reasoncc.placeholder = selectedOption.value;
        this.custom_sel = false
      }else if(selectedOption.value == "Reason EE1"){
        this.reasonee.placeholder = selectedOption.value;
        this.custom_sel = false
      }else if(selectedOption.value == "Reason EE2"){
        this.reasonee.placeholder = selectedOption.value;
        this.custom_sel = false
      }else if(selectedOption.value == "Reason UT1"){
        this.reasonut.placeholder = selectedOption.value;
        this.custom_sel = false
      }else if(selectedOption.value == "Reason UT2"){
        this.reasonut.placeholder = selectedOption.value;
        this.custom_sel = false
      }
    },
    setNewSelectedOptionresponse(selectedOption) {
      this.responseStatus = selectedOption.value;
      this.response.placeholder = selectedOption.value;
      if(selectedOption.value == "Customs"){
        this.res_sel = true
      }else{
        this.res_sel = false
      }
    },
    geturl(){
       this.id = this.$route.params.id  
       this.fetchdata()
    },
    fetchdata(){
      axios.get(`${this.url}jobinfo/info`)
			.then(res => {				
          this.alldata = res.data         
          for(var i=0; i < this.alldata.length;i++){
            if(this.id == this.alldata[i]._id){
              this.job.No = this.alldata[i].jobNo;
              this.job.Date = this.alldata[i].Date;
              this.job.Machine = this.alldata[i].Machine;
              this.job.Machinetype = this.alldata[i].Machinetype;
              this.job.StartDate = this.alldata[i].StartDate;
              this.job.StartTime = this.alldata[i].StartTime;
              this.job.EndDate = this.alldata[i].EndDate;
              this.job.EndTime = this.alldata[i].EndTime;
              this.job.Status = this.alldata[i].Status;
              this.problemStatus = this.alldata[i].Problem;
              this.reasonStatus = this.alldata[i].Reason;
              this.response = this.alldata[i].Response;
              this.customReason = this.alldata[i].custom_reason;
              this.customResponse = this.alldata[i].custom_response;
              this.job.Remark = this.alldata[i].Remark;
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
  }
}
</script>
