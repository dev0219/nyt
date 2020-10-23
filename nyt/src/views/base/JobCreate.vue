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
                          <label>Machine Type</label>
                          <select v-model="job.Machinetype" class="form-control" @change="machinetype()">
                          <option>Choose...</option>
                          <option  value="carding" >CARDING</option>
                          <option  value="browroom">BROW ROOM</option>
                          </select>                       
                      </CCollapse>
                    </CCol>     
                    <CCol sm="3">
                      <CCollapse :show="collapse">
                        <div v-if="job.Machinetype == '' || job.Machinetype == 'carding'">
                          <label>Machine</label>
                          <select v-model="job.Machine" class="form-control">
                            <option v-if="isCheckSai5Api" v-for="(item, key) in sai5Items" :value="key">
                              {{item}}
                            </option>
                            <option v-if="isCheckPetchApi" v-for="(item, key) in petchItems" :value="key">
                              {{item}}
                            </option>
                          </select>   
                        </div>
                        <div v-if="job.Machinetype == 'browroom'">
                          <label>Machine</label>
                          <select v-model="job.Machine" class="form-control">
                            <option v-for="(item, key) in browItems" :value="key">
                              {{item}}
                            </option>                         
                          </select>   
                        </div>
                      </CCollapse>
                    </CCol>                                
                </CRow>
                <CRow>              
                    <CCol sm="3">  
                      <CCollapse :show="collapse">
                        <CInput
                        label="Starting Date"
                        type="date"
                        placeholder=""
                        v-model = job.StartDate         
                        />
                      </CCollapse>
                    </CCol>
                    <CCol sm="3">
                      <CCollapse :show="collapse">
                        <CInput
                        label="Starting Time"
                        type="time"
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
                    <vue-dropdown                  
                      :config="problem"
                      @setSelectedOption="setNewSelectedOptionproblem($event);"
                      style="margin-top:2%"
                    ></vue-dropdown>
                  </CCol>
                  <CCol sm="3">
                  Reason
                    <vue-dropdown    
                    id="reasonpd"              
                      :config="reasonpd"
                      @setSelectedOption="setNewSelectedOptionreason($event);"
                      style="margin-top:2%"
                      v-if="isPDSel"
                    ></vue-dropdown>
                    
                    <vue-dropdown
                      id="reasonq"                  
                      :config="reasonq"
                      @setSelectedOption="setNewSelectedOptionreason($event);"
                      style="margin-top:2%"
                      v-if="isQSel"
                    ></vue-dropdown>
                    <vue-dropdown   
                    id="reasonpm"               
                      :config="reasonpm"
                      @setSelectedOption="setNewSelectedOptionreason($event);"
                      style="margin-top:2%"
                      v-if="isPMSel"
                    ></vue-dropdown>
                    <vue-dropdown     
                    id="reasonme"             
                      :config="reasonme"
                      @setSelectedOption="setNewSelectedOptionreason($event);"
                      style="margin-top:2%"
                      v-if="isMESel"
                    ></vue-dropdown>
                    <vue-dropdown      
                    id="reasonee"            
                      :config="reasonee"
                      @setSelectedOption="setNewSelectedOptionreason($event);"
                      style="margin-top:2%"
                      v-if="isEESel"
                    ></vue-dropdown>
                    <vue-dropdown 
                    id="reasonut"                 
                      :config="reasonut"
                      @setSelectedOption="setNewSelectedOptionreason($event);"
                      style="margin-top:2%"
                      v-if="isUTSel"
                    ></vue-dropdown>
                    <vue-dropdown 
                    id="reasoncc"                 
                      :config="reasoncc"
                      @setSelectedOption="setNewSelectedOptionreason($event);"
                      style="margin-top:2%"
                      v-if="isCCSel"
                    ></vue-dropdown><br>
                    <input type="text"  v-if="custom_sel" v-model="customReason" id="customs_select" style="width:100%"/>
                    <br>
                  </CCol>
                  <CCol sm="6">
                    Response by
                    <vue-dropdown                  
                      :config="response"
                      @setSelectedOption="setNewSelectedOptionresponse($event);"
                      style="margin-top:1%"
                    ></vue-dropdown><br>
                    <input type="text"  v-if="res_sel" v-model="customResponse" id="res_select" style="width:100%"/>
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
                            <input type="file" name="upload"  id="file" ref="file" class="upload-box" placeholder="Upload File" @change="upload(upload)">                                           
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
#customs_select{
  border-radius: 30px;
  height: 30%;
  background-color: #cde4f5;
  border:1px solid white;
  margin-bottom:5%
}
#res_select{
  border-radius: 30px;
  height: 30%;
  background-color: #cde4f5;
  border:1px solid white;
  margin-bottom:5%
}
#customs_select:focus{
  outline: none;
}
#res_select:focus{
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
      browItems:{
        "BR-S-01":"BR-S-01",
        "BR-S-02":"BR-S-02",
        "BR-S-03":"BR-S-03",
        "BR-S-04":"BR-S-04",
        "BR-S-05":"BR-S-05",
        "BR-S-06":"BR-S-06",
        "BR-S-07":"BR-S-07",
        "BR-S-08":"BR-S-08",
        "BR-P-01":"BR-P-01",
        "BR-P-02":"BR-P-02",
        "BR-P-03":"BR-P-03",
        "BR-P-04":"BR-P-04",
        "BR-P-05":"BR-P-05",
        "BR-P-06":"BR-P-06",
        "BR-P-07":"BR-P-07",
        "BR-P-08":"BR-P-08"
      },
      sai5Items:{
        "Card-S1-01": "Card-S1-01",
        "Card-S1-02": "Card-S1-02",
        "Card-S1-03": "Card-S1-03",
        "Card-S1-04": "Card-S1-04",
        "Card-S1-05": "Card-S1-05",
        "Card-S1-06": "Card-S1-06",
        "Card-S1-07": "Card-S1-07",
        "Card-S1-08": "Card-S1-08",
        "Card-S1-09": "Card-S1-09",
        "Card-S1-10": "Card-S1-10",
        "Card-S1-11": "Card-S1-11",
        "Card-S1-12": "Card-S1-12",
        "Card-S1-13": "Card-S1-13",
        "Card-S1-14": "Card-S1-14",
        "Card-S1-15": "Card-S1-15",
        "Card-S1-16": "Card-S1-16",
        "Card-S1-17": "Card-S1-17",
        "Card-S1-18": "Card-S1-18",
        "Card-S1-19": "Card-S1-19",
        "Card-S1-20": "Card-S1-20",
        "Card-S1-21": "Card-S1-21",
        "Card-S1-22": "Card-S1-22",
        "Card-S1-23": "Card-S1-23",
        "Card-S1-24": "Card-S1-24",
        "Card-S1-25": "Card-S1-25",
        "Card-S1-26": "Card-S1-26",
        "Card-S1-27": "Card-S1-27",
        "Card-S1-28": "Card-S1-28",
        "Card-S1-29": "Card-S1-29",
        "Card-S1-30": "Card-S1-30",
        "Card-S1-31": "Card-S1-31",
        "Card-S1-32": "Card-S1-32",
        "Card-S1-33": "Card-S1-33",
        "Card-S1-34": "Card-S1-34",
        "Card-S1-35": "Card-S1-35",
        "Card-S1-36": "Card-S1-36",
        "Card-S1-37": "Card-S1-37",
        "Card-S1-38": "Card-S1-38",
        "Card-S1-39": "Card-S1-39"
      },
      petchItems:{
        "Card-P1-01":"Card-P1-01",
        "Card-P1-02":"Card-P1-02",
        "Card-P1-03":"Card-P1-03",
        "Card-P1-04":"Card-P1-04",
        "Card-P1-05":"Card-P1-05",
        "Card-P1-06":"Card-P1-06",
        "Card-P1-07":"Card-P1-07",
        "Card-P1-08":"Card-P1-08",
        "Card-P1-09":"Card-P1-09",
        "Card-P1-10":"Card-P1-10",
        "Card-P1-11":"Card-P1-11",
        "Card-P1-12":"Card-P1-12",
        "Card-P1-13":"Card-P1-13",
        "Card-P1-14":"Card-P1-14",
        "Card-P1-15":"Card-P1-15",
        "Card-P1-16":"Card-P1-16",
        "Card-P1-17":"Card-P1-17",
        "Card-P1-18":"Card-P1-18",
        "Card-P1-19":"Card-P1-19",
        "Card-P1-20":"Card-P1-20",
        "Card-P1-21":"Card-P1-21",
        "Card-P1-22":"Card-P1-22",
        "Card-P1-23":"Card-P1-23",
        "Card-P1-24":"Card-P1-24",
        "Card-P1-25":"Card-P1-25",
        "Card-P1-26":"Card-P1-26",
        "Card-P1-27":"Card-P1-27",
        "Card-P1-28":"Card-P1-28",
        "Card-P1-29":"Card-P1-29",
        "Card-P1-30":"Card-P1-30",
        "Card-P1-31":"Card-P1-31",
        "Card-P1-32":"Card-P1-32",
        "Card-P1-33":"Card-P1-33",
        "Card-P1-34":"Card-P1-34"
      },
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
      isCheckSai5Api:'',
      isCheckPetchApi:'',
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
          Status:"Open",
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
    console.log("oiosoejieoioioioioo", localStorage.getItem('branch'))
  },
  mounted(){
    if (localStorage.getItem('superrole')) {
      if(localStorage.getItem('superrole') == "Supervisor" || localStorage.getItem('superrole') == ""){
        this.issuper = true
      }else{
        this.issuper = false
      }
    }
    if (localStorage.getItem('branch')) {
      if(localStorage.getItem('branch') == "Sai5" || localStorage.getItem('branch') == null){
        this.isCheckSai5Api = true
        this.isCheckPetchApi = false
      }else{
        this.isCheckPetchApi = true
        this.isCheckSai5Api = false
      }
    }

  },
  methods: {
    machinetype(){
    
    },
    SelMoinfo(){
      if(screen.width >500){
        this.collapse = true
      }
    },
    async upload(){
      this.file = this.$refs.file.files[0];
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
      if(localStorage.getItem('branch') == null || localStorage.getItem('branch') == "Sai5" ){
        var branch;
        branch = "Sai5"
      }else if((localStorage.getItem('branch') == "Petch")){
        branch = "Petch"
      }
      if(this.job.Machine == "BR-S-01"){
        localStorage.setItem('BR_D_Line1', 'BR_Sai5_01')
      }else if(this.job.Machine == "BR-S-02"){
        localStorage.setItem('BR_D_Line2', 'BR_Sai5_02')
      }else if(this.job.Machine == "BR-S-03"){
        localStorage.setItem('BR_D_Line3', 'BR_Sai5_03')
      }else if(this.job.Machine == "BR-S-04"){
        localStorage.setItem('BR_D_Line4', 'BR_Sai5_04')
      }else if(this.job.Machine == "BR-S-05"){
        localStorage.setItem('BR_D_Line5', 'BR_Sai5_05')
      }else if(this.job.Machine == "BR-S-06"){
        localStorage.setItem('BR_D_Line6', 'BR_Sai5_06')
      }else if(this.job.Machine == "BR-S-07"){
        localStorage.setItem('BR_D_Line7', 'BR_Sai5_07')
      }else if(this.job.Machine == "BR-S-08"){
        localStorage.setItem('BR_D_Line8', 'BR_Sai5_08')
      }else if(this.job.Machine == "BR-P-01"){
        localStorage.setItem('BR_PD_Line1', 'BR_Petch_01')
      }else if(this.job.Machine == "BR-P-02"){
        localStorage.setItem('BR_PD_Line2', 'BR_Petch_02')
      }else if(this.job.Machine == "BR-P-03"){
        localStorage.setItem('BR_PD_Line3', 'BR_Petch_03')
      }else if(this.job.Machine == "BR-P-04"){
        localStorage.setItem('BR_PD_Line4', 'BR_Petch_04')
      }
      if(this.job.Status == "Open" || this.job.Status == 'Pending' || this.job.Status == 'In Progress'){
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes();
        this.job.StartDate = date
        this.job.StartTime = time
      }
      if(this.job.Status == '' || this.job.Status == null){
         this.$toast("No allow to save!", {
              timeout: 2000
          });
          return;
      }
      const job = {
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
          branch: branch,
          machinetype:this.job.Machinetype
      }
      axios.post(`${this.url}job/store`,{
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
      var jobInfo = this.$route.params.id
      this.job.No = jobInfo.substring(0, 11)
      this.job.Machine = jobInfo.substring(11,21)
      this.job.Machinetype = jobInfo.substring(21,28)
      var auto_creted_date = new Date();
      var auto_date = auto_creted_date.getFullYear()+'-'+(auto_creted_date.getMonth()+1)+'-'+auto_creted_date.getDate();        
      this.job.Date = auto_date        
    }
  }
}
</script>
