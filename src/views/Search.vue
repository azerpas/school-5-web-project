<template>
  <main>
    <CBox :mx="{base: 2}">
      <template v-if="user.roles === 'ROLE_INFLUENCER'">
        <app-heading-partners @search="search" :keywords="keywords"/>
      </template>
      <template v-else>
        <app-heading-influencers @search="search" :keywords="keywords" :platforms="platforms"/>
      </template>
      <CGrid
          :template-columns="{base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)'}"
          :gap="{base: '5', sm: '3'}"
          mt="3" >
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
import {CBox, CGrid} from "@chakra-ui/vue"
import CardUser from '../components/ui/Cards/CardUser.vue'
import ModalUser from '../components/ui/Modals/ModalUser.vue'

export default {
  components: {AppHeadingInfluencers, AppHeadingPartners, CBox, CGrid, CardUser, ModalUser},
  props: {
    user: {id: null, email: null, bio: null, firstname: null, name: null, roles: null},
    getUsers: Function,
    getUserWorks: Function,
    getPlatforms: Function,
    getKeywords: Function,
    getAllPlatforms:Function,
    getAllKeywords:Function
  },
  data() {
    return {
      users: null,
      focusedUser: null,
      openModal: false,
      keywords: [],
      platforms: [],
    }
  },
  async mounted() {
    const resK = await this.getAllKeywords();
    this.keywords = resK.data;

    if(this.user.roles == "ROLE_BRAND"){
      const resP = await this.getAllPlatforms();
      this.platforms = resP.data;
    }

    const res = await this.getUsers(null, null);
    this.users = res.data;


  },
  methods: {
    async search(platform, category) {
      const res = await this.getUsers(platform, category);
      this.users = res.data;
    },
    async discoverUser(user) {
      this.focusedUser = user;
      const res = await this.getUserWorks(user.id);
      const res_p = await this.getPlatforms(user.id);
      const res_k = await this.getKeywords(user.id);
      this.focusedUser.works = res.data;
      this.focusedUser.platforms = res_p.data.platforms;
      this.focusedUser.keywords = res_k.data.keywords;
      console.log(this.focusedUser)
      this.$refs.discoverModal.isOpen = true;
    }
  }
}
</script>