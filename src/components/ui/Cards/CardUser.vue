<template>
    <CBox bg="#7425F3" textAlign="center" borderRadius="lg" boxShadow="1px 1px 6px 0px">
        <template v-if="image">
            <CImage :src="image" :alt="name+' profile picture'" m="auto" width="100%" roundedTop="lg"/>
        </template>
        <template v-else>
            <template v-if="discover">
                <CImage 
                    src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/pleading-face_1f97a.png" 
                    alt="no profile picture, so just an emoji" m="auto" width="100%" roundedTop="lg"/>
            </template>
            <template v-else>
                <CImage 
                    src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/office-building_1f3e2.png" 
                    alt="no profile picture, so just an emoji" m="auto" width="100%" roundedTop="lg"/>
            </template>
        </template>
        <CHeading as="h3" textAlign="center" color="white">{{ name }}</CHeading>
        <span v-for="keyword in keywords" :key="keyword">
            <CText fontSize="xl" color="gray.200">{{ keyword }}</CText>
        </span>
        <c-grid 
            :template-columns="{base: 'repeat(1, 1fr)', sm: discover ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)' }" 
            :gap="{base: '1', md: '3'}"
            mt="3"
            mx="2"
            >
            <CButton my="3" bg="#32057B" color="white">CONTACT</CButton>
            <template v-if="discover">
                <CButton my="3" bg="#5D11D8" color="white">DISCOVER</CButton>
            </template>
        </c-grid>
    </CBox>
</template>

<script>
import { CBox, CImage, CHeading, CText, CButton, CGrid } from "@chakra-ui/vue";
export default {
    components: { CBox, CImage, CHeading, CText, CButton, CGrid },
    data(){
        return {
            keywrds: this.keywords
        } 
    },
    props:{
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
        discover: Boolean
    }
}
</script>