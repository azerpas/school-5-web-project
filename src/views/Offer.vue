<template>
  <div class="container">
    <CBox bg="#7425F3" textAlign="center" borderRadius="lg" boxShadow="1px 1px 6px 0px" class="card">
      <CImage :src="user.url" :alt="user.name+' profile picture'" m="auto" width="100%" roundedTop="lg"/>
      <div style="margin:1rem">
      <CHeading as="h3" textAlign="center" color="white">{{ user.name }}</CHeading>
      <hr style="margin: 0 1rem 0 1rem">
      <span style="padding: 0.5rem">{{ offers.length }} offer(s) available </span>
      <c-radio-group align="left" m="5" id="test" @change="e=>{offerSelected=e}">
        <c-radio :value="item.id" v-for="item in offers" :key="item.id"  >{{ item.price }} € / {{item.unit}}</c-radio>
        <c-radio value="custom">Custom</c-radio>
      </c-radio-group>
      <hr style="margin: 0 1rem 0 1rem">
      <c-input placeholder="price" mt="2"> </c-input>
      <c-input placeholder="Before the" mt="2"></c-input>
      <CButton width="80%" my="3" bg="#32057B" color="white" v-on:click="this.sendRequest">Send Request</CButton>
      </div>
    </CBox>
  </div>
</template>
<script>
import { CBox, CImage, CHeading, CButton ,CRadio,CRadioGroup,CInput} from "@chakra-ui/vue";
export default {
  components:{ CBox, CImage, CHeading, CButton ,CRadio,CRadioGroup,CInput},
  data (){
    return {
      offers:[],
      user:null,
      offerSelected:null
    }
  },
  props:{
    getOffer: Function,
    getUser:Function
  },
  async mounted(){
    var idUser = this.$route.params.identifier;
    const resO = await this.getOffer(idUser);
    const resU = await this.getUser(idUser);
    console.log(resU);
    this.offers = resO.data;
    this.user = resU.data;
  },
  methods:{
    sendRequest(){
      if(this.offerSelected == "custom"){
        console.log("custom");
      }else{
        console.log(this.offerSelected);
      }
    }
  }
}
</script>
<style>
.container{
  display: flex;
}
.card{
  margin:auto;
}
</style>