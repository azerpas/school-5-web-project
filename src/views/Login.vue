<template>
    <div class="login">
        <CFlex align="center" justify="center">
            <form>
                <CStack spacing="5">
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
                    <CButton variantColor="indigo" :click="()=>{}" width="100%">Login</CButton>
                </CStack>
            </form>
        </CFlex>
    </div>
</template>

<script>
import { CFlex, CStack, CInput, CInputGroup, CInputLeftElement, CIcon, CFormControl, CFormLabel, CButton } from "@chakra-ui/vue"
export default {
    components:{
        CFlex, CStack, CInput, CInputGroup, CInputLeftElement, CIcon, CFormControl, CFormLabel, CButton
    },
    data (){
        return {
            username: "",
            password: ""
        }
    }
}
</script>

<style>

</style>