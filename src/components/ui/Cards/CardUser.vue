<template>
    <CBox bg="#7425F3" textAlign="center" borderRadius="lg" boxShadow="1px 1px 6px 0px">
        <CImage :src="image" :alt="name+' profile picture'" m="auto" width="100%" roundedTop="lg"/>
        <CHeading as="h3" textAlign="center" color="white">{{ name }}</CHeading>
        <span v-for="keyword in keywords" :key="keyword">
            <CText fontSize="xl" color="gray.200">{{ keyword }}</CText>
        </span>
        <CButton width="80%" my="3" bg="#32057B" color="white">CONTACT</CButton>
    </CBox>
</template>

<script>
import { CBox, CImage, CHeading, CText, CButton } from "@chakra-ui/vue";
export default {
    components: { CBox, CImage, CHeading, CText, CButton },
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
        }
    }
}
</script>