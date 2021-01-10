<template>
    <main>
        <div class="register">
            <CFlex align="center" justify="center">
                <form class="form-auth" @submit="submit($event)">
                    <CStack spacing="5">
                        <CHeading class="form-head">REGISTER</CHeading>
                        <CFormControl is-required>
                            <CFormLabel for="email">Email</CFormLabel>
                            <CInputGroup>
                                <CInputLeftElement><CIcon name="email" color="gray"/></CInputLeftElement>
                                <CInput v-model="email" type="email" placeholder="youremail@gmail.com" id="email"/>
                            </CInputGroup>
                        </CFormControl>
                        <CFormControl is-required>
                            <CFormLabel for="username">Username</CFormLabel>
                            <CInputGroup>
                                <CInputLeftElement><CIcon name="star" color="gray"/></CInputLeftElement>
                                <CInput v-model="username" type="text" id="username"/>
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
                                <option value="ROLE_INFLUENCER">Influencer</option>
                                <option value="ROLE_BRAND">Business</option>
                            </c-select>
                        </CFormControl>
                        <CButton variantColor="indigo" type="submit" width="100%">Login</CButton>
                        <p>Are you already registered? <router-link to="/login">Log In here!</router-link></p>
                    </CStack>
                </form>
            </CFlex>
        </div>
    </main>
</template>

<script>
import '../assets/css/auth.css';
import { CFlex, CStack, CInput, CInputGroup, CInputLeftElement, CIcon, CFormControl, CFormLabel, CButton, CHeading, CSelect } from "@chakra-ui/vue";
import * as ROUTES from "../constants/index";
export default {
    components:{
        CFlex, CStack, CInput, CInputGroup, CInputLeftElement, CIcon, CFormControl, CFormLabel, CButton, CHeading, CSelect
    },
    data (){
        return {
            email: "",
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
        },
        register: Function
    },
    methods: {
        async submit(event){
            event.preventDefault();
            if(this.password !== this.repeatPassword){
                alert("Passwords doesn't match");
                return;
            }
            const res = await this.register(this.email, this.username, this.password, this.category);
            if(res.status === 200){
                if(res.data.roles === "ROLE_BRAND") window.location.href = ROUTES.SEARCH;
                if(res.data.roles === "ROLE_INFLUENCER") window.location.href = ROUTES.SEARCH;
            }
            
        }
    }
}
</script>

<style>

</style>