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
                    <card-user :name="u.name" :image="u.url" :key="u.id" :discover="user.roles === 'ROLE_BRAND'"/>
                </template>
            </CGrid>
        </CBox>
    </main>
</template>

<script>
import AppHeadingPartners from '../components/layout/influencers/AppHeading.vue'
import AppHeadingInfluencers from '../components/layout/partners/AppHeading.vue'
import { CBox, CGrid } from "@chakra-ui/vue"
import CardUser from '../components/ui/Cards/CardUser.vue'

export default {
  components: { AppHeadingInfluencers, AppHeadingPartners, CBox, CGrid, CardUser },
    props:{
        user: {id: null, email: null, bio: null, firstname: null, name: null, roles: null},
        getUsers: Function
    },
    data(){
        return{
            users: null,
            focusedUser: null
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
        }
    }
}
</script>