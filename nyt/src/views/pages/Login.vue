<template>

  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm  @submit.prevent="login">
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <CInput
                    placeholder="Username"
                    autocomplete="username email"
                    v-model="user.username"
                    required
                  >
                    <template #prepend-content><CIcon name="cil-user"/></template>
                  </CInput>
                  <CInput
                    placeholder="Password"
                    type="password"
                    autocomplete="curent-password"
                    v-model="user.password"
                    required
                  >
                    <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton type="submit" color="primary" class="px-4">Login</CButton>
                    </CCol>
                    <CCol col="6" class="text-right">
                      <CButton color="link" class="px-0">Forgot password?</CButton>
                      <CButton color="link" class="d-lg-none">Register now!</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <h2>Sign up</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <CButton
                  color="light"
                  variant="outline"
                  size="lg"
                  @click="register"
                >
                  Register Now!
                </CButton>
              </CCardBody>
              
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Login',
  props:{
    apiUrl:{
      type:String,
      default: "http://localhost:3000/"
    }
  },
  data(){
    return {
            user:{
                username: "",
                password: ""
            },
            isalert:false,
            error: '',
            isLogin: localStorage.getItem("isLogin")
        }
  },
  methods:{
    login(){
       axios.post(`${this.apiUrl}auth`, this.user)
        .then(res => {
            console.log(res.data)
            if (res.status =="200") {
                // localStorage.setItem("user", JSON.stringify(res.data));
                // localStorage.setItem("isLogin", "true");
                this.$router.push("/machine");
                // alert(res.data.);
               
            } else {
                this.$router.go();
            }
        })
        .catch(err => console.log(err));
    },
    register(){
      this.$router.push("/register");
    }
  }
}
</script>
