<template>
    <CBox :mx="{base: 2}" >
        <CHeading as="h1" textAlign="center">Our Partners</CHeading>
        <CHeading as="h4" textAlign="center" size="4" fontWeight="300">Choose from a wide range of world renowed companies</CHeading>
        <CBox mt="3" zIndex="0">
            <CSelect v-model="category" placeholder="Category" @change="filter()">
              <option v-for="k in keywords" :value="k.name" :key="k.id">{{ k.name }}</option>
                <option value="all">All</option>
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
    props:{
      keywords:Array
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