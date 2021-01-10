<template>
    <CBox bg="#7425F3" textAlign="center" borderRadius="lg" boxShadow="1px 1px 6px 0px">
        <template v-if="user.image">
            <CAvatar :src="user.image" :alt="user.firstname+' profile picture'" size="2xl"/>
        </template>
        <template v-else>
            <CAvatar size="2xl" />
        </template>
        <CHeading as="h3" textAlign="center" color="white">{{ user.firstname }}</CHeading>
        <span v-for="keyword in keywords" :key="keyword">
            <CText fontSize="xl" color="gray.200">{{ keyword }}</CText>
        </span>
    </CBox>
</template>

<script>
import { CBox, CHeading, CText, CAvatar } from "@chakra-ui/vue";
export default {
    components: { CBox, CHeading, CText, CAvatar },
    props:{
        user: {id: null, email: null, bio: null, firstname: null, name: null, roles: null}
    }
}
</script>