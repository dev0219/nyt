<template>
  <div id="table">
    <h1>Carding Machine</h1>
    <CRow>
      <CCol lg="12">
        <CCard>
          <CCardBody>           
            <CRow>
              <CCol sm="6">
                <label>Branch Office</label>
                <select class="form-control" id ="selected" name="selected" v-model="selvalue" @change="branchapi()">
                  <option>Choose...</option>
                  <option  value="Sai5">สาย 5</option>
                  <option  value="Petch">เพชรบุรี</option>
                </select>
              </CCol>
              <CCol sm="3">
                <label>Machine Status</label>
                <select class="form-control" id ="selected" v-model="isSel" name="selected" @change="selected()">
                  <option>Choose...</option>
                  <option  value="All">All</option>
                  <option  value="Focused">Focused</option>
                </select>
              </CCol>
              <CCol sm="3">
                <CInput
                  label="Date"
                  type="text"
                  :value =currentTime            
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
              <CCol lg="3">
                <CTableWrapper1
                  :items="getline1Data()"
                  striped
                  
                />
              </CCol>
              <CCol lg="3">
                <CTableWrapper2
                  :items="getline2Data()"
                  striped
                />
              </CCol>
              <CCol lg="3">
                <CTableWrapper3
                  :items="getline3Data()"
                  striped
                />
              </CCol>
              <CCol lg="3">
                <CTableWrapper4
                  :items="getline4Data()"
                  striped
                />
              </CCol>
            </CRow>
            <CRow>            
              <CCol lg="3">
                <CTableWrapper5
                  :items="getline5Data()"
                  striped
                />
              </CCol>
              <CCol lg="3">
                <CTableWrapper6
                  :items="getline6Data()"
                  striped
                />
              </CCol>
              <CCol lg="3">
                <CTableWrapper7
                  :items="getline7Data()"
                  striped
                />
              </CCol>
              <CCol lg="3">
                <CTableWrapper8
                  :items="getline8Data()"
                  striped
                />
              </CCol>
              <CCol lg="4">
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<style scoped>
#table{
  font-size: 14px!important;
}
</style>
<script>
import CTableWrapper1 from './table/Line1.vue'
import CTableWrapper2 from './table/Line2.vue'
import CTableWrapper3 from './table/Line3.vue'
import CTableWrapper4 from './table/Line4.vue'
import CTableWrapper5 from './table/Line5.vue'
import CTableWrapper6 from './table/Line6.vue'
import CTableWrapper7 from './table/Line7.vue'
import CTableWrapper8 from './table/Line8.vue'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
"use strict";

Vue.use(VueAxios, axios)

