<template>
    <div id="app">
        <CBox v-bind="mainStyles[colorMode]" class="app">
            <AppNavbar :user="user" @logout="logout"/>
            <router-view
                :user="user"
                :login="login"
                :register="register"
                :addWork="addWork"
                :modifyWork="modifyWork"
                :getWorks="getWorks"
                :deleteWork="deleteWork"
                :getOffer="getOffer"
                :getUser="getUser"
                :createProposal="createProposal"
                :getUsers="getUsers"
                :modifyUser="modifyUser"
                :getUserWorks="getUserWorks"
                :getPlatforms="getPlatforms"
                :addPlatform="addPlatform"
                :removePlatform="removePlatform"
                :getKeywords="getKeywords"
                :addKeyword="addKeyword"
                :removeKeyword="removeKeyword"
                :getAllPlatforms="getAllPlatforms"
                :getAllKeywords="getAllKeywords"
                :getProposals="getProposals"
            />
        </CBox>
    </div>
</template>

<script>
import './assets/css/main.css'
import {CBox} from '@chakra-ui/vue';
import AppNavbar from "./components/layout/AppNavbar";
import axios from 'axios';
import * as ROUTES from "./constants/index";
import router from "@/router";

require('dotenv').config()
    export default {
        components: {
            CBox,
            AppNavbar
        },
        inject: ['$chakraColorMode', '$toggleColorMode'],
      /*
      async mounted(){
          const user = await axios.get(`http://${process.env.VUE_APP_API_URL}/api/user`, { withCredentials: true })
          if(user.status === 200) this.user = user.data;
          else this.user = null;
      },
      */
      async beforeCreate(){
        const user = await axios.get(`http://${process.env.VUE_APP_API_URL}/api/user`, { withCredentials: true })
        if(user.status === 200) this.user = user.data;
        else this.user = null;
      },
        computed: {
            colorMode () {
                return this.$chakraColorMode()
            },
            theme() {
                return this.$chakraTheme();
            },
        },
        data(){
            return{
                mainStyles: {
                    dark: {
                        bg: "gray.700",
                        color: "whiteAlpha.900"
                    },
                    light: {
                        bg: "white",
                        color: "gray.900"
                    }
                },
                user: {id: null, email: null, bio: null, firstname: null, name: null, roles: null}
            }
        },
        methods:{
            async login(username,password){
                  try{
                    const res = await axios.post(`http://${process.env.VUE_APP_API_URL}/api/login`, {username, password}, { withCredentials: true });
                    if(res.status === 200){
                      this.user = res.data;
                      if(this.user.roles === "ROLE_BRAND") window.location.href = ROUTES.SEARCH;
                      if(this.user.roles === "ROLE_INFLUENCER") window.location.href = ROUTES.SEARCH;
                    }
                  }catch(error){
                    return {message:"bad"}
                  }
            },
            async logout(){
                const res = await axios.get(`http://${process.env.VUE_APP_API_URL}/api/logout`, { withCredentials: true });
                if(res.status === 200){
                    this.user = null;
                    window.location.href="/";
                }
                return res;
            },
            async register(email, username, password, role){
                const res = await axios.post(`http://${process.env.VUE_APP_API_URL}/api/user`, {email, username, password, role}, { withCredentials: true });
                if(res.status === 200){
                    this.user = res.data;
                }
                return res;
            },
            async addWork(thumbnail, url, title){
                let formData = new FormData();
                formData.append('file', thumbnail); formData.append('url', url); formData.append('title', title);
                const res = await axios.post(`http://${process.env.VUE_APP_API_URL}/api/work`, formData, {
                    headers: { 'Accept': 'application/json', 'Content-Type': 'multipart/form-data' }, withCredentials: true
                });
                return res;
            },
            async getWorks(){
                return await axios.get(`http://${process.env.VUE_APP_API_URL}/api/work`, { withCredentials: true });
            },
            async deleteWork(id){
                return await axios.delete(`http://${process.env.VUE_APP_API_URL}/api/work/${id}`, { withCredentials: true })
            },
            async modifyWork(id, url, title){
                return await axios.put(`http://${process.env.VUE_APP_API_URL}/api/work/${id}`, {url, name: title}, { withCredentials: true });
            },
            async getOffer(userId){
              return await axios.get(`http://${process.env.VUE_APP_API_URL}/api/offer?userId=${userId}`, { withCredentials: true })
            },
            async getUser(id){
              return await axios.get(`http://${process.env.VUE_APP_API_URL}/api/user/${id}`, { withCredentials: true })
            },
            async createProposal(userId,offer,description,expiration_date) {
              const res = await axios.post(`http://${process.env.VUE_APP_API_URL}/api/proposal/`, {
                userId: userId,
                offer: offer,
                description: description,
                expiration_date: expiration_date
              }, {withCredentials: true})
              if (res.status == 200) {
                await router.push({name: "Valid"});
              }
            },
            async getProposals(){
                return await axios.get(`http://${process.env.VUE_APP_API_URL}/api/proposal/`, {withCredentials: true})
            },
            async getUsers(platform, category){
                return await axios.get(`http://${process.env.VUE_APP_API_URL}/api/search${platform || category ? '?' : ''}${platform && platform !== 'all' ? '&platform='+platform : ''}${category && category !== 'all' ? '&category='+category : ''}`, { withCredentials: true });
            },
            async modifyUser(file, username, bio){
                let formData = new FormData();
                if(file) formData.append('file', file);
                if(bio) formData.append('bio', bio);
                if(username) formData.append('name', username);
                const res = await axios.put(`http://${process.env.VUE_APP_API_URL}/api/user`, formData, {
                    headers: { 'Accept': 'application/json', 'Content-Type': 'multipart/form-data' }, withCredentials: true
                });
                return res;
            },
            async getUserWorks(id){
                return await axios.get(`http://${process.env.VUE_APP_API_URL}/api/user/${id}/work`, { withCredentials: true })
            },
            async getPlatforms(id){
                return await axios.get(`http://${process.env.VUE_APP_API_URL}/api/platform${id && id !== '' ? '?userId='+id : ''}`, { withCredentials: true })
            },
            async addPlatform(platform){
                return await axios.put(`http://${process.env.VUE_APP_API_URL}/api/user/platform`, {platform}, { withCredentials: true })
            },
            async removePlatform(id){
                return await axios.delete(`http://${process.env.VUE_APP_API_URL}/api/user/platform/${id}`, { withCredentials: true })
            },
            async getKeywords(id){
                return await axios.get(`http://${process.env.VUE_APP_API_URL}/api/user/keywords${id && id !== '' ? '?userId='+id : ''}`, { withCredentials: true })
            },
            async addKeyword(id){
                return await axios.put(`http://${process.env.VUE_APP_API_URL}/api/user/keywords`, {id}, { withCredentials: true })
            },
            async removeKeyword(id){
                return await axios.delete(`http://${process.env.VUE_APP_API_URL}/api/user/keywords/${id}`, { withCredentials: true })
            },
            async getAllPlatforms() {
                var res = await axios.get(`http://${process.env.VUE_APP_API_URL}/api/platform`, {withCredentials: true});
                res.data = res.data.platforms.related.concat(res.data.platforms.unrelated);
                return res;
            },
            async getAllKeywords() {
                var res = await axios.get(`http://${process.env.VUE_APP_API_URL}/api/user/keywords`, {withCredentials: true});
                res.data = res.data.keywords.related.concat(res.data.keywords.unrelated);
                return res;
            }
        }
    }
</script>

<style>
#app, .app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
