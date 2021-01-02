<template>
    <div id="app">
        <CBox v-bind="mainStyles[colorMode]" class="app">
            <AppNavbar/>
            <router-view/>
        </CBox>
    </div>
</template>

<script>
    import './assets/css/main.css'
    import { CBox } from '@chakra-ui/vue';
    import AppNavbar from "./components/layout/AppNavbar";
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
