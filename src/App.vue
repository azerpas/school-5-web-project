<template>
    <div id="app">
        <CThemeProvider>
            <ColorModeProvider>
                <CReset />
                <img alt="Vue logo" src="./assets/logo.png">
                <HelloWorld msg="Welcome to Your Vue.js App"/>
            </ColorModeProvider>
        </CThemeProvider>
    </div>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue';
    import { CThemeProvider, CReset, ColorModeProvider } from '@chakra-ui/vue';

    export default {
        name: 'App',
        components: {
            HelloWorld,
            CThemeProvider,
            CReset,
            ColorModeProvider
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
