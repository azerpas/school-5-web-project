<template>
    <div id="app">
        <CBox v-bind="mainStyles[colorMode]" class="app">
            <div id="nav">
                <c-heading as="h1"> Eido </c-heading>
                <CText><router-link to="/">Home</router-link></CText> |
                <CText><router-link to="/about">About</router-link></CText>
                <CIconButton type="button" @click="$toggleColorMode" :icon="colorMode === 'light' ? 'moon' : 'sun'"></CIconButton>
            </div>
            <router-view/>
        </CBox>
    </div>
</template>

<script>
    import { CHeading, CIconButton, CBox, CText } from '@chakra-ui/vue';
    export default {
        components: {
            //CThemeProvider,
            //CReset,
            CHeading,
            CIconButton, 
            CBox,
            CText
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
