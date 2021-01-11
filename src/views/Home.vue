<template>
    <main>
        <div class="home">
            <c-box :mx="{base: 2}">
                <c-stack :spacing="3">
                    <CImage src="../assets/svg/networks.svg"/>
                    <c-box :mx="{ base: 3, sm: 0 }">
                        <c-heading as="h1" size="xl" :textAlign="{base: 'center', md: 'initial'}">The best audience for your needs</c-heading>
                    </c-box>
                    <c-box :mx="{ base: 3, sm: 0 }" :my="{base: 1, sm: 0}" :textAlign="{base: 'center', md: 'initial'}">
                        <c-heading as="h2" size="md" color="gray">Find the influencer for you branded content</c-heading>
                    </c-box>
                    <c-grid :template-columns="{base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)'}" :gap="{base: '5', sm: '1'}">
                        <c-box :maxW="{base: 'xs', sm: 'full'}" :m="{base: 'auto', sm: '1'}">
                            <c-select v-model="platform" placeholder="Choose your platform">
                                <option value="all">All</option>
                                <option 
                                    v-for="p in platforms"
                                    :key="p.id"
                                    :value="p.name"
                                    >{{p.name}}</option>
                            </c-select>
                        </c-box>
                        <c-box :maxW="{base: 'xs', sm: 'full'}" :m="{base: 'auto', sm: '1'}">
                            <c-select v-model="category" placeholder="Choose your category">
                                <option value="all">All</option>
                                <option 
                                    v-for="p in keywords"
                                    :key="p.id"
                                    :value="p.name"
                                    >{{p.name}}</option>
                            </c-select>
                        </c-box>
                        <c-box :maxW="{base: 'xs', sm: 'full'}" :m="{base: 'auto', sm: '1'}">
                            <CLink as="router-link" :to="'/search?category='+category">
                                <CButton variantColor="indigo" width="100%">FIND YOUR INFLUENCER</CButton>
                            </CLink>
                        </c-box>
                    </c-grid>
                    
                </c-stack>
            </c-box>
        </div>
    </main>
</template>

<script>
// @ is an alias to /src
import { CHeading, CBox, CSelect, CGrid, CButton, CImage, CLink } from '@chakra-ui/vue';

export default {
    name: 'Home',
    components: {
        CHeading,
        CBox,
        CSelect,
        CGrid, 
        CButton,
        CImage,
        CLink
    },
    props:{
        getAllPlatforms: Function,
        getAllKeywords: Function
    },
    async mounted(){
        const platforms = await this.getAllPlatforms();
        const keywords = await this.getAllKeywords()
        this.platforms = platforms.data;
        this.keywords = keywords.data;
    },
    data(){
        return {
            platform: "all",
            category: "all",
            platforms: null,
            keywords: null
        }
    }
}
</script>