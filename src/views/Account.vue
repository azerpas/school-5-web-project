<template>
    <main>
        <CGrid 
            :template-columns="{base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)'}" 
            :gap="{base: '5', sm: '3'}"
            mt="3"
        >
            <CardAccount :user="user" :modifyUser="modifyUser" 
                :getPlatforms="getPlatforms" :addPlatform="addPlatform" :removePlatform="removePlatform"
                :getKeywords="getKeywords"
                :addKeyword="addKeyword"
                :removeKeyword="removeKeyword"
            />
            <template v-if="user.roles === 'ROLE_INFLUENCER'">
                <CBox>
                    <CHeading fontWeight="900">MY WORK ⬇️</CHeading>
                    <CGrid 
                        :template-columns="{base: 'repeat(1, 1fr)'}" 
                        :gap="{base: '5', sm: '3'}"
                        mt="1"
                    >   
                        <template v-for="work in works">
                            <card-work 
                                :work="work" :key="work.id" :id="'work-'+work.id" 
                                @deleteAWork="deleteAWork"
                                />
                        </template>
                        <template v-if="works">
                            <template v-if="works.length < 3">
                                <ModalWork :addWork="addWork" @addCard="addCard" :modifying="false"/>
                            </template>
                        </template>
                    </CGrid>
                </CBox>
            </template>
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
    watch:{
        user:{
            handler(newValue){
                if(!newValue.id) window.location.href="/";
            },
            deep: true,
            immediate: true
        }
    },
    async mounted(){
        const res = await this.getWorks();
        this.works = res.data;
    },
    props:{
        user: {id: null, email: null, bio: null, firstname: null, name: null, roles: null, url: null},
        getWorks: Function,
        deleteWork: Function, 
        addWork: Function,
        modifyWork: Function,
        modifyUser: Function,
        getPlatforms: Function,
        addPlatform: Function,
        removePlatform: Function,
        getKeywords: Function,
        addKeyword: Function,
        removeKeyword: Function
    },
    methods: {
        async deleteAWork(id){
            const res = await this.deleteWork(id);
            if(res.status === 200){
                document.querySelector(`#work-${id}`).remove();
            }
        },
        async addCard(work){
            this.works.push(work);
        }
    }
}
</script>