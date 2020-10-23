<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm  @submit.prevent="signup">
                <h1>Register</h1>
                <p class="text-muted">Create your account</p>
                <CInput
                  placeholder="Username"
                  autocomplete="username"
                  v-model="username"
                  required
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput
                  placeholder="Email"
                  autocomplete="email"
                  prepend="@"
                  v-model="email"
                  required
                />
                <CInput
                  placeholder="Password"
                  type="password"
                  autocomplete="new-password"
                  v-model="password"
                  required
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CInput
                  placeholder="Repeat password"
                  type="password"
                  autocomplete="new-password"
                  class="mb-4"
                  v-model="repassword"
                  required
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CButton type="submit" color="success" block>Create Account</CButton>
              </CForm>
            </CCardBody>
            <CCardFooter class="p-4">
              <CRow>                
                <CCol col="12">
                  <CButton style="background-color:pink;float:right" @click="tologin">
                    Log In
                  </CButton>
                </CCol>
              </CRow>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'Register',
  data(){
    return{
        username:"",
        email:"",
        password:"",
        repassword:""
    }
  },
   props: {
		url: {
			type: String,
			default: "http://localhost:3000/"
		}
	},
  methods:{
    signup(){
            if(this.password != this.repassword){
                alert('Password does not matched!');
                return false;
            }
            const myinfo = {
                username: this.username,
                email: this.email,
                password: this.password,                
            }
            axios.post(`${this.url}user/store`,{
                myinfo : myinfo
            })
            .then(res => {
              console.log(res.data.message)
              if(res.data.message === "OK"){

                this.$router.push('/jobdetail')
              }else{
                this.$router.push('/register')
              }               
            })
        },
        tologin(){
          this.$router.push('/')
        }
  }
}
</script>
