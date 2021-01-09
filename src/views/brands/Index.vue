<template>
    <main>
        <div class="brands">
            <CBox :mx="{base: 2}" >
                <CHeading as="h1" textAlign="center">Our Partners</CHeading>
                <CHeading as="h4" textAlign="center" size="4" fontWeight="300">Choose from a wide range of diverse content creators</CHeading>
                <CBox mt="3">
                    <CSelect v-model="category" placeholder="Category">
                        <option value="all">All</option>
                        <option value="general">General</option>
                        <option value="tech">Tech</option>
                        <option value="sport">Sport</option>
                    </CSelect>
                </CBox>
                <CGrid 
                    :template-columns="{base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)'}" 
                    :gap="{base: '5', sm: '3'}"
                    mt="3"
                >
                    <CardUser/>
                </CGrid>
            </CBox>
        </div>
    </main>
</template>

<script>
import { CBox, CHeading, CGrid, CSelect } from "@chakra-ui/vue";
import CardUser from "../../components/ui/Cards/CardUser.vue";
export default {
    components:{
        CBox, CHeading, CSelect, CGrid,
        CardUser
    }, 
    data(){
        return{ 
            category: null
        }
    }
}
</script>