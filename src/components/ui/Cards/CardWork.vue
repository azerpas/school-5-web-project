<template>
    
    <CBox bg="black" textAlign="center" borderRadius="lg" boxShadow="1px 1px 6px 0px">
        <a :href="work.url" target="_blank" rel="noreferrer noopener">
            <CImage :src="work.image" :alt="name+' work screenshot'" maxWidth="30%" mx="auto" my="3" borderRadius="lg"/>
            <CHeading as="h4" fontSize="lg" textAlign="center" color="white" mb="3">{{ work.name }}</CHeading>
        </a>
    </CBox>

</template>

<script>
import { CBox, CImage, CHeading } from "@chakra-ui/vue";
export default {
    components: { CBox, CImage, CHeading },
    props: {
        work: { image: String, name: String, url: String}
    }
}
</script>