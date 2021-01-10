<template>
    <c-modal
        :is-open="isOpen"
        :on-close="close"
    >
        <c-modal-content ref="content">
            <c-modal-header>
                <CHeading>{{user.name}}</CHeading>
            </c-modal-header>
            <c-modal-close-button />
            <c-modal-body>
                <template v-for="platform in user.platforms">
                    <CHeading :key="platform.name" size="md" as="h4">{{platform.name}}</CHeading>
                </template>
                <CBox mx="2"><CDivider/></CBox>
                <c-stack spacing="3">
                    <CHeading size="xl" as="h3" textAlign="center">WORK</CHeading>
                    <template v-for="work in user.works">
                        <CLink :key="work.id" :href="work.url" is-external><CImage :src="work.thumbnail"/></CLink>
                    </template>
                </c-stack>
            </c-modal-body>
            <c-modal-footer>
            <CLink as="router-link" :to="'/user/'+user.id+'/offers'"><CButton mr="2" variant-color="indigo">Get in touch ! ✨</CButton></CLink>
            <c-button @click="close">Cancel</c-button>
            </c-modal-footer>
        </c-modal-content>
    <c-modal-overlay />
</c-modal>
</template>

<script>
import {
    CModal,CModalOverlay,CModalContent,CModalHeader,CModalFooter,CModalBody,CModalCloseButton,CButton,CStack,CLink,CHeading,CBox,CDivider,CImage
} from "@chakra-ui/vue";
export default {
    components: {
        CModal,CModalOverlay,CModalContent,CModalHeader,CModalFooter,CModalBody,CModalCloseButton,CButton,CStack,CLink,CHeading,CBox,CDivider,CImage
    },
    data () {
        return {
            isOpen: false
        }
    },
    methods: {
        open() {
            this.isOpen = true
        },
        close() {
            this.isOpen = false
        }
    },
    props: {
        user: null
    }
}
</script>

<style scoped>
.profile-picture{
    max-height: 40vh;
    object-fit: cover;
}
</style>