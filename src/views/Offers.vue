<template>
  <div>
    <c-breadcrumb separator="›" m="3" fontWeight="bold" fontSize="lg">
      <c-breadcrumb-item v-if="user.roles=='ROLE_BRAND'">
        <c-breadcrumb-link href="/search">Our influencers</c-breadcrumb-link>
      </c-breadcrumb-item>
      <c-breadcrumb-item v-else-if="user.roles=='ROLE_INFLUENCER'">
        <c-breadcrumb-link href="/search">Our partners</c-breadcrumb-link>
      </c-breadcrumb-item>

      <c-breadcrumb-item isCurrentPage>
        <c-breadcrumb-link>Offers</c-breadcrumb-link>
      </c-breadcrumb-item>
    </c-breadcrumb>
    <div class="container" style="color: white">
      <CBox bg="#7425F3" textAlign="center" borderRadius="lg" boxShadow="1px 1px 6px 0px" class="card">
        <CImage :src="userP.url" :alt="userP.name+' profile picture'" m="auto" width="100%" roundedTop="lg"/>
        <div style="margin:1rem">
          <CHeading as="h3" textAlign="center" color="white">{{ userP.name }}</CHeading>
          <hr style="margin: 0 1rem 0 1rem">
          <span style="padding: 0.5rem;color: black">{{ offers.length }} offer(s) available </span>
          <c-radio-group align="left" m="5" id="test" @change="changeOffer">
            <c-radio :value="item.id" v-for="item in offers" :key="item.id">{{ item.price }} € / {{
                item.unit
              }}
            </c-radio>
            <c-radio value="custom">Custom</c-radio>
          </c-radio-group>
          <div class="custom_div">
            <label for="price" class="d-inline-block">Price :</label>
            <c-input placeholder="price" mt="2" id="price" type="number" v-model="price" v-bind:isDisabled="disableCustom"
                     class="d-inline-block" color="black"/>
          </div>
          <div class="custom_div">
            <label for="price" class="d-inline-block">Unit :</label>
            <c-select v-model="unit" class="d-inline-block" id="select_unit" v-bind:isDisabled="disableCustom"
                      color="black">
              <option value="video">video</option>
              <option value="minute">minute</option>
              <option value="hour">hour</option>
              <option value="photo">photo</option>
              <option value="month">month</option>
              <option value="publication">publication</option>
            </c-select>
          </div>
          <c-text color="#C42231" fontWeight="bold" align="center" v-bind:display="(error ? 'block' : 'none')">Input a price and an unit</c-text>
          <hr style="margin: 1rem 1rem 1rem 1rem">
          <label for="date">Expiration date :</label>
          <c-input mt="2" id="date" v-model="date" type="date" color="black"/>
          <label for="desc">Description :</label>
          <c-textarea v-model="description" id="desc" mt="2" placeholder="Description" color="black"></c-textarea>
          <CButton width="80%" my="3" bg="#32057B" color="white" v-on:click="this.sendRequest">Send Request</CButton>
        </div>
      </CBox>
    </div>
  </div>
</template>
<script>
import {CText,CBox, CImage, CHeading, CButton, CRadio, CRadioGroup, CInput, CSelect, CTextarea, CBreadcrumb, CBreadcrumbItem, CBreadcrumbLink
} from "@chakra-ui/vue";

export default {
  components: {CText,CBox, CImage, CHeading, CButton, CRadio, CRadioGroup, CInput, CSelect, CTextarea, CBreadcrumb, CBreadcrumbItem, CBreadcrumbLink
  },
  data() {
    return {
      offers: [],
      userP: null,
      offerSelected: null,
      price: null,
      date: "dd/mm/yyyy",
      unit: null,
      description: "",
      disableCustom: true,
      error:false
    }
  },
  props: {
    user: Object,
    getOffer: Function,
    getUser: Function,
    createProposal: Function
  },
  async mounted() {
    var idUser = this.$route.params.identifier;
    const resO = await this.getOffer(idUser);
    console.log(resO);
    const resU = await this.getUser(idUser);
    this.offers = resO.data;
    this.userP = resU.data;
  },
  methods: {
    sendRequest() {
      if (this.offerSelected == "custom") {
        if (this.price == null || this.unit == null) this.error = true;
        else {
          this.createProposal(this.user.id, {
            price: this.price,
            unit: this.unit,
          }, this.description, this.date);
        }
      } else {
        this.createProposal(this.user.id, this.offerSelected, this.description, this.date)
      }

    },
    changeOffer(e) {
      this.offerSelected = e;
      if (e == "custom") {
        document.getElementById("price").disabled = false;
        document.getElementById("select_unit").children[0].disabled = false;
        document.getElementById("price").setAttribute("aria-disabled", false);
        document.getElementById("select_unit").children[0].setAttribute("aria-disabled", false);
      } else {
        document.getElementById("price").disabled = true;
        document.getElementById("select_unit").children[0].disabled = true;
        document.getElementById("price").setAttribute("aria-disabled", true);
        document.getElementById("select_unit").children[0].setAttribute("aria-disabled", true);
      }
    }
  }
}
</script>
<style>
.container {
  display: flex;
}

.card {
  margin: auto;
}

.custom_div label {
  width: 25%;
  margin-bottom: 1rem;
}

.d-inline-block {
  width: 75%;
  display: inline-block;
}

</style>