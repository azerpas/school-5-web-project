<template>
    <div id="app">
        <CBox v-bind="mainStyles[colorMode]" class="app">
            <AppNavbar/>
            <router-view
                @login="login"
            />
        </CBox>
    </div>
</template>

<script>
    import './assets/css/main.css'
    import { CBox } from '@chakra-ui/vue';
    import AppNavbar from "./components/layout/AppNavbar";
    import axios from 'axios';
    require('dotenv').config()
    export default {
        components: {
            CBox,
            AppNavbar
        },
        inject: ['$chakraColorMode', '$toggleColorMode'],
        computed: {
            colorMode () {
                return this.$chakraColorMode()
            }
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
                const res = await axios.post(`http://${process.env.VUE_APP_API_URL}/api/login`, {username, password});
                console.log(res);
                if(res.status === 200){
                    this.user = res.data;
                }
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
