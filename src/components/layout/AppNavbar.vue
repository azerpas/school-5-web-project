<template>
    <div id="nav">
        <CHeading as="h1"><router-link to="/"> E<i>i</i>do </router-link></CHeading>
        <CBox display="inline" ml="auto">
            <template v-if="user && user.id">
                <template v-if="user.roles === 'ROLE_BRAND'">
                    <router-link to="/search">Influencers</router-link> |
                </template>
                <template v-else>
                    <router-link to="/search">Brands</router-link> |
                </template>
                <router-link to="/account">My Account</router-link> |
                <button type="button" @click="logout">Logout</button>
            </template>
            <template v-else>
                <router-link to="/">I am an influencer</router-link> |
                <router-link to="/login">Get Started</router-link> | 
                <router-link to="/login">LogIn</router-link>
            </template>
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
        props: {
            user: {
                id: Number, email: String, bio: String, firstname: String, name: String, roles: String
            }
        },
        inject: ['$chakraColorMode', '$toggleColorMode'],
        computed: {
            colorMode () {
                return this.$chakraColorMode()
            }
        },
        methods: {
            logout(){
                this.$emit('logout');
            }
        }
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