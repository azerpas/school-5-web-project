<template>
    <main>
        <div class="home">
            <c-box :mx="{base: 2}">
                <c-stack :spacing="3">
                    <c-box :mx="{ base: 3, sm: 0 }">
                        <c-heading as="h1" size="xl">The best audience for your needs</c-heading>
                    </c-box>
                    <c-box :mx="{ base: 3, sm: 0 }" :my="{base: 1, sm: 0}">
                        <c-heading as="h2" size="md" color="gray">Find the influencer for you branded content</c-heading>
                    </c-box>
                    <c-grid :template-columns="{base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)'}" :gap="{base: '5', sm: '1'}">
                        <c-box :maxW="{base: 'xs', sm: 'full'}" :m="{base: 'auto', sm: '1'}">
                            <c-select v-model="platform" placeholder="Choose your platform">
                                <option value="all">All</option>
                                <option value="instagram">Instagram</option>
                                <option value="youtube">YouTube</option>
                            </c-select>
                        </c-box>
                        <c-box :maxW="{base: 'xs', sm: 'full'}" :m="{base: 'auto', sm: '1'}">
                            <c-select v-model="category" placeholder="Choose your category">
                                <option value="all">All</option>
                                <option value="general">General</option>
                                <option value="tech">Tech</option>
                                <option value="sport">Sport</option>
                            </c-select>
                        </c-box>
                        <c-box :maxW="{base: 'xs', sm: 'full'}" :m="{base: 'auto', sm: '1'}">
                            <CButton variantColor="indigo" :click="()=>{}" width="100%">FIND YOUR INFLUENCER</CButton>
                        </c-box>
                    </c-grid>
                    
                </c-stack>
            </c-box>
        </div>
    </main>
</template>

<script>
// @ is an alias to /src
import { CHeading, CBox, CSelect, CGrid, CButton } from '@chakra-ui/vue';

export default {
    name: 'Home',
    components: {
        CHeading,
        CBox,
        CSelect,
        CGrid, 
        CButton
    },
    data(){
        return {
            platform: "all",
            category: "general"
        }
    }
}
</script>
