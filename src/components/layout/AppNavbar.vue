<template>
    <div id="nav">
        <CGrid
            :template-columns="{base: 'repeat(1, 1fr)', sm: '1fr 4fr'}" 
            :gap="{base: '5', sm: '3'}"
        >
            <CHeading as="h1"><router-link to="/"> E<i>i</i>do </router-link></CHeading>
            <CBox display="inline" ml="auto" :mr="{base: 'auto', sm: 'initial'}" p="0.5rem" class="links">
                <template v-if="user && user.id">
                    <template v-if="user.roles === 'ROLE_BRAND'">
                        <router-link to="/search">Influencers</router-link> 
                    </template>
                    <template v-else>
                        <router-link to="/search">Brands</router-link> 
                    </template>
                    <router-link to="/account">My Account</router-link> 
                    <button type="button" @click="logout">Logout</button>
                </template>
                <template v-else>
                    <router-link to="/register">Get Started</router-link>  
                    <router-link to="/login">Log In</router-link>
                </template>
                <CIconButton type="button" @click="$toggleColorMode" :icon="colorMode === 'light' ? 'moon' : 'sun'" size="xs" ml="2"></CIconButton>
            </CBox>
        </CGrid>
    </div>
</template>

<script>
    import { CIconButton, CHeading, CBox, CGrid } from '@chakra-ui/vue';

    export default {
        components:{
            CIconButton, CHeading, CBox, CGrid
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
        padding-left: 0.7rem;
        vertical-align: baseline;
    }
    #nav h1 i{
        font-style: initial;
        color: rgb(143, 53, 228);
        vertical-align: unset;
    }
    #nav *{
        vertical-align: middle;
    }
    .links a, .links button{
        margin-left: 0.4rem;
    }
</style>