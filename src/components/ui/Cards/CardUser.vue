<template>
    <CBox bg="#7425F3" textAlign="center" borderRadius="lg" boxShadow="1px 1px 6px 0px">
        <template v-if="user.url">
            <CImage :src="user.url" :alt="user.name+' profile picture'" m="auto" width="100%" roundedTop="lg" class="profile-picture"/>
        </template>
        <template v-else>
            <template v-if="user.roles !== 'ROLE_BRAND'">
                <CImage 
                    src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/pleading-face_1f97a.png" 
                    alt="no profile picture, so just an emoji" m="auto" width="100%" roundedTop="lg" class="profile-picture"/>
            </template>
            <template v-else>
                <CImage 
                    src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/office-building_1f3e2.png" 
                    alt="no profile picture, so just an emoji" m="auto" width="100%" roundedTop="lg" class="profile-picture"/>
            </template>
        </template>
        <CHeading as="h3" textAlign="center" color="white">{{ user.name }}</CHeading>
        <!--
        <span v-for="keyword in keywords" :key="keyword">
            <CText fontSize="xl" color="gray.200">{{ keyword }}</CText>
        </span>
        -->
        <c-grid 
            :template-columns="{base: 'repeat(1, 1fr)', sm: user.roles !== 'ROLE_BRAND' ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)' }" 
            :gap="{base: '1', md: '3'}"
            mt="3"
            mx="2"
            >
            <CButton my="3" bg="#32057B" color="white">CONTACT</CButton>
            <template v-if="user.roles !== 'ROLE_BRAND'">
                <CButton my="3" bg="#5D11D8" color="white" @click="discover()">DISCOVER</CButton>
            </template>
        </c-grid>
    </CBox>
</template>

<script>
import { CBox, CImage, CHeading, /*CText,*/ CButton, CGrid } from "@chakra-ui/vue";
export default {
    components: { CBox, CImage, CHeading, /*CText,*/ CButton, CGrid },
    data(){
        return {
            keywrds: this.keywords
        } 
    },
    props:{
        user: {id: null, email: null, bio: null, firstname: null, name: null, roles: null, url: null},
        /*
        name: {
            type: String,
            default: "World Of Tanks"
        },
        keywords: {
            type: Array,
            default: () => ["Gaming", "Tech"]
        },
        image: {
            type: String,
            default: "https://upload.wikimedia.org/wikipedia/fr/e/e2/World_of_Tanks_Logo.png"
        },
        */
    },
    methods: {
        discover(){
            this.$emit('discoverUser', this.user)
        }
    }
}
</script>

<style scoped>
.profile-picture{
    max-height: 20vh;
    object-fit: cover;
}
</style>