<template>
  <div id="linedetail1">
    <h1>Carding Machine-Line Detail</h1>
    <CRow>
      <CCol lg="12">
        <CCard>
          <CCardBody>
            <CRow>
              <CCol sm="3">
                <CInput
                label="Line No."
                type="text"
                placeholder=""  
                value="5"            
                />
              </CCol>
              <CCol sm="3">
                <CInput
                label="Description"
                type="text"
                placeholder=""
                :value="description"             
                />
              </CCol>
              <CCol sm="3">
                <CInput
                label="Target Total"
                type="text"
                placeholder=""
                :value="TotalTarget"
                />
              </CCol>
              <CCol sm="3">
                <CInput
                label="Actual Total"
                type="text"
                placeholder=""
                :value="actualTotal"                        
                />
              </CCol>
            </CRow>       
            <CRow>
              <!-- <CCol sm="6">
                CAP(%)
                <div class="effective">
                  <input
                  type="text"
                  placeholder=""
                  value="90"
                  style="width:50%;border:none;border-radius:4px"
                  v-model="eff"
                   max="89"
                   min="70"
                  />
                   <div class="assign"><b>COLOR:</b><input  id="line5" type="color" v-model="color" @change="colorset()"/></div>
                </div>
              </CCol> -->
              <CCol sm="3">
                <label>Machine Status</label>
                <select class="form-control" v-model="SelMachine" @change="SelStatus()">
                  <option value="all">All</option>
                  <option style="background-color:green;color:white" value="green">90%</option>
                  <option style="background-color:#fca903;color:white" value="yellow">70~90%</option>                  
                  <option style="background-color:red;color:white" value="red">70%</option>
                </select>
              </CCol>
              <CCol sm="3">
                <CInput
                  label="Date"
                  type="text"
                  :value = currentTime              
                />
              </CCol>
            </CRow>
            <div style="display:block">
              AVG EFF % :<input :value=effective style="height:20px;border:none" />
            </div>
            <CRow>
              <CCol sm="12">
                <CProgress
                  :color="progress_color"             
                  class="mb-2"
                  v-model="effective"
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
                <CTableWrapper
                  :items="getShuffledUsersData()"               
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<style scoped>
.assign{
  width: 49.5%;
  display:flex;
}
.effective{
border:1px solid black;margin-top:9px;display:flex;border-radius:4px;height:33px
}
#linedetail1{
  font-size: 16px;
}
#line5{
  width: 100%;
  border-radius:4px;
  margin-top: 3px;
}
input:focus{
    outline: none;
}
</style>
<script>
import CTableWrapper from '../table/Linedetail1.vue'
import { stringTypeAnnotation } from '@babel/types'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
"use strict";

Vue.use(VueAxios, axios)
export default {
  name: 'Tables',
  components: { CTableWrapper },
  data:function() {
    return {
      color: "",
      DataListSel5:[],
      SelMachine:"",
      eff:"",
      effective:0,
      description:"",
      currentTime:"",
      TotalTarget:"",
      actualTotal:"",
      progress:0,
      progress_color:'',
      selected: [], // Must be an array reference!      
      SelectStatus: [
        'Open', 'Pending', 'In Process', 'Completed', 'Cancelled'
      ],
       DataList5:[],
    }
  },
  async created(){
    var time = new Date().toDateString();
    this.currentTime = time
    var response = await Vue.axios.get('http://nyiot.nanyangtextile.com/nyiot/carding_feed/get_card_nyt_sai5.php');
    var DataList = response.data;
    var getTarget = 0
    var getActual = 0
    var getdescription = ""
    var geteffective = 0
    for (var i=0;i<DataList.length;i++) {
          DataList[i]['_classes']="";
          DataList[i]['EFF']="";
          DataList[i]['Actual']="";
          DataList[i]['hour']="";
          DataList[i]['min']="";
          DataList[i]['second']="";
          DataList[i]['totalSec']="";
          DataList[i]['realtime_target']="";
          DataList[i]['NP']="Y"
      if(DataList[i].PD_Line == "5"){   
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
          getActual = getActual + Number((DataList[i].weight_gram/1000).toFixed(2))
          getTarget =getTarget + Number(((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000)).toFixed(0)); 
          getdescription = DataList[i].yarn_type
          geteffective = geteffective + Number(DataList[i].EFF)       
          if(DataList[i].EFF >= 90){
            DataList[i].NP = "Y"
            DataList[i]._classes = "bg-success"           
          }else if(DataList[i].EFF >= 70 && DataList[i].EFF < 90){            
            if(localStorage.getItem('machinecolor5') == '' || localStorage.getItem('machinecolor5') == null){
              DataList[i].NP = "N"
              DataList[i]['_classes'] = "bg-warning"
            }else{
              DataList[i].NP = "N"
              $(function(){
                 var dd =  localStorage.getItem('machinecolor5') 
                  $(".change_color").css("backgroundColor",dd);
               });
              DataList[i]['_classes'] = "change_color"
            }
          }else if(DataList[i].EFF < 70){
              DataList[i].NP = "N"
              DataList[i]._classes = "bg-danger"
          }
          this.DataList5.push(DataList[i])
          this.DataList5.sort(function(a,b){
              return a.EFF - b.EFF;
            });      
        }              
      }
    }
    this.TotalTarget = getTarget.toFixed(2)
    this.actualTotal = getActual.toFixed(2)
    this.description = getdescription
    this.effective = Number(localStorage.getItem('progress_linedetail_line5'))
    if(this.effective > 90){
      this.progress_color = "success"
    }else if(this.effective > 70 && this.effective <= 90){
      this.progress_color = "warning"
    }else if(this.effective <= 70){
      this.progress_color = "danger"
    }
    this.DataListSel5 = this.DataList5
  },
  methods: {
    colorset(){
      localStorage.setItem('machinecolor5', this.color)
      setTimeout(function(){location.reload()}, 2000);
    },
    SelStatus(){
      if(this.SelMachine == "all"){
        this.DataListSel5 = this.DataList5
      }else if(this.SelMachine == "green"){
        var  greendataItem=[];
        var  greendata= [];
        for (var i=0 ; i< this.DataList5.length;i++){
          if(this.DataList5[i]['EFF'] >= 90){
            greendataItem = this.DataList5[i]
            greendata.push(greendataItem)
          }
          
        }
        this.DataListSel5 = greendata
      }else if(this.SelMachine == "yellow"){
        var  yellowdataItem=[];
        var  yellowdata= [];
        for (var i=0 ; i< this.DataList5.length;i++){
          if(this.DataList5[i]['EFF'] >= 70 && this.DataList5[i]['EFF'] < 90){
            yellowdataItem = this.DataList5[i]
            yellowdata.push(yellowdataItem)
          }
        } 
        this.DataListSel5 = yellowdata
      }else if(this.SelMachine == "red"){
        var  reddataItem=[];
        var  reddata= [];
        for (var i=0 ; i< this.DataList5.length;i++){
          if(this.DataList5[i]['EFF'] < 70){
            reddataItem = this.DataList5[i]
            reddata.push(reddataItem)
          }          
        }
        this.DataListSel5 = reddata      }
    },
    shuffleArray (array) {
      return array
    },
    getShuffledUsersData () {
      return this.shuffleArray(this.DataListSel5.slice(0))
    }
  }
}
</script>
