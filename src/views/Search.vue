<template>
    <main>
        <CBox :mx="{base: 2}">
            <template v-if="user.roles === 'ROLE_INFLUENCER'">
                <app-heading-partners @search="search"/>
            </template>
            <template v-else>
                <app-heading-influencers @search="search"/>
            </template>
            <CGrid 
                    :template-columns="{base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)'}" 
                    :gap="{base: '5', sm: '3'}"
                    mt="3"
                >
                <template v-for="u in users">
                    <card-user :user="u" :key="u.id" @discoverUser="discoverUser"/>
                </template>
            </CGrid>
            <modal-user :user="focusedUser" :opened="openModal" ref="discoverModal"/>
        </CBox>
    </main>
</template>

<script>
import AppHeadingInfluencers from '../components/layout/influencers/AppHeading.vue'
import AppHeadingPartners from '../components/layout/partners/AppHeading.vue'
import { CBox, CGrid } from "@chakra-ui/vue"
import CardUser from '../components/ui/Cards/CardUser.vue'
import ModalUser from '../components/ui/Modals/ModalUser.vue'

export default {
  components: { AppHeadingInfluencers, AppHeadingPartners, CBox, CGrid, CardUser, ModalUser },
    props:{
        user: {id: null, email: null, bio: null, firstname: null, name: null, roles: null},
        getUsers: Function,
        getUserWorks: Function,
        getPlatforms: Function
    },
    data(){
        return{
            users: null,
            focusedUser: null,
            openModal: false
        }
    },
    async mounted(){
        const res = await this.getUsers(null,null);
        this.users = res.data;
    },
    methods: {
        async search(platform, category){
            const res = await this.getUsers(platform, category);
            this.users = res.data;
        },
        async discoverUser(user){
            this.focusedUser = user;
            const res = await this.getUserWorks(user.id);
            const res_p = await this.getPlatforms(user.id);
            this.focusedUser.works = res.data;
            this.focusedUser.platforms = res_p.data.platforms;
            this.$refs.discoverModal.isOpen = true;
        }
    }
}
</script>