<template>
  <div>
    <h1>Carding Machine - Job Problem Detail</h1>
    <CRow>
      <CCol lg="12">
        <CCard>
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
                <CInput
                label="Job Date"
                type="date"
                placeholder=""
                v-model = job.Date            
                />
              </CCol>
              <CCol sm="6">
                <CInput
                label="Machine"
                type="text"
                placeholder=""
                v-model = job.Machine      
                />
              </CCol>      
            </CRow>
            <CRow>
              <CCol sm="3">
                
                <CInput
                label="Starting Date"
                type="date"
                placeholder=""
                v-model = job.StartDate         
                />
              </CCol>
              <CCol sm="3">
                <CInput
                label="Starting Time"
                type="time"
                placeholder=""
                v-model = job.StartTime        
                />
              </CCol>
              <CCol sm="3">
                <CInput
                label="Ending Date"
                type="date"
                placeholder=""
                v-model = job.EndDate    
                />
              </CCol>
              <CCol sm="3">
                <CInput
                label="Ending Time"
                type="time"
                placeholder=""
                v-model = job.EndTime     
                />
              </CCol>
            </CRow>      
            <CRow>
              <CCol sm="3">
                <CSelect
                  label="Problem"
                  placeholder="Choose.."
                  :options="problems"
                />
              </CCol>
              <CCol sm="6">
               <CSelect
                  label="Reason"
                  placeholder="Choose.."
                  :options="reason"
                />
              </CCol>
              <CCol sm="3">
                <CSelect
                  label="Response by"
                  placeholder="Choose.."
                  :options="response"
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
              <CCol sm="3">
                <label>Job Status</label>
                <select v-model="job.Status" class="form-control">
                  <option>Choose...</option>
                  <option value="Open" >Open</option>
                  <option style="background-color:#fca903;color:white" value="Pending">Pending</option>
                  <option style="background-color:#3474eb;color:white" value="In Progress">In Progress</option>
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
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="3" >
                <CRow>
                    <CCol>
                      <CButton class="save_button" block color="info">Save</CButton>
                    </CCol>
                    <CCol>
                      <div class="button-wrapper">
                        <span class="label">
                          Attach
                        </span>                
                        <input type="file" name="upload" id="upload" class="upload-box" placeholder="Upload File">                
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
  </div>
</template>
<style scoped>
.save_button{
  border-radius:20px
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

#upload {
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
</style>
<script>

import jobdata from '../data/JobData'
import moment from 'moment'

export default {  
  data:function() {
    return {
      job:{
          No:"",
          Date:"",
          StartTime:"",
          StartDate:"",
          EndTime:"",
          EndDate:"",
          Machine:"",
          Status:""
      },
      selected: [], // Must be an array reference!      
      problems: [
        'PD', 'Q', 'PM', 'ME', 'EE', 'UT', 'CC'
      ],
      reason: [
        'reason1', 'reason2', 'reason3', 'reason4', 'reason5'
      ],
      response: [
        'response1', 'response2', 'response3', 'response4', 'response5'
      ]
    }
  }, 
  created() {
    this.geturl()
    this.Genjob()
  },
  methods: {
    geturl(){
       var machiheId = this.$route.params.id
       this.job.Machine = machiheId      
    },
    Genjob(){
      var today = new Date();
      var yyyy = today.getFullYear();
      this.job.No = "j"+yyyy+(Math.floor(Math.random() * 10000) + 1)
    }
  }
}

</script>
