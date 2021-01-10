<template>
    <CBox :mx="{base: 2}" >
        <CHeading as="h1" textAlign="center">Our Partners</CHeading>
        <CHeading as="h4" textAlign="center" size="4" fontWeight="300">Choose from a wide range of diverse content creators</CHeading>
        <CBox mt="3">
            <CSelect v-model="category" placeholder="Category" @change="filter()">
                <option value="all">All</option>
                <option value="general">General</option>
                <option value="tech">Tech</option>
                <option value="sport">Sport</option>
            </CSelect>
        </CBox>
    </CBox>
</template>

<script>
import { CBox, CHeading, CSelect } from "@chakra-ui/vue";
export default {
    components:{
        CBox, CHeading, CSelect
    }, 
    data(){
        return{ 
            category: "all"
        }
    },
    methods: {
        async filter(){
            this.$emit("search", null, this.category);
        }
    }
}
</script>