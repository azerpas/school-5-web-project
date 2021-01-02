<template>
    <div id="nav">
        <CHeading as="h1"><router-link to="/"> E<i>i</i>do </router-link></CHeading>
        <CBox display="inline" ml="auto">
            <router-link to="/">I am an influencer</router-link> |
            <router-link to="/login">Get Started</router-link> | 
            <router-link to="/login">LogIn</router-link>
            <CIconButton type="button" @click="$toggleColorMode" :icon="colorMode === 'light' ? 'moon' : 'sun'"></CIconButton>
        </CBox>
    </div>
</template>

<script>
    import { CIconButton, CHeading, CBox } from '@chakra-ui/vue';

    export default {
        components:{
            CIconButton, CHeading, CBox
        },
        inject: ['$chakraColorMode', '$toggleColorMode'],
        computed: {
            colorMode () {
                return this.$chakraColorMode()
            }
        },
    }
</script>

<style scoped>
    #nav h1{
        display: inline;
        padding-left: 0.7rem
    }
    #nav h1 i{
        font-style: initial;
        color: rgb(143, 53, 228);
        vertical-align: unset;
    }
    #nav {
        display: grid;
        grid-template-columns: 1fr 4fr;
        align-items: center;
    }
    #nav *{
        vertical-align: middle;
    }
</style>