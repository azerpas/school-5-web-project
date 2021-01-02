<template>
    <div id="nav">
        <CHeading as="h1"> Eido </CHeading>
        <router-link to="/">I am an influencer</router-link> |
        <router-link to="/login">Get Started</router-link> | 
        <router-link to="/login">LogIn</router-link>
        <CIconButton type="button" @click="$toggleColorMode" :icon="colorMode === 'light' ? 'moon' : 'sun'"></CIconButton>
    </div>
</template>

<script>
    import { CIconButton, CHeading } from '@chakra-ui/vue';

    export default {
        components:{
            CIconButton, CHeading
        }
    }
</script>