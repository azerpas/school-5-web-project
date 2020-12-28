<template>
    <div id="app">
        
            <div id="nav">
                <c-heading as="h1"> Eido </c-heading>
                <h1>{{colorMode}}</h1>
                <router-link to="/">Home</router-link> |
                <router-link to="/about">About</router-link>
            </div>
            
            <router-view/>
        
    </div>
</template>

<script>
    import { CHeading } from '@chakra-ui/vue';
    export default {
        components: {
            //CThemeProvider,
            //CReset,
            CHeading
        },
        inject: ['$chakraColorMode', '$toggleColorMode'],
        computed: {
            colorMode () {
                return this.$chakraColorMode()
            }
        },
    }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
