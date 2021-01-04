<template>
    <CBox bg="indigo">
        <CImage :src="image" :alt="name+' profile picture'"/>
        <CHeading as="h3" textAlign="center">{{ name }}</CHeading>
        <span v-for="keyword in keywords" :key="keyword">
            <CText>{{ keyword }}</CText>
        </span>
    </CBox>
</template>

<script>
import { CBox, CImage, CHeading } from "@chakra-ui/vue";
export default {
    components: { CBox, CImage, CHeading },
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
            default: ["Gaming", "Tech"]
        },
        image: {
            type: String,
            default: "https://upload.wikimedia.org/wikipedia/fr/e/e2/World_of_Tanks_Logo.png"
        }
    }
}
</script>