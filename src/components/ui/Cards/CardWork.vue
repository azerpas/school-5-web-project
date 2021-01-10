<template>
    <CBox bg="black" textAlign="center" borderRadius="lg" boxShadow="1px 1px 6px 0px">
        <a :href="work.url" target="_blank" rel="noreferrer noopener">
            <CImage :src="work.thumbnail" :alt="work.name+' work screenshot'" maxWidth="30%" mx="auto" my="3" borderRadius="lg"/>
            <CHeading as="h4" fontSize="lg" textAlign="center" color="white" mb="3">{{ work.name }}</CHeading>
        </a>
        <c-icon-button aria-label="Modify work" icon="info" size="sm" variant="ghost" @click="modify()" />
        <c-icon-button aria-label="Delete work" icon="close" size="sm" variant="ghost" @click="remove()" />
    </CBox>
</template>

<script>
import { CBox, CImage, CHeading, CIconButton } from "@chakra-ui/vue";
export default {
    components: { CBox, CImage, CHeading, CIconButton },
    props: {
        work: { thumbnail: String, name: String, url: String, id: Number}
    },
    methods: {
        async remove(){
            this.$emit("deleteAWork" ,this.work.id);
        }
    }
}
</script>