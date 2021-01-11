<template>
  <CBox :mx="{base: 2}">
    <CHeading as="h1" textAlign="center">Our Influencers</CHeading>
    <CHeading as="h4" textAlign="center" size="4" fontWeight="300">Choose from a wide range of diverse content
      creators
    </CHeading>
    <CBox mt="3">
      <CGrid template-columns="repeat(2, 1fr)" :gap="{base: '5', sm: '1'}">
        <CBox :maxW="{base: 'xs', sm: 'full'}" :m="{base: '0', sm: '1'}" zIndex="0">
          <CSelect v-model="platform" placeholder="Platform" @change="filter()">
            <option value="all">All</option>
            <option v-for="p in platforms" :value="p.name" :key="p.id">{{ p.name }}</option>
          </CSelect>
        </CBox>
        <CBox :maxW="{base: 'xs', sm: 'full'}" :m="{base: '0', sm: '1'}" zIndex="0">
          <CSelect v-model="category" placeholder="Category" @change="filter()">
            <option value="all">All</option>
            <option v-for="k in keywords" :value="k.name" :key="k.id">{{ k.name }}</option>
          </CSelect>
        </CBox>
      </CGrid>
    </CBox>
  </CBox>
</template>

<script>
import {CBox, CHeading, CGrid, CSelect} from "@chakra-ui/vue"

export default {
  components: {
    CBox, CHeading, CGrid, CSelect
  }, props: {
    keywords: Array,
    platforms:Array
  },
  data() {
    return {
      category: "all",
      platform: "all"
    }
  },
  methods: {
    async filter() {
      this.$emit("search", this.platform, this.category);
    }
  }
}
</script>