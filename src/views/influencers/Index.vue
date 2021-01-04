<template>
    <main>
        <div class="brands">
            <CBox :mx="{base: 2}">
                <CHeading as="h1" textAlign="center">Our Partners</CHeading>
                <CHeading as="h4" textAlign="center" size="4" fontWeight="300">Choose from a wide range of diverse content creators</CHeading>
                <CBox mt="3">
                    <CGrid template-columns="repeat(2, 1fr)" :gap="{base: '5', sm: '1'}">
                        <CBox :maxW="{base: 'xs', sm: 'full'}" :m="{base: '0', sm: '1'}">
                            <CSelect v-model="platform" placeholder="Platform">
                                <option value="all">All</option>
                                <option value="instagram">Instagram</option>
                                <option value="youtube">YouTube</option>
                            </CSelect>
                        </CBox>
                        <CBox :maxW="{base: 'xs', sm: 'full'}" :m="{base: '0', sm: '1'}">
                            <CSelect v-model="category" placeholder="Category">
                                <option value="all">All</option>
                                <option value="general">General</option>
                                <option value="tech">Tech</option>
                                <option value="sport">Sport</option>
                            </CSelect>
                        </CBox>
                    </CGrid>
                </CBox>
            </CBox>
        </div>
    </main>
</template>

<script>
import { CBox, CHeading, CGrid, CSelect } from "@chakra-ui/vue"
export default {
    components:{
        CBox, CHeading, CGrid, CSelect
    }
}
</script>