<template>
  <div>
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
                value="1"            
                />
              </CCol>
              <CCol sm="3">
                <CInput
                label="Description"
                type="text"
                placeholder=""
                value="Cotton-S1"             
                />
              </CCol>
              <CCol sm="3">
                <CInput
                label="Target Total"
                type="text"
                placeholder=""
                value="5400"             
                />
              </CCol>
              <CCol sm="3">
                <CInput
                label="Actual Total"
                type="text"
                placeholder=""
                v-model="actual"                        
                />
              </CCol>
            </CRow>       
            <CRow>
              <CCol sm="6">
                <CInput
                label="Effective Capacity"
                type="text"
                placeholder=""
                value="90%"  
                />
              </CCol>
              <CCol sm="3">
                <label>Machine Status</label>
                <select class="form-control">
                  <option>Choose...</option>
                  <option value="Open">Open</option>
                  <option style="background-color:#fca903;color:white" value="Pending">Pending</option>
                  <option style="background-color:#3474eb;color:white" value="Progress">In Progress</option>
                  <option style="background-color:green;color:white" value="Completed">Completed</option>
                  <option style="background-color:red;color:white" value="Cancelled">Cancelled</option>
                </select>
                <!-- <CSelect
                  label="Machine Status"
                  placeholder="Choose.."
                  :options="SelectStatus"
                /> -->
              </CCol>
              <CCol sm="3">
                <CInput
                  label="Date"
                  type="date"                   
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CProgress
                  :value="70"
                  color="success"
                  class="mb-2"
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
                  caption="Line No:1 Cotton-S1"
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import CTableWrapper from './table/Line.vue'
import usersData from '../users/UsersData'
export default {
  name: 'Tables',
  components: { CTableWrapper },
  data () {
    return {
      actual:23,
      selected: [], // Must be an array reference!      
      SelectStatus: [
        'Open', 'Pending', 'In Process', 'Completed', 'Cancelled'
      ]
    }
  },  
  methods: {
    shuffleArray (array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
      return array
    },

    getShuffledUsersData () {
      return this.shuffleArray(usersData.slice(0))
    }
  }
}
</script>
