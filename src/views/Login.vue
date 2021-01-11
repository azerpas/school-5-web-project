<template>
    <main>
        <div class="login">
            <CFlex align="center" justify="center">
                <form class="form-auth" @submit="loginVue($event)">
                    <CStack spacing="5">
                        <CHeading class="form-head">LOG IN</CHeading>
                        <CFormControl is-required>
                            <CFormLabel for="username">Email</CFormLabel>
                            <CInputGroup>
                                <CInputLeftElement>
                                <CIcon name="email" color="gray"/>
                                </CInputLeftElement>
                                <CInput v-model="username" type="email" placeholder="youremail@gmail.com" id="username" @change="setBad(false)"/>
                            </CInputGroup>
                        </CFormControl>
                        <CFormControl is-required>
                            <CFormLabel for="password">Password</CFormLabel>
                            <CInput v-model="password" type="password" id="password" @change="setBad(false)"/>
                        </CFormControl>
                        <c-text color="#C42231" fontWeight="bold" align="center" v-bind:display="(bad ? 'block' : 'none')">Wrong email or password</c-text>
                        <c-button variantColor="indigo" variant="solid" type="submit" width="100%">Login</c-button>
                        <p>Don't have an account yet?
                            <router-link to="/register">Register here!</router-link>
                        </p>
                    </CStack>
                </form>
            </CFlex>
        </div>
    </main>
</template>

<script>
import '../assets/css/auth.css';
import {CFlex, CStack, CText, CInput, CInputGroup, CInputLeftElement, CIcon, CFormControl, CFormLabel, CButton, CHeading} from "@chakra-ui/vue"

export default {
    components: {
        CFlex, CStack,CText, CInput, CInputGroup, CInputLeftElement, CIcon, CFormControl, CFormLabel, CButton, CHeading
    },
    props: {
        login: Function
    },
    data() {
        return {
            username: "",
            password: "",
            bad:false
        }
    },
    methods: {
        async loginVue(event) {
            event.preventDefault();
            const res = await this.login(this.username, this.password);
            if(res.message == "bad"){
                this.password=""
                this.bad = true;
            }
            console.log(res)
        },
        setBad(bool){
            this.bad = bool;
        }
    }
}
</script>

<style>

</style>