<template>
    <main>
        <CGrid 
            :template-columns="{base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)'}" 
            :gap="{base: '5', sm: '3'}"
            mt="3"
        >
            <CardAccount :user="user"/>
            <CBox>
                <CHeading fontWeight="900">MY WORK ⬇️</CHeading>
                <CGrid 
                    :template-columns="{base: 'repeat(1, 1fr)'}" 
                    :gap="{base: '5', sm: '3'}"
                    mt="1"
                >
                    <CardWork :work="{image: 'https://i.ytimg.com/vi/hxp07UVZs7o/hq720.jpg', name: 'On appelle des gens au hasard avec Pierre Niney'}"/>
                    <!-- TODO: condition if work < 3 -->
                    <CButton><CIcon name="add"/></CButton>
                </CGrid>
            </CBox>
        </CGrid>
        
    </main>
</template>

<script>
import CardAccount from "../components/ui/Cards/CardAccount";
import {CBox, CHeading, CGrid, CButton, CIcon} from "@chakra-ui/vue";
import CardWork from '../components/ui/Cards/CardWork.vue';
export default {
    components: {
        CardAccount, CardWork,
        CBox, CHeading, CGrid, CButton, CIcon
    },
    computed: {
        getWork(){
            return 1;
            // TODO: Request to get works of user, req.session will fetch his id etc... no need to send it
        }
    }, 
    props:{
        user: {id: null, email: null, bio: null, firstname: null, name: null, roles: null}
    }
}
</script>