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
                    <template v-for="work in works">
                        <card-work :work="work" :key="work.id"/>
                    </template>
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
    data(){
        return{
            works: null
        }
    },
    async mounted(){
        const res = await this.getWorks();
        this.works = res.data;
    },
    props:{
        user: {id: null, email: null, bio: null, firstname: null, name: null, roles: null},
        getWorks: Function
    },
    methods: {
        async addWork(thumbnail, url, title){
            console.log("SUBMITTED")
            this.$emit('addWork', thumbnail, url, title);
        }
    }
}
</script>