export default {
  name: 'Tables',
  components: { CTableWrapper1, CTableWrapper2, CTableWrapper3, CTableWrapper4, CTableWrapper5, CTableWrapper6, CTableWrapper7, CTableWrapper8 },
  data:function () {
    return {
      selvalue:"",
      SelBranch:['เพชรบุรี', 'สาย 5'],
      isSel:"",
      currentTime:"",
      DataList1:[],
      DataList2:[],
      DataList3:[],
      DataList4:[],
      DataList5:[],
      DataList6:[],
      DataList7:[],
      DataList8:[]
    }
  },
  async created(){
    var time = new Date().toDateString();
    this.currentTime = time
    this.appData()
    this.settimeout()    
  },
  methods: {
    settimeout(){
      setInterval(() => {
        this.appData()
      }, 300000)
    },
    async appData(){
    var response = await Vue.axios.get('http://nyiot.nanyangtextile.com/nyiot/carding_feed/get_card_nyt_sai5.php');
    var DataList = response.data;
    this.DataList1 = [];
    this.DataList2 = [];
    this.DataList3 = [];
    this.DataList4 = [];
    this.DataList5 = [];
    this.DataList6 = [];
    this.DataList7 = [];
    this.DataList8 = [];
    var TotalNum = 0
    for (var i=0;i<DataList.length;i++) {
          DataList[i]['_classes']="";
          DataList[i]['EFF']="";
          DataList[i]['Actual']="";
          DataList[i]['hour']="";
          DataList[i]['min']="";
          DataList[i]['second']="";
          DataList[i]['totalSec']="";
          DataList[i]['realtime_target']="";
          DataList[i]['NP']="Y";
      if(DataList[i].PD_Line == "1"){   
        if(this.DataList1.length < 6){
          if(DataList[i].log_time.substring(11, 13) >= 0 && DataList[i].log_time.substring(11, 13) < 8){
            DataList[i].hour = (Number(DataList[i].log_time.substring(11, 13))+Number(16))*3600;
          }else{
            DataList[i].hour = (DataList[i].log_time.substring(11, 13)-8)*3600;
          }
          DataList[i].min = DataList[i].log_time.substring(14, 16)*60;
          DataList[i].second = DataList[i].log_time.substring(17, 19)*1;
          DataList[i].totalSec = DataList[i].hour+DataList[i].min+DataList[i].second;
          DataList[i].realtime_target = new Intl.NumberFormat().format(((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000)).toFixed(0));          
          DataList[i].Actual =((DataList[i].weight_gram/1000).toFixed(2)).toString();
          DataList[i].EFF = ((DataList[i].weight_gram/10)/((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000))).toFixed(0)  
          if(DataList[i].EFF < 70){
            DataList[i].NP = "N"
             DataList[i]._classes = "bg-danger"
          }else if(DataList[i].EFF >= 70 && DataList[i].EFF < 90){
            DataList[i].NP = "N"
              DataList[i]._classes = "bg-warning"
          }
          if(DataList[i].EFF >= 90){
          }else if(DataList[i].EFF < 90){
            this.DataList1.push(DataList[i])
            this.DataList1.sort(function(a,b){
              return a.EFF - b.EFF;
            });
          }       
        }       
      }else if(DataList[i].PD_Line == "2"){        
        if(this.DataList2.length < 6){
          if(DataList[i].log_time.substring(11, 13) >= 0 && DataList[i].log_time.substring(11, 13) < 8){
            DataList[i].hour = (Number(DataList[i].log_time.substring(11, 13))+Number(16))*3600;
          }else{
            DataList[i].hour = (DataList[i].log_time.substring(11, 13)-8)*3600;
          }        
          DataList[i].min = DataList[i].log_time.substring(14, 16)*60;
          DataList[i].second = DataList[i].log_time.substring(17, 19)*1;
          DataList[i].totalSec = DataList[i].hour+DataList[i].min+DataList[i].second;
          DataList[i].realtime_target = new Intl.NumberFormat().format(((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000)).toFixed(0));          
         DataList[i].Actual =((DataList[i].weight_gram/1000).toFixed(2)).toString();
          DataList[i].EFF = ((DataList[i].weight_gram/10)/((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000))).toFixed(0)  
          if(DataList[i].EFF >= 70 && DataList[i].EFF < 90){
             DataList[i]._classes = "bg-warning"
             DataList[i].NP = "N"
          }else if(DataList[i].EFF < 70){
              DataList[i]._classes = "bg-danger"
              DataList[i].NP = "N"
          }
          if(DataList[i].EFF >= 90){
          }else{
            this.DataList2.push(DataList[i])
            this.DataList2.sort(function(a,b){
              return a.EFF - b.EFF;
            });
          }        
        }               
      }else if(DataList[i].PD_Line == "3"){
         if(this.DataList3.length < 6){
          if(DataList[i].log_time.substring(11, 13) >= 0 && DataList[i].log_time.substring(11, 13) < 8){
            DataList[i].hour = (Number(DataList[i].log_time.substring(11, 13))+Number(16))*3600;
          }else{
            DataList[i].hour = (DataList[i].log_time.substring(11, 13)-8)*3600;
          }
          DataList[i].min = DataList[i].log_time.substring(14, 16)*60;
          DataList[i].second = DataList[i].log_time.substring(17, 19)*1;
          DataList[i].totalSec = DataList[i].hour+DataList[i].min+DataList[i].second;
          DataList[i].realtime_target = new Intl.NumberFormat().format(((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000)).toFixed(0));          
          DataList[i].Actual =((DataList[i].weight_gram/1000).toFixed(2)).toString();
          DataList[i].EFF = ((DataList[i].weight_gram/10)/((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000))).toFixed(0)  
          if(DataList[i].EFF >= 70 && DataList[i].EFF < 90){
             DataList[i]._classes = "bg-warning"
             DataList[i].NP = "N"
          }else if(DataList[i].EFF < 70){
              DataList[i]._classes = "bg-danger"
              DataList[i].NP = "N"
          }
          if(DataList[i].EFF >= 90){
          }else{
            this.DataList3.push(DataList[i])
            this.DataList3.sort(function(a,b){
              return a.EFF - b.EFF;
            });
          }                      
        }  
      }else if(DataList[i].PD_Line == "4"){
         if(this.DataList4.length < 6){          
          if(DataList[i].log_time.substring(11, 13) >= 0 && DataList[i].log_time.substring(11, 13) < 8){
            DataList[i].hour = (Number(DataList[i].log_time.substring(11, 13))+Number(16))*3600;
          }else{
            DataList[i].hour = (DataList[i].log_time.substring(11, 13)-8)*3600;
          }
          DataList[i].min = DataList[i].log_time.substring(14, 16)*60;
          DataList[i].second = DataList[i].log_time.substring(17, 19)*1;
          DataList[i].totalSec = DataList[i].hour+DataList[i].min+DataList[i].second;
          DataList[i].realtime_target = new Intl.NumberFormat().format(((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000)).toFixed(0));          
          DataList[i].Actual =((DataList[i].weight_gram/1000).toFixed(2)).toString();
          DataList[i].EFF = ((DataList[i].weight_gram/10)/((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000))).toFixed(0)  
          if(DataList[i].EFF >= 70 && DataList[i].EFF < 90){
             DataList[i]._classes = "bg-warning"
             DataList[i].NP = "N"
          }else if(DataList[i].EFF < 70){
              DataList[i]._classes = "bg-danger"
              DataList[i].NP = "N"
          } 
          if(DataList[i].EFF >= 90){
          }else{
            this.DataList4.push(DataList[i])
            this.DataList4.sort(function(a,b){
              return a.EFF - b.EFF;
            });
          }        
        }   
      }else if(DataList[i].PD_Line == "5"){
         if(this.DataList5.length < 6){          
          if(DataList[i].log_time.substring(11, 13) >= 0 && DataList[i].log_time.substring(11, 13) < 8){
            DataList[i].hour = (Number(DataList[i].log_time.substring(11, 13))+Number(16))*3600;
          }else{
            DataList[i].hour = (DataList[i].log_time.substring(11, 13)-8)*3600;
          }
          DataList[i].min = DataList[i].log_time.substring(14, 16)*60;
          DataList[i].second = DataList[i].log_time.substring(17, 19)*1;
          DataList[i].totalSec = DataList[i].hour+DataList[i].min+DataList[i].second;
         DataList[i].realtime_target = new Intl.NumberFormat().format(((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000)).toFixed(0));          
          DataList[i].Actual =((DataList[i].weight_gram/1000).toFixed(2)).toString();
          DataList[i].EFF = ((DataList[i].weight_gram/10)/((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000))).toFixed(0)  
          if(DataList[i].EFF >= 70 && DataList[i].EFF < 90){
             DataList[i]._classes = "bg-warning"
             DataList[i].NP = "N"
          }else if(DataList[i].EFF < 70){
              DataList[i]._classes = "bg-danger"
              DataList[i].NP = "N"
          }
          if(DataList[i].EFF >= 90){
          }else{
            this.DataList5.push(DataList[i])
            this.DataList5.sort(function(a,b){
              return a.EFF - b.EFF;
            });
          }     
        }   
      }else if(DataList[i].PD_Line == "6"){
         if(this.DataList6.length < 6){          
          if(DataList[i].log_time.substring(11, 13) >= 0 && DataList[i].log_time.substring(11, 13) < 8){
            DataList[i].hour = (Number(DataList[i].log_time.substring(11, 13))+Number(16))*3600;
          }else{
            DataList[i].hour = (DataList[i].log_time.substring(11, 13)-8)*3600;
          }
          DataList[i].min = DataList[i].log_time.substring(14, 16)*60;
          DataList[i].second = DataList[i].log_time.substring(17, 19)*1;
          DataList[i].totalSec = DataList[i].hour+DataList[i].min+DataList[i].second;
          DataList[i].realtime_target = new Intl.NumberFormat().format(((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000)).toFixed(0));          
          DataList[i].Actual =((DataList[i].weight_gram/1000).toFixed(2)).toString();
          DataList[i].EFF = ((DataList[i].weight_gram/10)/((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000))).toFixed(0)  
          if(DataList[i].EFF >= 70 && DataList[i].EFF < 90){
             DataList[i]._classes = "bg-warning"
             DataList[i].NP = "N"
          }else if(DataList[i].EFF < 70){
              DataList[i]._classes = "bg-danger"
              DataList[i].NP = "N"
          } 
          if(DataList[i].EFF >= 90){
          }else{
            this.DataList6.push(DataList[i])
            this.DataList6.sort(function(a,b){
              return a.EFF - b.EFF;
            });
          }        
        }   
      }else if(DataList[i].PD_Line == "7"){
         if(this.DataList7.length < 6){          
          if(DataList[i].log_time.substring(11, 13) >= 0 && DataList[i].log_time.substring(11, 13) < 8){
            DataList[i].hour = (Number(DataList[i].log_time.substring(11, 13))+Number(16))*3600;
          }else{
            DataList[i].hour = (DataList[i].log_time.substring(11, 13)-8)*3600;
          }
          DataList[i].min = DataList[i].log_time.substring(14, 16)*60;
          DataList[i].second = DataList[i].log_time.substring(17, 19)*1;
          DataList[i].totalSec = DataList[i].hour+DataList[i].min+DataList[i].second;          
          DataList[i].realtime_target = new Intl.NumberFormat().format(((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000)).toFixed(0));          
          DataList[i].Actual =((DataList[i].weight_gram/1000).toFixed(2)).toString();
          DataList[i].EFF = ((DataList[i].weight_gram/10)/((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000))).toFixed(0)  
          if(DataList[i].EFF >= 70 && DataList[i].EFF < 90){
             DataList[i]._classes = "bg-warning"
             DataList[i].NP = "N"
          }else if(DataList[i].EFF < 70){
              DataList[i]._classes = "bg-danger"
              DataList[i].NP = "N"
          }
          if(DataList[i].EFF >= 90){
          }else{
            this.DataList7.push(DataList[i])
            this.DataList7.sort(function(a,b){
              return a.EFF - b.EFF;
            });
          }        
        }   
      }else if(DataList[i].PD_Line == "8"){
        if(this.DataList8.length < 6){          
          if(DataList[i].log_time.substring(11, 13) >= 0 && DataList[i].log_time.substring(11, 13) < 8){
            DataList[i].hour = (Number(DataList[i].log_time.substring(11, 13))+Number(16))*3600;
          }else{
            DataList[i].hour = (DataList[i].log_time.substring(11, 13)-8)*3600;
          }
          DataList[i].min = DataList[i].log_time.substring(14, 16)*60;
          DataList[i].second = DataList[i].log_time.substring(17, 19)*1;
          DataList[i].totalSec = DataList[i].hour+DataList[i].min+DataList[i].second;
         DataList[i].realtime_target = new Intl.NumberFormat().format(((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000)).toFixed(0));          
          DataList[i].Actual =((DataList[i].weight_gram/1000).toFixed(2)).toString();
          DataList[i].EFF = ((DataList[i].weight_gram/10)/((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000))).toFixed(0)  
          DataList[i].Actual = (DataList[i].weight_gram/1000).toFixed(2)          
          if(DataList[i].EFF >= 70 && DataList[i].EFF < 90){
             DataList[i]._classes = "bg-warning"
             DataList[i].NP = "N"
          }else if(DataList[i].EFF < 70){
              DataList[i]._classes = "bg-danger"
              DataList[i].NP = "N"
          }
          if(DataList[i].EFF >= 90){
          }else{
            this.DataList8.push(DataList[i])
            this.DataList8.sort(function(a,b){
              return a.EFF - b.EFF;
            });
          }        
        }   
      }      
    }
    },
    branchapi(){
      if(this.selvalue == "Petch"){
        this.$router.push("/subfocused")
      }
    },
    selected(){
      if(this.isSel == "All"){
            this.$router.push("/machine") 
        }else if(this.isSel == "Focused"){
            return            
        }
    },
    shuffleArray (array) {
      return array
    },  
    getline1Data () {
      return this.shuffleArray(this.DataList1.slice(0))

    },
    getline2Data () {
      return this.shuffleArray(this.DataList2.slice(0))
    },
    getline3Data () {
      return this.shuffleArray(this.DataList3.slice(0))
    },
    getline4Data () {
      return this.shuffleArray(this.DataList4.slice(0))
    },
    getline5Data () {
      return this.shuffleArray(this.DataList5.slice(0))
    },
    getline6Data () {
      return this.shuffleArray(this.DataList6.slice(0))
    },
    getline7Data () {
      return this.shuffleArray(this.DataList7.slice(0))
    },
    getline8Data () {
      return this.shuffleArray(this.DataList8.slice(0))
    }
  }
}
</script>
