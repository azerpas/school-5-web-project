<template>
    <CBox bg="#7425F3" textAlign="center" borderRadius="lg" boxShadow="1px 1px 6px 0px">
        <CImage :src="image" :alt="name+' profile picture'" m="auto" width="100%" roundedTop="lg"/>
        <CHeading as="h3" textAlign="center" color="white">{{ user.firstname }}</CHeading>
        <span v-for="keyword in keywords" :key="keyword">
            <CText fontSize="xl" color="gray.200">{{ keyword }}</CText>
        </span>
    </CBox>
</template>

<script>
import { CBox, CImage, CHeading, CText } from "@chakra-ui/vue";
export default {
    components: { CBox, CImage, CHeading, CText },
    props:{
        user: {id: null, email: null, bio: null, firstname: null, name: null, roles: null}
    }
}
</script>