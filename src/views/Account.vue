<template>
    <main>
        <CGrid 
            :template-columns="{base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)'}" 
            :gap="{base: '5', sm: '3'}"
            mt="3"
        >
            <CardAccount :user="user"/>
            <CBox>
                <CHeading>MY WORK</CHeading>
            </CBox>
        </CGrid>
        
    </main>
</template>

<script>
import CardAccount from "../components/ui/Cards/CardAccount";
import {CBox, CHeading, CGrid} from "@chakra-ui/vue";
export default {
    components: {
        CardAccount,
        CBox, CHeading, CGrid
    },
    computed: {
        getWork(){
            // TODO: Request to get works of user, req.session will fetch his id etc... no need to send it
        }
    }, 
    data(){
        return{
            user: {id: null, email: null, bio: null, firstname: null, name: null, roles: null}
        }
    },
}
</script>