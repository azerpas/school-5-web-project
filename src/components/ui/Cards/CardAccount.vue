<template>
    <CBox bg="#7425F3" textAlign="center" borderRadius="lg" boxShadow="1px 1px 6px 0px" py="3">
        <template v-if="user.url">
            <CAvatar :src="user.url" :alt="user.firstname+' profile picture'" size="2xl"/>
        </template>
        <template v-else>
            <CAvatar size="2xl" />
            <input type="file" id="file" ref="file" @change="changePicture()"/>
        </template>
        <CHeading as="h3" textAlign="center" color="white">{{ user.name }}</CHeading>
        <span v-for="keyword in keywords" :key="keyword">
            <CText fontSize="xl" color="gray.200">{{ keyword }}</CText>
        </span>
        <CBox mx="2"><CDivider/></CBox>
        <form class="form-account" @submit="modify($event)">
            <c-stack spacing="3" mx="2" mb="3">
                <c-form-control>
                    <c-form-label for="username" color="gray.100">Your username</c-form-label>
                    <c-input required type="text" id="username" aria-describedby="username-helper-text" v-model="user.name" />
                    <c-form-helper-text id="title-helper-text">
                    </c-form-helper-text>
                </c-form-control>
                <c-form-control>
                    <c-form-label for="username" color="gray.100">Your bio</c-form-label>
                    <c-input required type="text" id="username" aria-describedby="username-helper-text" v-model="user.bio" as="textarea" />
                    <c-form-helper-text id="title-helper-text" color="gray.100">
                        Anything related to you, your website 🌍, your hobbies 🏌️‍
                    </c-form-helper-text>
                </c-form-control>
                <CButton bg="black" color="gray.50" type="submit">Save your informations</CButton>
            </c-stack>
        </form>
    </CBox>
</template>

<script>
import { CBox, CHeading, CText, CAvatar, CInput, CFormControl, CFormLabel, CFormHelperText, CStack, CButton, CDivider } from "@chakra-ui/vue";
export default {
    components: { CBox, CHeading, CText, CAvatar, CInput, CFormControl, CFormLabel, CFormHelperText, CStack, CButton, CDivider },
    props:{
        user: {id: null, email: null, bio: null, firstname: null, name: null, roles: null, url: null},
        modifyUser: Function
    },
    data(){
        return {
            file: null
        }
    },
    methods: {
        async changePicture(){
            this.file = this.$refs.file.files[0];
            const res = await this.modifyUser(this.file);
            if(res.status === 200){
                this.user.url = res.data.url;
            }
        },
        async modify(event){
            event.preventDefault();
            const res = await this.modifyUser(null, this.user.name, this.user.bio);
            if(res.status === 200){
                this.$toast({
                    title: 'Infos edited',
                    description: "Your informations have successfully been changed.",
                    status: 'info',
                    duration: 5000
                });
            }
        }
    }
}
</script>