<template>
    <CBox bg="#7425F3" textAlign="center" borderRadius="lg" boxShadow="1px 1px 6px 0px" py="3">
        <template v-if="user.url">
            <CAvatar :src="user.url" :alt="user.name+' profile picture'" size="2xl"/>
        </template>
        <template v-else>
            <CAvatar size="2xl" />
            <input type="file" id="file" ref="file" @change="changePicture()"/>
        </template>
        <CHeading as="h3" textAlign="center" color="white">{{ user.name }}</CHeading>
        <!--
        <span v-for="keyword in keywords" :key="keyword">
            <CText fontSize="xl" color="gray.200">{{ keyword }}</CText>
        </span>
        -->
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
                <template v-if="user.roles === 'ROLE_INFLUENCER'">
                    <CHeading as="h5" textAlign="center" color="gray.100" size="sm" fontWeight="500">Your platforms</CHeading>
                    <CGrid 
                        :template-columns="{base: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)'}" 
                        :gap="{base: '5', sm: '3'}"
                    >
                        <c-tag
                            v-for="rplatform in relatedPlatforms"
                            size="md"
                            :key="rplatform.id"
                            :ref="'platform-'+rplatform.id"
                            variant="solid"
                            variant-color="blue"
                        >
                            <c-tag-label>{{rplatform.name}}</c-tag-label>
                            <c-tag-close-button @click="removePlatformTag(rplatform.id)" size="md" />
                        </c-tag>
                        <c-tag
                            v-for="uplatform in unrelatedPlatforms"
                            size="md"
                            :key="uplatform.id"
                            :ref="'platform-'+uplatform.id"
                            variant="solid"
                            variant-color="cyan"   
                        >
                            <c-tag-label>{{uplatform.name}}</c-tag-label>
                            <CButton size="xs" variant="unstyled" v-on:click="addPlatformTag(uplatform)">
                                <c-tag-icon icon="add" />
                            </CButton>
                        </c-tag>
                    </CGrid>
                </template>
                <CHeading as="h5" textAlign="center" color="gray.100" size="sm" fontWeight="500">Your categories</CHeading>
                <CGrid 
                        :template-columns="{base: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)'}" 
                        :gap="{base: '5', sm: '3'}"
                    >
                        <c-tag
                            v-for="r in relatedKeywords"
                            size="md"
                            :key="r.id"
                            :ref="'platform-'+r.id"
                            variant="solid"
                            variant-color="indigo"
                        >
                            <c-tag-label>{{r.name}}</c-tag-label>
                            <c-tag-close-button @click="removeKeywordTag(r.id)" size="md" />
                        </c-tag>
                        <c-tag
                            v-for="u in unrelatedKeywords"
                            size="md"
                            :key="u.id"
                            :ref="'platform-'+u.id"
                            variant="solid"
                            variant-color="pink"   
                        >
                            <c-tag-label>{{u.name}}</c-tag-label>
                            <CButton size="xs" variant="unstyled" v-on:click="addKeywordTag(u.id)">
                                <c-tag-icon icon="add" />
                            </CButton>
                        </c-tag>
                    </CGrid>
                <CButton bg="black" color="gray.50" type="submit">Save your informations</CButton>
            </c-stack>
        </form>
    </CBox>
</template>

<script>
import { 
    CBox, CHeading, CAvatar, CInput, CFormControl, CFormLabel, CFormHelperText, CStack, CButton, CDivider,
    CTag, CTagIcon, CTagLabel, CTagCloseButton, CGrid
} from "@chakra-ui/vue";
export default {
    components: { 
        CBox, CHeading, CAvatar, CInput, CFormControl, CFormLabel, CFormHelperText, CStack, CButton, CDivider,
        CTag, CTagIcon, CTagLabel, CTagCloseButton, CGrid
    },
    props:{
        user: {id: null, email: null, bio: null, firstname: null, name: null, roles: null, url: null},
        modifyUser: Function,
        getPlatforms: Function,
        addPlatform: Function,
        removePlatform: Function,
        getKeywords: Function,
        addKeyword: Function,
        removeKeyword: Function
    },
    data(){
        return {
            file: null,
            unrelatedPlatforms: null,
            relatedPlatforms: null,
            unrelatedKeywords: null,
            relatedKeywords: null
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
        },
        async addPlatformTag(platform){
            const res = await this.addPlatform(platform);
            console.log(res);
            await this.updatePlatforms();
        },
        async removePlatformTag(id){
            const res = await this.removePlatform(id);
            console.log(res);
            await this.updatePlatforms();
        },
        async updatePlatforms(){
            const res = await this.getPlatforms();
            this.unrelatedPlatforms = res.data.platforms.unrelated;
            this.relatedPlatforms = res.data.platforms.related;
        }, 
        async updateKeywords(){
            const res = await this.getKeywords()
            this.unrelatedKeywords = res.data.keywords.unrelated;
            this.relatedKeywords = res.data.keywords.related;
        },
        async addKeywordTag(id){
            const res = await this.addKeyword(id);
            console.log(res);
            await this.updateKeywords();
        },
        async removeKeywordTag(id){
            const res = await this.removeKeyword(id);
            console.log(res);
            await this.updateKeywords();
        },

    },
    async mounted(){
        await this.updatePlatforms();
        await this.updateKeywords();
    },
}
</script>

<style scoped>
button[data-chakra-component="CTagCloseButton"], div[data-chakra-component="CTag"] button{
    margin-left: auto;
}
svg[data-chakra-component="CTagIcon"]:hover{
    cursor: pointer;
    opacity: 0.8;
}
</style>