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
                    <CardWork :work="{
                        image: 'https://i.ytimg.com/vi/hxp07UVZs7o/hq720.jpg', 
                        name: 'On appelle des gens au hasard avec Pierre Niney',
                        url: 'https://www.youtube.com/watch?v=hxp07UVZs7o'
                        }"/>
                    <!-- TODO: condition if work < 3 -->
                    <ModalWork @addWork="addWork"/>
                </CGrid>
            </CBox>
        </CGrid>
        
    </main>
</template>

<script>
import CardAccount from "../components/ui/Cards/CardAccount";
import {CBox, CHeading, CGrid} from "@chakra-ui/vue";
import CardWork from '../components/ui/Cards/CardWork.vue';
import ModalWork from '../components/ui/Modals/ModalWork.vue';
export default {
    components: {
        CardAccount, CardWork, ModalWork,
        CBox, CHeading, CGrid
    },
    computed: {
        getWork(){
            return 1;
            // TODO: Request to get works of user, req.session will fetch his id etc... no need to send it
        }
    }, 
    props:{
        user: {id: null, email: null, bio: null, firstname: null, name: null, roles: null}
    },
    methods: {
        async addWork(thumbnail, url, title){
            console.log("SUBMITTED")
            this.$emit('addWork', thumbnail, url, title);
        }
    }
}
</script>