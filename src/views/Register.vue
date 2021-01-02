<template>
    <main>
        <div class="register">
            <CFlex align="center" justify="center">
                <form class="form-auth">
                    <CStack spacing="5">
                        <CHeading class="form-head">REGISTER</CHeading>
                        <CFormControl is-required>
                            <CFormLabel for="username">Email</CFormLabel>
                            <CInputGroup>
                                <CInputLeftElement><CIcon name="email" color="gray"/></CInputLeftElement>
                                <CInput v-model="username" type="email" placeholder="youremail@gmail.com" id="username"/>
                            </CInputGroup>
                        </CFormControl>
                        <CFormControl is-required>
                            <CFormLabel for="password">Password</CFormLabel>
                            <CInput v-model="password" type="password" id="password"/>
                        </CFormControl>
                        <CFormControl is-required>
                            <CFormLabel for="rpassword">Repeat password</CFormLabel>
                            <CInput v-model="repeatPassword" type="password" id="rpassword"/>
                        </CFormControl>
                        <CFormControl is-required>
                            <CFormLabel for="category">Category</CFormLabel>
                            <c-select v-model="category" placeholder="Choose your category" id="category">
                                <option value="influencer">Influencer</option>
                                <option value="business">Business</option>
                            </c-select>
                        </CFormControl>
                        <CButton variantColor="indigo" :click="()=>{}" width="100%">Login</CButton>
                        <p>Are you already registered? <router-link to="/login">Log In here!</router-link></p>
                    </CStack>
                </form>
            </CFlex>
        </div>
    </main>
</template>

<script>
import '../assets/css/auth.css';
import { CFlex, CStack, CInput, CInputGroup, CInputLeftElement, CIcon, CFormControl, CFormLabel, CButton, CHeading, CSelect } from "@chakra-ui/vue"
export default {
    components:{
        CFlex, CStack, CInput, CInputGroup, CInputLeftElement, CIcon, CFormControl, CFormLabel, CButton, CHeading, CSelect
    },
    data (){
        return {
            username: "",
            password: "",
            repeatPassword: "",
            category: this.type
        }
    },
    props:{
        type: {
            type: String,
            default: "Influencer"
        }
    }
}
</script>

<style>

</style>