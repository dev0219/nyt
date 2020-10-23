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
                <select id="getApi" name="getApi" class="form-control" @change="getApi()">
                  <option value="" disabled selected>Choose...</option>
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
import { template } from '@babel/core'
import { localeData } from 'moment'
"use strict";

Vue.use(VueAxios, axios)

export default {
  name: 'Tables',
  components: { CTableWrapper1, CTableWrapper2, CTableWrapper3, CTableWrapper4, CTableWrapper5, CTableWrapper6, CTableWrapper7, CTableWrapper8 },
  data:function () {
    return {
      beforeData1_ori:[],
      beforeData1:[],
      beforeData2_ori:[],
      beforeData2:[],
      beforeData3_ori:[],
      beforeData3:[],
      beforeData4_ori:[],
      beforeData4:[],
      beforeData5_ori:[],
      beforeData5:[],
      beforeData6_ori:[],
      beforeData6:[],
      beforeData7_ori:[],
      beforeData7:[],
      beforeData8_ori:[],
      beforeData8:[],
      realtime_count : 0,


      intial_status1:[],
      Effarr1:localStorage.getItem('avg_1')==null?[]:JSON.parse(localStorage.getItem('avg_1')),
      Effarr2:localStorage.getItem('avg_2')==null?[]:JSON.parse(localStorage.getItem('avg_2')),
      Effarr3:localStorage.getItem('avg_3')==null?[]:JSON.parse(localStorage.getItem('avg_3')),
      Effarr4:localStorage.getItem('avg_4')==null?[]:JSON.parse(localStorage.getItem('avg_4')),
      Effarr5:localStorage.getItem('avg_5')==null?[]:JSON.parse(localStorage.getItem('avg_5')),
      Effarr6:localStorage.getItem('avg_6')==null?[]:JSON.parse(localStorage.getItem('avg_6')),
      Effarr7:localStorage.getItem('avg_7')==null?[]:JSON.parse(localStorage.getItem('avg_7')),
      Effarr8:localStorage.getItem('avg_8')==null?[]:JSON.parse(localStorage.getItem('avg_8')),
      brachStatus:"",
      isSel:"",
      storedAvg1:[],
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
  props: {
		url: {
			type: String,
			default: "http://localhost:3000/"
		}
	},
  created(){
    var time = new Date().toDateString();
    this.currentTime = time;
    if(localStorage.getItem('realTime_count')!= null){
      this.realtime_count = parseInt(localStorage.getItem('realTime_count'));
    }   
    this.appData()
    this.settime()
  },
  methods: {
    settime(){
      setInterval(() => {
        this.appData();
        this.browremove();
      }, 300000)
    },
    createDetect(val){
      var today = new Date();
      var yyyy = today.getFullYear();
      let JobNo = "j"+yyyy+(Math.floor(100000 + Math.random() * 900000))
      const detect = {
        jobId: JobNo,
        machineId: val,
        machinetype: "carding"
      }
      /// make the api to check the current machine Id 
      axios.post(`${this.url}detectdatacheck/check`,{
        check_id: val
      }).then(res => {
        console.log(res.data.message);
          if(res.data.message == "ok"){
             axios.post(`${this.url}detectdatacreate/store`,{
                detect : detect
            });
          }
      });      
    },
    async appData(){
      this.realtime_count++;
      this.realtime_count = this.realtime_count%12;
      localStorage.setItem('realTime_count', this.realtime_count);
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
      var tempList1 = [];
      var tempList2 = [];
      var tempList3 = [];
      var tempList4 = [];
      var tempList5 = [];
      var tempList6 = [];
      var tempList7 = [];
      var tempList8 = [];
       var sel_beforehour = [];
       
      // sort the data using foreach
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
        
        if (DataList[i].PD_Line == "1") {
          this.beforeData1_ori = localStorage.getItem('dataList1');
          if(this.beforeData1_ori!=null){           
            this.beforeData1 = JSON.parse(this.beforeData1_ori);
          }
          if (this.DataList1.length < 6) {
            if (DataList[i].log_time.substring(11, 13) >= 0 && DataList[i].log_time.substring(11, 13) < 8) {
              DataList[i].hour = (Number(DataList[i].log_time.substring(11, 13))+Number(16))*3600;
            } else {
              DataList[i].hour = (DataList[i].log_time.substring(11, 13)-8)*3600;
            }      
            DataList[i].min = DataList[i].log_time.substring(14, 16)*60;
            DataList[i].second = DataList[i].log_time.substring(17, 19)*1;
            DataList[i].totalSec = DataList[i].hour+DataList[i].min+DataList[i].second;
            DataList[i].realtime_target = new Intl.NumberFormat().format(((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000)).toFixed(0));          
            DataList[i].Actual =((DataList[i].weight_gram/1000).toFixed(2)).toString();
            DataList[i].EFF = ((DataList[i].weight_gram/10)/((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000))).toFixed(0);
            if (DataList[i].EFF >= 90) {               
                DataList[i]._classes = "bg-success"                      
              } else if (DataList[i].EFF >= 70 && DataList[i].EFF < 90) {               
                DataList[i]._classes = "bg-warning";
              } else if (DataList[i].EFF < 70) {                 
                  DataList[i]._classes = "bg-danger";              
              } 
            tempList1.push(DataList[i].EFF); 
            
            if (localStorage.getItem('hour_avg_1')==null) {
              if (DataList[i].EFF >= 90) {
                DataList[i].NP = "Y"                  
              } else if (DataList[i].EFF >= 70 && DataList[i].EFF < 90) {
                DataList[i].NP = "N"
              } else if (DataList[i].EFF < 70) {
                  DataList[i].NP = "N"             
              }              
              if(localStorage.getItem('avg_1')!=null){
                var localData=JSON.parse(localStorage.getItem('avg_1'));
                var localDataLength=localData.length;
               
                if(localDataLength>=12){
                  var a1 = 0 
                  var a2 = 0 
                  var a3 = 0 
                  var a4 = 0 
                  var a5 = 0 
                  var a6 = 0             
                  for (var j = 0;j<12;j++){
                    a1 = a1 + Number(localData[j][0])
                    a2 = a2 + Number(localData[j][1])
                    a3 = a3 + Number(localData[j][2])
                    a4 = a4 + Number(localData[j][3])
                    a5 = a5 + Number(localData[j][4])
                    a6 = a6 + Number(localData[j][5])
                  }   
                  var avgArr = [a1,a2,a3,a4,a5,a6]
                  localStorage.setItem('hour_avg_1', avgArr);
                  
                  for(var k=0;k<avgArr.length;k++){
                    if(avgArr[k]/12 >= 90){
                      DataList[i].NP = "Y"                     
                    }else if(avgArr[k]/12 >= 70 && avgArr[i]/12 < 90){
                      DataList[i].NP = "N"
                    }else if(avgArr[k]/12 < 70){
                      DataList[i].NP = "N"
                    }
                  }
                }
              }
            }
            else{
              var hour_avg=localStorage.getItem('hour_avg_1');
              var splite_number=hour_avg.split(",");
              var k;
              var sel_hour=[];
              if(i==9){
                k=0
              }else if(i==10){
                k=1
              }else if(i==11){
                k=2
              }else if(i==12){
                k=3
              }else if(i==13){
                k=4
              }else if(i==14){
                k=5
              }
              if(parseInt(splite_number[k])/12 >= 90){
                DataList[i].NP = "Y"
              }else if(parseInt(splite_number[k])/12 >= 70 && parseInt(splite_number[k])/12 < 90){
                DataList[i].NP = "N"
                if(this.beforeData1.length > 0 && this.beforeData1[k]!=null && this.realtime_count==0){
                  console.log("----- this is the before data 1 ------------------------------");
                  console.log(this.beforeData1[k].Actual);
                  console.log(this.beforeData1[k].EFF);
                  if(this.beforeData1[k].NP == "Y"){
                   this.createDetect(this.beforeData1[k].machine_id);
                  }
                }
              }else if(parseInt(splite_number[k])/12 < 70){
                DataList[i].NP = "N"
                if(this.beforeData1.length > 0 && this.beforeData1[k]!=null  && this.realtime_count==0){
                  console.log("----- this is the before data 1 ------------------------------");
                  console.log(this.beforeData1[k].Actual);
                  console.log(this.beforeData1[k].EFF);
                  console.log(this.beforeData1[k].machine_id);
                  if(this.beforeData1[k].NP == "Y"){
                    this.createDetect(this.beforeData1[k].machine_id);
                  }
                }
              }
              if(localStorage.getItem('avg_1')!=null){
                var localData=JSON.parse(localStorage.getItem('avg_1'));
                var localDataLength=localData.length;
                if(localDataLength>12){
                  var a1 = 0 
                  var a2 = 0 
                  var a3 = 0 
                  var a4 = 0 
                  var a5 = 0 
                  var a6 = 0             
                  for (var j = 0;j<12;j++){
                    a1 = a1 + Number(localData[j][0])
                    a2 = a2 + Number(localData[j][1])
                    a3 = a3 + Number(localData[j][2])
                    a4 = a4 + Number(localData[j][3])
                    a5 = a5 + Number(localData[j][4])
                    a6 = a6 + Number(localData[j][5])
                  }        
                  var avgArr1 = [a1,a2,a3,a4,a5,a6]
                  this.storedAvg1 = avgArr1
                  localStorage.setItem('hour_avg_1', avgArr1)
                  for(var k=0;k<avgArr1.length;k++){
                    if(avgArr1[k]/12 >= 90){
                      DataList[i].NP = "Y" 
                    }else if(avgArr1[k]/12 >= 70 && avgArr1[k]/12 < 90){
                      DataList[i].NP = "N";
                    }else if(avgArr1[k]/12 < 70){
                      DataList[i].NP = "N"
                    }
                  }
                }
              }
            }            
            this.DataList1.push(DataList[i])
            this.DataList1.sort(function(a,b){
              return a.EFF - b.EFF;
            });
          }
        } 
        else if(DataList[i].PD_Line == "2"){
          this.beforeData2_ori = localStorage.getItem('dataList2');
          if(this.beforeData2_ori!=null){           
            this.beforeData2 = JSON.parse(this.beforeData2_ori);
          }        
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
            if (DataList[i].EFF >= 90) {               
                DataList[i]._classes = "bg-success"                      
              } else if (DataList[i].EFF >= 70 && DataList[i].EFF < 90) {               
                DataList[i]._classes = "bg-warning";
              } else if (DataList[i].EFF < 70) {                 
                  DataList[i]._classes = "bg-danger";              
              } 
            tempList2.push(DataList[i].EFF);       
            if (localStorage.getItem('hour_avg_2')==null) {
              if (DataList[i].EFF >= 90) {          
              } else if (DataList[i].EFF >= 70 && DataList[i].EFF < 90) {
                DataList[i].NP = "N"
              } else if (DataList[i].EFF < 70) {
                  DataList[i].NP = "N"
              }
              if(localStorage.getItem('avg_2')!=null){
                var localData2=JSON.parse(localStorage.getItem('avg_2'));
                var localDataLength2=localData2.length;
                if(localDataLength2>=12){
                  var a1_2 = 0 
                  var a2_2 = 0 
                  var a3_2 = 0 
                  var a4_2 = 0 
                  var a5_2 = 0 
                  var a6_2 = 0             
                  for (var j = 0;j<12;j++){
                    a1_2 = a1_2 + Number(localData2[j][0])
                    a2_2 = a2_2 + Number(localData2[j][1])
                    a3_2 = a3_2 + Number(localData2[j][2])
                    a4_2 = a4_2 + Number(localData2[j][3])
                    a5_2 = a5_2 + Number(localData2[j][4])
                    a6_2 = a6_2 + Number(localData2[j][5])
                  }   
                  var avgArr2 = [a1_2,a2_2,a3_2,a4_2,a5_2,a6_2]
                  localStorage.setItem('hour_avg_2', avgArr2)
                  for(var k=0;k<avgArr2.length;k++){
                    if(avgArr2[k]/12 >= 90){
                      DataList[i].NP = "Y" 
                    }else if(avgArr2[k]/12 >= 70 && avgArr2[k]/12 < 90){
                      DataList[i].NP = "N"
                    }else if(avgArr2[k]/12 < 70){
                      DataList[i].NP = "N"
                    }
                  }       
                }
              }
            }
            else{
              var hour_avg2=localStorage.getItem('hour_avg_2');
              var splite_number2=hour_avg2.split(",");
              var k2;
              if(i==0){
                k2=0
              }else if(i==1){
                k2=1
              }else if(i==2){
                k2=2
              }else if(i==3){
                k2=3
              }else if(i==4){
                k2=4
              }else if(i==5){
                k2=5
              }
              if(parseInt(splite_number2[k2])/12 >= 90){
                DataList[i].NP = "Y"
              }else if(parseInt(splite_number2[k2])/12 >= 70 && parseInt(splite_number2[k2])/12 < 90){
                DataList[i].NP = "N"
                if(this.beforeData2.length > 0 && this.beforeData2[k2]!=null  && this.realtime_count==0){
                  console.log("----- this is the before data 2 ------------------------------");
                  console.log(this.beforeData2[k2].Actual);
                  console.log(this.beforeData2[k2].EFF);
                  console.log(this.beforeData2[k2].machine_id);
                  if(this.beforeData2[k2].NP =="Y"){
                   this.createDetect(this.beforeData2[k2].machine_id);
                  }
                }
              }else if(parseInt(splite_number2[k2])/12 < 70){
                DataList[i].NP = "N"
                if(this.beforeData2.length > 0 && this.beforeData2[k2]!=null  && this.realtime_count==0){
                  console.log("----- this is the before data 2 ------------------------------");
                  console.log(this.beforeData2[k2].Actual);
                  console.log(this.beforeData2[k2].EFF);
                  console.log(this.beforeData2[k2].machine_id);
                  if(this.beforeData2[k2].NP =="Y"){
                   this.createDetect(this.beforeData2[k2].machine_id);
                  }
                }
              }
              if(localStorage.getItem('avg_2')!=null){
                var localData2=JSON.parse(localStorage.getItem('avg_2'));
                var localDataLength2=localData2.length;
                if(localDataLength2>12){
                  var a1_2 = 0 
                  var a2_2 = 0 
                  var a3_2 = 0 
                  var a4_2 = 0 
                  var a5_2 = 0 
                  var a6_2 = 0             
                  for (var j = 0;j<12;j++){
                    a1_2 = a1_2 + Number(localData2[j][0])
                    a2_2 = a2_2 + Number(localData2[j][1])
                    a3_2 = a3_2 + Number(localData2[j][2])
                    a4_2 = a4_2 + Number(localData2[j][3])
                    a5_2 = a5_2 + Number(localData2[j][4])
                    a6_2 = a6_2 + Number(localData2[j][5])
                  }
                  var avgArr2 = [a1_2,a2_2,a3_2,a4_2,a5_2,a6_2]
                  localStorage.setItem('hour_avg_2', avgArr2)
                  for(var k=0;k<avgArr2.length;k++){
                    if(avgArr2[k]/12 >= 90){
                      DataList[i].NP = "Y"
                    }else if(avgArr2[k]/12 >= 70 && avgArr2[k]/12 < 90){
                      DataList[i].NP = "N"
                    }else if(avgArr2[k]/12 < 70){
                      DataList[i].NP = "N"
                    }
                  }
                }
              }
            }
            this.DataList2.push(DataList[i])
            this.DataList2.sort(function(a,b){
                return a.EFF - b.EFF;
            });    
          }               
        } 
        else if(DataList[i].PD_Line == "3"){
          this.beforeData3_ori = localStorage.getItem('dataList3');
          if(this.beforeData3_ori!=null){           
            this.beforeData3 = JSON.parse(this.beforeData3_ori);
          }
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
            if (DataList[i].EFF >= 90) {               
                DataList[i]._classes = "bg-success"                      
              } else if (DataList[i].EFF >= 70 && DataList[i].EFF < 90) {               
                DataList[i]._classes = "bg-warning";
              } else if (DataList[i].EFF < 70) {                 
                  DataList[i]._classes = "bg-danger";              
              } 
            tempList3.push(DataList[i].EFF);       
            if (localStorage.getItem('hour_avg_3')==null) {
              if (DataList[i].EFF >= 90) {
                DataList[i].NP = "Y"           
              } else if (DataList[i].EFF >= 70 && DataList[i].EFF < 90) {
                DataList[i].NP = "N"
              } else if (DataList[i].EFF < 70) {
                  DataList[i].NP = "N"
              }
              if(localStorage.getItem('avg_3')!=null){
                var localData3=JSON.parse(localStorage.getItem('avg_3'));
                var localDataLength3=localData3.length;
                if(localDataLength3>=12){
                  var a1_3 = 0 
                  var a2_3 = 0 
                  var a3_3 = 0 
                  var a4_3 = 0 
                  var a5_3 = 0 
                  var a6_3 = 0             
                  for (var j = 0;j<12;j++){
                    a1_3 = a1_3 + Number(localData3[j][0])
                    a2_3 = a2_3 + Number(localData3[j][1])
                    a3_3 = a3_3 + Number(localData3[j][2])
                    a4_3 = a4_3 + Number(localData3[j][3])
                    a5_3 = a5_3 + Number(localData3[j][4])
                    a6_3 = a6_3 + Number(localData3[j][5])
                  }   
                  var avgArr3 = [a1_3,a2_3,a3_3,a4_3,a5_3,a6_3]
                  localStorage.setItem('hour_avg_3', avgArr3)
                  for(var k=0;k<avgArr3.length;k++){
                    if(avgArr3[k]/12 >= 90){
                      DataList[i].NP = "Y"
                    }else if(avgArr3[k]/12 >= 70 && avgArr3[k]/12 < 90){
                      DataList[i].NP = "N"
                    }else if(avgArr3[k]/12 < 70){
                      DataList[i].NP = "N"
                    }
                  }       
                }
              }
            }
            else{
              var hour_avg3=localStorage.getItem('hour_avg_3');
              var splite_number3=hour_avg3.split(",");
              var k3;
              if(i==23){
                k3=0
              }else if(i==24){
                k3=1
              }else if(i==25){
                k3=2
              }else if(i==33){
                k3=3
              }else if(i==34){
                k3=4
              }
              if(parseInt(splite_number3[k3])/12 >= 90){
                DataList[i].NP = "Y"
              }else if(parseInt(splite_number3[k3])/12 >= 70 && parseInt(splite_number3[k3])/12 < 90){
                DataList[i].NP = "N"
                if(this.beforeData3.length > 0 && this.beforeData3[k3]!=null  && this.realtime_count==0){
                  // console.log("----- this is the before data 3 ------------------------------");
                  // console.log(this.beforeData3[k].Actual);
                  // console.log(this.beforeData3[k].EFF);
                  // console.log(this.beforeData3[k].machine_id);
                  if(this.beforeData3[k3].NP =="Y"){
                   this.createDetect(this.beforeData3[k3].machine_id);
                  }
                }
              }else if(parseInt(splite_number3[k3])/12 < 70){
                DataList[i].NP = "N"
                if(this.beforeData3.length > 0 && this.beforeData3[k3]!=null  && this.realtime_count==0){
                  // console.log("----- this is the before data 3 ------------------------------");
                  // console.log(this.beforeData3[k].Actual);
                  // console.log(this.beforeData3[k].EFF);
                  // console.log(this.beforeData3[k].machine_id);
                  if(this.beforeData3[k3].NP =="Y"){
                   this.createDetect(this.beforeData3[k3].machine_id);
                  }
                }
              }
              if(localStorage.getItem('avg_3')!=null){
                var localData3=JSON.parse(localStorage.getItem('avg_3'));
                var localDataLength3=localData3.length;
                if(localDataLength3>12){
                  var a1_3 = 0 
                  var a2_3 = 0 
                  var a3_3 = 0 
                  var a4_3 = 0 
                  var a5_3 = 0 
                  var a6_3 = 0             
                  for (var j = 0;j<12;j++){
                    a1_3 = a1_3 + Number(localData3[j][0])
                    a2_3 = a2_3 + Number(localData3[j][1])
                    a3_3 = a3_3 + Number(localData3[j][2])
                    a4_3 = a4_3 + Number(localData3[j][3])
                    a5_3 = a5_3 + Number(localData3[j][4])
                    a6_3 = a6_3 + Number(localData3[j][5])
                  }        
                  var avgArr3 = [a1_3,a2_3,a3_3,a4_3,a5_3,a6_3]
                  localStorage.setItem('hour_avg_3', avgArr3)
                  for(var k=0;k<avgArr3.length;k++){
                    if(avgArr3[k]/12 >= 90){
                      DataList[i].NP = "Y" 
                    }else if(avgArr3[k]/12 >= 70 && avgArr3[k]/12 < 90){
                      DataList[i].NP = "N"
                    }else if(avgArr3[k]/12 < 70){
                      DataList[i].NP = "N"
                    }
                  }
                }
              }
            }
            this.DataList3.push(DataList[i])
            this.DataList3.sort(function(a,b){
                return a.EFF - b.EFF;
              });                     
          }  
        } 
        else if(DataList[i].PD_Line == "4"){
          this.beforeData4_ori = localStorage.getItem('dataList4');
          if(this.beforeData4_ori!=null){           
            this.beforeData4 = JSON.parse(this.beforeData4_ori);
          }
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
            if (DataList[i].EFF >= 90) {               
                DataList[i]._classes = "bg-success"                      
              } else if (DataList[i].EFF >= 70 && DataList[i].EFF < 90) {               
                DataList[i]._classes = "bg-warning";
              } else if (DataList[i].EFF < 70) {                 
                  DataList[i]._classes = "bg-danger";              
              } 
            tempList4.push(DataList[i].EFF);       
            if (localStorage.getItem('hour_avg_4')==null) {
              if (DataList[i].EFF >= 90) {
                DataList[i].NP = "Y"          
              } else if (DataList[i].EFF >= 70 && DataList[i].EFF < 90) {
                DataList[i].NP = "N"
              } else if (DataList[i].EFF < 70) {
                  DataList[i].NP = "N"
              }
              if(localStorage.getItem('avg_4')!=null){
                var localData4=JSON.parse(localStorage.getItem('avg_4'));
                var localDataLength4=localData4.length;
                if(localDataLength4>=12){
                  var a1_4 = 0 
                  var a2_4 = 0 
                  var a3_4 = 0 
                  var a4_4 = 0 
                  var a5_4 = 0 
                  var a6_4 = 0             
                  for (var j = 0;j<12;j++){
                    a1_4 = a1_4 + Number(localData4[j][0])
                    a2_4 = a2_4 + Number(localData4[j][1])
                    a3_4 = a3_4 + Number(localData4[j][2])
                    a4_4 = a4_4 + Number(localData4[j][3])
                    a5_4 = a5_4 + Number(localData4[j][4])
                    a6_4 = a6_4 + Number(localData4[j][5])
                  }   
                  var avgArr4 = [a1_4,a2_4,a3_4,a4_4,a5_4,a6_4]
                  localStorage.setItem('hour_avg_4', avgArr4)
                  for(var k=0;k<avgArr4.length;k++){
                    if(avgArr4[k]/12 >= 90){
                      DataList[i].NP = "Y" 
                    }else if(avgArr4[k]/12 >= 70 && avgArr4[k]/12 < 90){
                      DataList[i].NP = "N"
                    }else if(avgArr4[k]/12 < 70){
                      DataList[i].NP = "N"
                    }
                  }       
                }
              }
            }
            else{
              var hour_avg4=localStorage.getItem('hour_avg_4');
              var splite_number4=hour_avg4.split(",");
              var k4;
              if(i==35){
                k4=0
              }else if(i==36){
                k4=1
              }else if(i==37){
                k4=2
              }else if(i==38){
                k4=3
              }
              if(parseInt(splite_number4[k4])/12 >= 90){
                DataList[i].NP = "Y"
              }else if(parseInt(splite_number4[k4])/12 >= 70 && parseInt(splite_number4[k4])/12 < 90){
                DataList[i].NP = "N"
                if(this.beforeData4.length > 0 && this.beforeData4[k4]!=null  && this.realtime_count==0){
                  // console.log("----- this is the before data 4 ------------------------------");
                  // console.log(this.beforeData4[k].Actual);
                  // console.log(this.beforeData4[k].EFF);
                  // console.log(this.beforeData4[k].machine_id);
                  if(this.beforeData4[k4].NP =="Y"){
                   this.createDetect(this.beforeData4[k4].machine_id);
                  }
                }
              }else if(parseInt(splite_number4[k4])/12 < 70){
                DataList[i].NP = "N"
                if(this.beforeData4.length > 0 && this.beforeData4[k4]!=null  && this.realtime_count==0){
                  // console.log("----- this is the before data 4 ------------------------------");
                  // console.log(this.beforeData4[k].Actual);
                  // console.log(this.beforeData4[k].EFF);
                  // console.log(this.beforeData4[k].machine_id);
                  if(this.beforeData4[k4].NP =="Y"){
                   this.createDetect(this.beforeData4[k4].machine_id);
                  }
                }
              }
              if(localStorage.getItem('avg_4')!=null){
                var localData4=JSON.parse(localStorage.getItem('avg_4'));
                var localDataLength4=localData4.length;
                if(localDataLength4>12){
                  var a1_4 = 0 
                  var a2_4 = 0 
                  var a3_4 = 0 
                  var a4_4 = 0 
                  var a5_4 = 0 
                  var a6_4 = 0             
                  for (var j = 0;j<12;j++){
                    a1_4 = a1_4 + Number(localData4[j][0])
                    a2_4 = a2_4 + Number(localData4[j][1])
                    a3_4 = a3_4 + Number(localData4[j][2])
                    a4_4 = a4_4 + Number(localData4[j][3])
                    a5_4 = a5_4 + Number(localData4[j][4])
                    a6_4 = a6_4 + Number(localData4[j][5])
                  }        
                  var avgArr4 = [a1_4,a2_4,a3_4,a4_4,a5_4,a6_4]
                  localStorage.setItem('hour_avg_4', avgArr4)
                  for(var k=0;k<avgArr4.length;k++){
                    if(avgArr4[k]/12 >= 90){
                      DataList[i].NP = "Y"
                    }else if(avgArr4[k]/12 >= 70 && avgArr4[k]/12 < 90){
                      DataList[i].NP = "N"
                    }else if(avgArr4[k]/12 < 70){
                      DataList[i].NP = "N"
                    }
                  }
                }
              }
            } 
            this.DataList4.push(DataList[i])
            this.DataList4.sort(function(a,b){
                return a.EFF - b.EFF;
              });      
          }   
        }
        else if(DataList[i].PD_Line == "5"){
          this.beforeData5_ori = localStorage.getItem('dataList5');
          if(this.beforeData5_ori!=null){           
            this.beforeData5 = JSON.parse(this.beforeData5_ori);
          }
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
           if (DataList[i].EFF >= 90) {               
                DataList[i]._classes = "bg-success"                      
              } else if (DataList[i].EFF >= 70 && DataList[i].EFF < 90) {               
                DataList[i]._classes = "bg-warning";
              } else if (DataList[i].EFF < 70) {                 
                  DataList[i]._classes = "bg-danger";              
              } 
           tempList5.push(DataList[i].EFF);       
            if (localStorage.getItem('hour_avg_5')==null) {
              if (DataList[i].EFF >= 90) {
                DataList[i].NP = "Y"           
              } else if (DataList[i].EFF >= 70 && DataList[i].EFF < 90) {
                DataList[i].NP = "N"
              } else if (DataList[i].EFF < 70) {
                  DataList[i].NP = "N"
              }
              if(localStorage.getItem('avg_5')!=null){
                var localData5=JSON.parse(localStorage.getItem('avg_5'));
                var localDataLength5=localData5.length;
                if(localDataLength5>=12){
                  var a1_5 = 0 
                  var a2_5 = 0 
                  var a3_5 = 0 
                  var a4_5 = 0 
                  var a5_5 = 0 
                  var a6_5 = 0             
                  for (var j = 0;j<12;j++){
                    a1_5 = a1_5 + Number(localData5[j][0])
                    a2_5 = a2_5 + Number(localData5[j][1])
                    a3_5 = a3_5 + Number(localData5[j][2])
                    a4_5 = a4_5 + Number(localData5[j][3])
                    a5_5 = a5_5 + Number(localData5[j][4])
                    a6_5 = a6_5 + Number(localData5[j][5])
                  }   
                  var avgArr5 = [a1_5,a2_5,a3_5,a4_5,a5_5,a6_5]
                  localStorage.setItem('hour_avg_5', avgArr5)
                  for(var k=0;k<avgArr5.length;k++){
                    if(avgArr5[k]/12 >= 90){
                      DataList[i].NP = "Y" 
                    }else if(avgArr5[k]/12 >= 70 && avgArr5[k]/12 < 90){
                      DataList[i].NP = "N"
                    }else if(avgArr5[k]/12 < 70){
                      DataList[i].NP = "N"
                    }
                  }       
                }
              }
            }
            else{
              var hour_avg5=localStorage.getItem('hour_avg_5');
              var splite_number5=hour_avg5.split(",");
              var k5;
              if(i==27){
                k5=0
              }else if(i==28){
                k5=1
              }
              // else if(i==26){
              //   k5=1
              // }
              if(parseInt(splite_number5[k5])/12 >= 90){
                DataList[i].NP = "Y"
              }else if(parseInt(splite_number5[k5])/12 >= 70 && parseInt(splite_number5[k5])/12 < 90){
                DataList[i].NP = "N"
                if(this.beforeData5.length > 0 && this.beforeData5[k5]!=null  && this.realtime_count==0){
                  // console.log("----- this is the before data 5 ------------------------------");
                  // console.log(this.beforeData5[k].Actual);
                  // console.log(this.beforeData5[k].EFF);
                  // console.log(this.beforeData5[k].machine_id);
                  if(this.beforeData5[k5].NP =="Y"){
                   this.createDetect(this.beforeData5[k5].machine_id);
                  }
                }
              }else if(parseInt(splite_number5[k5])/12 < 70){
                DataList[i].NP = "N"
                DataList[i]._classes = "bg-danger"
                if(this.beforeData5.length > 0 && this.beforeData5[k5]!=null  && this.realtime_count==0){
                  // console.log("----- this is the before data 5 ------------------------------");
                  // console.log(this.beforeData5[k].Actual);
                  // console.log(this.beforeData5[k].EFF);
                  // console.log(this.beforeData5[k].machine_id);
                  if(this.beforeData5[k5].NP =="Y"){
                   this.createDetect(this.beforeData5[k5].machine_id);
                  }
                }
              }
              if(localStorage.getItem('avg_5')!=null){
                var localData5=JSON.parse(localStorage.getItem('avg_5'));
                var localDataLength5=localData5.length;
                if(localDataLength5>12){
                  var a1_5 = 0 
                  var a2_5 = 0 
                  var a3_5 = 0 
                  var a4_5 = 0 
                  var a5_5 = 0 
                  var a6_5 = 0             
                  for (var j = 0;j<12;j++){
                    a1_5 = a1_5 + Number(localData5[j][0])
                    a2_5 = a2_5 + Number(localData5[j][1])
                    a3_5 = a3_5 + Number(localData5[j][2])
                    a4_5 = a4_5 + Number(localData5[j][3])
                    a5_5 = a5_5 + Number(localData5[j][4])
                    a6_5 = a6_5 + Number(localData5[j][5])
                  }        
                  var avgArr5 = [a1_5,a2_5,a3_5,a4_5,a5_5,a6_5]
                  localStorage.setItem('hour_avg_5', avgArr5)
                  for(var k=0;k<avgArr5.length;k++){
                    if(avgArr5[k]/12 >= 90){
                      DataList[i].NP = "Y"
                    }else if(avgArr5[k]/12 >= 70 && avgArr5[k]/12 < 90){
                      DataList[i].NP = "N"
                    }else if(avgArr5[k]/12 < 70){
                      DataList[i].NP = "N"
                    }
                  }
                }
              }
            } 
            this.DataList5.push(DataList[i]) 
            this.DataList5.sort(function(a,b){
                return a.EFF - b.EFF;
              });      
          }   
        }
        else if(DataList[i].PD_Line == "6"){
          this.beforeData6_ori = localStorage.getItem('dataList6');
          if(this.beforeData6_ori!=null){           
            this.beforeData6 = JSON.parse(this.beforeData6_ori);
          }
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
            if (DataList[i].EFF >= 90) {               
                DataList[i]._classes = "bg-success"                      
              } else if (DataList[i].EFF >= 70 && DataList[i].EFF < 90) {               
                DataList[i]._classes = "bg-warning";
              } else if (DataList[i].EFF < 70) {                 
                  DataList[i]._classes = "bg-danger";              
              } 
            tempList6.push(DataList[i].EFF);       
            if (localStorage.getItem('hour_avg_6')==null) {
              if (DataList[i].EFF >= 90) {
                DataList[i].NP = "Y"         
              } else if (DataList[i].EFF >= 70 && DataList[i].EFF < 90) {
                DataList[i].NP = "N"
              } else if (DataList[i].EFF < 70) {
                  DataList[i].NP = "N"
              }
              if(localStorage.getItem('avg_6')!=null){
                var localData6=JSON.parse(localStorage.getItem('avg_6'));
                var localDataLength6=localData6.length;
                if(localDataLength6>=12){
                  var a1_6 = 0 
                  var a2_6 = 0 
                  var a3_6 = 0 
                  var a4_6 = 0 
                  var a5_6 = 0 
                  var a6_6 = 0             
                  for (var j = 0;j<12;j++){
                    a1_6 = a1_6 + Number(localData6[j][0])
                    a2_6 = a2_6 + Number(localData6[j][1])
                    a3_6 = a3_6 + Number(localData6[j][2])
                    a4_6 = a4_6 + Number(localData6[j][3])
                    a5_6 = a5_6 + Number(localData6[j][4])
                    a6_6 = a6_6 + Number(localData6[j][5])
                  }   
                  var avgArr6 = [a1_6,a2_6,a3_6,a4_6,a5_6,a6_6]
                  localStorage.setItem('hour_avg_6', avgArr6)
                  for(var k=0;k<avgArr6.length;k++){
                    if(avgArr6[k]/12 >= 90){
                      DataList[i].NP = "Y"
                    }else if(avgArr6[k]/12 >= 70 && avgArr6[k]/12 < 90){
                      DataList[i].NP = "N"
                    }else if(avgArr6[k]/12 < 70){
                      DataList[i].NP = "N"
                    }
                  }       
                }
              }
            }
            else{
              var hour_avg6=localStorage.getItem('hour_avg_6');
              var splite_number6=hour_avg6.split(",");
              var k6;
              if(i==5){
                k6=0
              }else if(i==6){
                k6=1
              }
              if(parseInt(splite_number6[k6])/12 >= 90){
                DataList[i].NP = "Y"
              }else if(parseInt(splite_number6[k6])/12 >= 70 && parseInt(splite_number6[k6])/12 < 90){
                DataList[i].NP = "N"
                if(this.beforeData6.length > 0 && this.beforeData6[k6]!=null  && this.realtime_count==0){
                  // console.log("----- this is the before data 6 ------------------------------");
                  // console.log(this.beforeData6[k].Actual);
                  // console.log(this.beforeData6[k].EFF);
                  // console.log(this.beforeData6[k].machine_id);
                  if(this.beforeData6[k6].NP =="Y"){
                   this.createDetect(this.beforeData6[k6].machine_id);
                  }
                }
              }else if(parseInt(splite_number6[k6])/12 < 70){
                DataList[i].NP = "N"
                if(this.beforeData6.length > 0 && this.beforeData6[k6]!=null  && this.realtime_count==0){
                  // console.log("----- this is the before data 6 ------------------------------");
                  // console.log(this.beforeData6[k].Actual);
                  // console.log(this.beforeData6[k].EFF);
                  // console.log(this.beforeData6[k].machine_id);
                  if(this.beforeData6[k6].NP =="Y"){
                   this.createDetect(this.beforeData6[k6].machine_id);
                  }
                }
              }
              if(localStorage.getItem('avg_6')!=null){
                var localData6=JSON.parse(localStorage.getItem('avg_6'));
                var localDataLength6=localData6.length;
                if(localDataLength6>12){
                  var a1_6 = 0 
                  var a2_6 = 0 
                  var a3_6 = 0 
                  var a4_6 = 0 
                  var a5_6 = 0 
                  var a6_6 = 0             
                  for (var j = 0;j<12;j++){
                    a1_6 = a1_6 + Number(localData6[j][0])
                    a2_6 = a2_6 + Number(localData6[j][1])
                    a3_6 = a3_6 + Number(localData6[j][2])
                    a4_6 = a4_6 + Number(localData6[j][3])
                    a5_6 = a5_6 + Number(localData6[j][4])
                    a6_6 = a6_6 + Number(localData6[j][5])
                  }        
                  var avgArr6 = [a1_6,a2_6,a3_6,a4_6,a5_6,a6_6]
                  localStorage.setItem('hour_avg_6', avgArr6)
                  for(var k=0;k<avgArr6.length;k++){
                    if(avgArr6[k]/12 >= 90){
                      DataList[i].NP = "Y" 
                    }else if(avgArr6[k]/12 >= 70 && avgArr6[k]/12 < 90){
                      DataList[i].NP = "N"
                    }else if(avgArr6[k]/12 < 70){
                      DataList[i].NP = "N"
                    }
                  }
                }
              }
            }  
            this.DataList6.push(DataList[i])
            this.DataList6.sort(function(a,b){
                return a.EFF - b.EFF;
              });     
          }   
        }
        else if(DataList[i].PD_Line == "7"){
          this.beforeData7_ori = localStorage.getItem('dataList7');
          if(this.beforeData7_ori!=null){           
            this.beforeData7 = JSON.parse(this.beforeData7_ori);
          }
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
            if (DataList[i].EFF >= 90) {               
                DataList[i]._classes = "bg-success"                      
              } else if (DataList[i].EFF >= 70 && DataList[i].EFF < 90) {               
                DataList[i]._classes = "bg-warning";
              } else if (DataList[i].EFF < 70) {                 
                  DataList[i]._classes = "bg-danger";              
              } 
            tempList7.push(DataList[i].EFF);       
            if (localStorage.getItem('hour_avg_7')==null) {
              if (DataList[i].EFF >= 90) {
                DataList[i].NP = "Y"          
              } else if (DataList[i].EFF >= 70 && DataList[i].EFF < 90) {
                DataList[i].NP = "N"
              } else if (DataList[i].EFF < 70) {
                  DataList[i].NP = "N"
              }
              if(localStorage.getItem('avg_7')!=null){
                var localData7=JSON.parse(localStorage.getItem('avg_7'));
                var localDataLength7=localData7.length;
                if(localDataLength7>=12){
                  var a1_7 = 0 
                  var a2_7 = 0 
                  var a3_7 = 0 
                  var a4_7 = 0 
                  var a5_7 = 0 
                  var a6_7 = 0             
                  for (var j = 0;j<12;j++){
                    a1_7 = a1_7 + Number(localData7[j][0])
                    a2_7 = a2_7 + Number(localData7[j][1])
                    a3_7 = a3_7 + Number(localData7[j][2])
                    a4_7 = a4_7 + Number(localData7[j][3])
                    a5_7 = a5_7 + Number(localData7[j][4])
                    a6_7 = a6_7 + Number(localData7[j][5])
                  }   
                  var avgArr7 = [a1_7,a2_7,a3_7,a4_7,a5_7,a6_7]
                  localStorage.setItem('hour_avg_7', avgArr7)
                  for(var k=0;k<avgArr7.length;k++){
                    if(avgArr7[k]/12 >= 90){
                      DataList[i].NP = "Y"
                    }else if(avgArr7[k]/12 >= 70 && avgArr7[k]/12 < 90){
                      DataList[i].NP = "N"
                    }else if(avgArr7[k]/12 < 70){
                      DataList[i].NP = "N"
                    }
                  }       
                }
              }
            }
            else{
              var hour_avg7=localStorage.getItem('hour_avg_7');
              var splite_number7=hour_avg7.split(",");
              var k7;
              if(i==29){
                k7=0
              }else if(i==30){
                k7=1
              }
              if(parseInt(splite_number7[k7])/12 >= 90){
                DataList[i].NP = "Y" 
              }else if(parseInt(splite_number7[k7])/12 >= 70 && parseInt(splite_number7[k7])/12 < 90){
                DataList[i].NP = "N"
                if(this.beforeData7.length > 0 && this.beforeData7[k7]!=null  && this.realtime_count==0){
                  // console.log("----- this is the before data 7 ------------------------------");
                  // console.log(this.beforeData7[k].Actual);
                  // console.log(this.beforeData7[k].EFF);
                  // console.log(this.beforeData7[k].machine_id);
                  if(this.beforeData7[k7].NP =="Y"){
                   this.createDetect(this.beforeData7[k7].machine_id);
                  }
                }
              }else if(parseInt(splite_number7[k7])/12 < 70){
                DataList[i].NP = "N"
                if(this.beforeData7.length > 0 && this.beforeData7[k7]!=null  && this.realtime_count==0){
                  // console.log("----- this is the before data 7 ------------------------------");
                  // console.log(this.beforeData7[k].Actual);
                  // console.log(this.beforeData7[k].EFF);
                  // console.log(this.beforeData7[k].machine_id);
                  if(this.beforeData7[k7].NP =="Y"){
                   this.createDetect(this.beforeData7[k7].machine_id);
                  }
                }
              }
              if(localStorage.getItem('avg_7')!=null){
                var localData7=JSON.parse(localStorage.getItem('avg_7'));
                var localDataLength7=localData7.length;
                if(localDataLength7>12){
                  var a1_7 = 0 
                  var a2_7 = 0 
                  var a3_7 = 0 
                  var a4_7 = 0 
                  var a5_7 = 0 
                  var a6_7 = 0             
                  for (var j = 0;j<12;j++){
                    a1_7 = a1_7 + Number(localData7[j][0])
                    a2_7 = a2_7 + Number(localData7[j][1])
                    a3_7 = a3_7 + Number(localData7[j][2])
                    a4_7 = a4_7 + Number(localData7[j][3])
                    a5_7 = a5_7 + Number(localData7[j][4])
                    a6_7 = a6_7 + Number(localData7[j][5])
                  }        
                  var avgArr7 = [a1_7,a2_7,a3_7,a4_7,a5_7,a6_7]
                  localStorage.setItem('hour_avg_7', avgArr7)
                  for(var k=0;k<avgArr7.length;k++){
                    if(avgArr7[k]/12 >= 90){
                      DataList[i].NP = "Y" 
                    }else if(avgArr7[k]/12 >= 70 && avgArr7[k]/12 < 90){
                      DataList[i].NP = "N"
                    }else if(avgArr7[k]/12 < 70){
                      DataList[i].NP = "N"
                    }
                  }
                }
              }
            } 
            this.DataList7.push(DataList[i])
            this.DataList7.sort(function(a,b){
                return a.EFF - b.EFF;
              });     
          }   
        }
        else if(DataList[i].PD_Line == "8"){
          this.beforeData8_ori = localStorage.getItem('dataList8');
          if(this.beforeData8_ori!=null){           
            this.beforeData8 = JSON.parse(this.beforeData8_ori);
          }
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
            if (DataList[i].EFF >= 90) {               
                DataList[i]._classes = "bg-success"                      
              } else if (DataList[i].EFF >= 70 && DataList[i].EFF < 90) {               
                DataList[i]._classes = "bg-warning";
              } else if (DataList[i].EFF < 70) {                 
                  DataList[i]._classes = "bg-danger";              
              } 
           tempList8.push(DataList[i].EFF);       
            if (localStorage.getItem('hour_avg_7')==null) {
              if (DataList[i].EFF >= 90) {
                DataList[i].NP = "Y"          
              } else if (DataList[i].EFF >= 70 && DataList[i].EFF < 90) {
                DataList[i].NP = "N"
              } else if (DataList[i].EFF < 70) {
                  DataList[i].NP = "N"                 
              }
              if(localStorage.getItem('avg_8')!=null){
                var localData8=JSON.parse(localStorage.getItem('avg_8'));
                var localDataLength8=localData8.length;
                if(localDataLength8>=12){
                  var a1_8 = 0 
                  var a2_8 = 0 
                  var a3_8 = 0 
                  var a4_8 = 0 
                  var a5_8 = 0 
                  var a6_8 = 0
                  for (var j = 0;j<12;j++){
                    a1_8 = a1_8 + Number(localData8[j][0])
                    a2_8 = a2_8 + Number(localData8[j][1])
                    a3_8 = a3_8 + Number(localData8[j][2])
                    a4_8 = a4_8 + Number(localData8[j][3])
                    a5_8 = a5_8 + Number(localData8[j][4])
                    a6_8 = a6_8 + Number(localData8[j][5])
                  }   
                  var avgArr8 = [a1_8,a2_8,a3_8,a4_8,a5_8,a6_8]
                  localStorage.setItem('hour_avg_8', avgArr8)
                  for(var k=0;k<avgArr8.length;k++){
                    if(avgArr8[k]/12 >= 90){
                      DataList[i].NP = "Y" 
                    }else if(avgArr8[k]/12 >= 70 && avgArr8[k]/12 < 90){
                      DataList[i].NP = "N"
                    }else if(avgArr8[k]/12 < 70){
                      DataList[i].NP = "N"
                    }
                  }       
                }
              }
            }
            else{
              var hour_avg8=localStorage.getItem('hour_avg_8');
              var splite_number8=hour_avg8.split(",");
              var k8;
              if(i==8){
                k8=1
              }else if(i==9){
                k8=2
              }else if(i==7){
                k8=0
              }
              if(parseInt(splite_number8[k8])/12 >= 90){
                DataList[i].NP = "Y"
              }else if(parseInt(splite_number8[k8])/12 >= 70 && parseInt(splite_number8[k8])/12 < 90){
                DataList[i].NP = "N"
                if(this.beforeData8.length > 0 && this.beforeData8[k8]!=null  && this.realtime_count==0){
                  // console.log("----- this is the before data 8 ------------------------------");
                  // console.log(this.beforeData8[k].Actual);
                  // console.log(this.beforeData8[k].EFF);
                  // console.log(this.beforeData8[k].machine_id);
                  if(this.beforeData8[k8].NP == "Y"){
                   this.createDetect(this.beforeData8[k8].machine_id);
                  }
                }
              }else if(parseInt(splite_number8[k8])/12 < 70){
                DataList[i].NP = "N"
                if(this.beforeData8.length > 0 && this.beforeData8[k8]!=null  && this.realtime_count==0){
                  // console.log("----- this is the before data 8 ------------------------------");
                  // console.log(this.beforeData8[k].Actual);
                  // console.log(this.beforeData8[k].EFF);
                  // console.log(this.beforeData8[k].machine_id);
                  if(this.beforeData8[k8].NP == "Y"){
                   this.createDetect(this.beforeData8[k8].machine_id);
                  }
                }
              }
              if(localStorage.getItem('avg_8')!=null){
                var localData8=JSON.parse(localStorage.getItem('avg_8'));
                var localDataLength8=localData8.length;
                if(localDataLength8>12){
                  var a1_8 = 0 
                  var a2_8 = 0 
                  var a3_8 = 0 
                  var a4_8 = 0 
                  var a5_8 = 0 
                  var a6_8 = 0             
                  for (var j = 0;j<12;j++){
                    a1_8 = a1_8 + Number(localData8[j][0])
                    a2_8 = a2_8 + Number(localData8[j][1])
                    a3_8 = a3_8 + Number(localData8[j][2])
                    a4_8 = a4_8 + Number(localData8[j][3])
                    a5_8 = a5_8 + Number(localData8[j][4])
                    a6_8 = a6_8 + Number(localData8[j][5])
                  }        
                  var avgArr8 = [a1_8,a2_8,a3_8,a4_8,a5_8,a6_8]
                  localStorage.setItem('hour_avg_8', avgArr8)
                  for(var k=0;k<avgArr8.length;k++){
                    if(avgArr8[k]/12 >= 90){
                      DataList[i].NP = "Y"
                    }else if(avgArr8[k]/12 >= 70 && avgArr8[k]/12 < 90){
                      DataList[i].NP = "N"
                    }else if(avgArr8[k]/12 < 70){
                      DataList[i].NP = "N"
                    }
                  }
                }
              }
            }
            this.DataList8.push(DataList[i])
            this.DataList8.sort(function(a,b){
                return a.EFF - b.EFF;
              });      
          }   
        }
      }
      this.Effarr1.push(tempList1);
      if(this.Effarr1.length >12){
        this.Effarr1 = []; 
      }
      localStorage.setItem("avg_1", JSON.stringify(this.Effarr1));

      this.Effarr2.push(tempList2);
      if(this.Effarr2.length >12){
        this.Effarr2 = []; 
      }
      localStorage.setItem("avg_2", JSON.stringify(this.Effarr2));

      this.Effarr3.push(tempList3);
      if(this.Effarr3.length >12){
        this.Effarr3 = []; 
      }
      localStorage.setItem("avg_3", JSON.stringify(this.Effarr3));

      this.Effarr4.push(tempList4);
      if(this.Effarr4.length >12){
        this.Effarr4 = []; 
      }
      localStorage.setItem("avg_4", JSON.stringify(this.Effarr4));

      this.Effarr5.push(tempList5);
      if(this.Effarr5.length >12){
        this.Effarr5 = []; 
      }
      localStorage.setItem("avg_5", JSON.stringify(this.Effarr5));

      this.Effarr6.push(tempList6);
      if(this.Effarr6.length >12){
        this.Effarr6 = []; 
      }
      localStorage.setItem("avg_6", JSON.stringify(this.Effarr6));

      this.Effarr7.push(tempList7);
      if(this.Effarr7.length >12){
        this.Effarr7 = []; 
      }
      localStorage.setItem("avg_7", JSON.stringify(this.Effarr7));

      this.Effarr8.push(tempList8);
      if(this.Effarr8.length >12){
        this.Effarr8 = []; 
      }
      localStorage.setItem("avg_8", JSON.stringify(this.Effarr8));
    },
    selected(){
      if(this.isSel == 'All'){
          return
      }else if(this.isSel == 'Focused'){
        this.$router.push("/focused")
      }
    },
    browremove(){
      var d = new Date();
        if(d.getHours() == 7 && d.getMinutes() > 45){
          localStorage.setItem('BR_D_Line1', null);
          localStorage.setItem('BR_D_Line2', null);
          localStorage.setItem('BR_D_Line3', null);
          localStorage.setItem('BR_D_Line4', null);
          localStorage.setItem('BR_D_Line5', null);
          localStorage.setItem('BR_D_Line6', null);
          localStorage.setItem('BR_D_Line7', null);
          localStorage.setItem('BR_D_Line8', null);
          localStorage.setItem('BR_PD_Line1',null);
          localStorage.setItem('BR_PD_Line2',null);
          localStorage.setItem('BR_PD_Line3',null);
          localStorage.setItem('BR_PD_Line4',null);
        }
    },
    getApi(){
      var e = document.getElementById("getApi");
      this.brachStatus = e.options[e.selectedIndex].value;
      localStorage.setItem('branch', this.brachStatus)
      if(this.brachStatus == "Petch"){        
        this.$router.push("/submachine")
      }
    },
    shuffleArray (array) {
      return array
    },  
    getline1Data () {
      localStorage.setItem('dataList1', JSON.stringify(this.DataList1));
      return this.shuffleArray(this.DataList1.slice(0))

    },
    getline2Data () {
      localStorage.setItem('dataList2', JSON.stringify(this.DataList2));
      return this.shuffleArray(this.DataList2.slice(0))
    },
    getline3Data () {
      localStorage.setItem('dataList3', JSON.stringify(this.DataList3));
      return this.shuffleArray(this.DataList3.slice(0))
    },
    getline4Data () {
      localStorage.setItem('dataList4', JSON.stringify(this.DataList4));
      return this.shuffleArray(this.DataList4.slice(0))
    },
    getline5Data () {
      localStorage.setItem('dataList5', JSON.stringify(this.DataList5));
      return this.shuffleArray(this.DataList5.slice(0))
    },
    getline6Data () {
      localStorage.setItem('dataList6', JSON.stringify(this.DataList6));
      return this.shuffleArray(this.DataList6.slice(0))
    },
    getline7Data () {
      localStorage.setItem('dataList7', JSON.stringify(this.DataList7));
      return this.shuffleArray(this.DataList7.slice(0))
    },
    getline8Data () {
      localStorage.setItem('dataList8', JSON.stringify(this.DataList8));
      return this.shuffleArray(this.DataList8.slice(0))
    }
  }
}
</script>
