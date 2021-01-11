<template>
  <c-box display="flex">
    <c-box margin="auto" align="center">
        <c-icon margin="5" name="check" size="30%"/>
      <c-box v-if="user.roles=='ROLE_BRAND'">
      <c-text fontSize="2xl">
        The other party has been contacted. <br>In the meantime, checkout our best influencers.
      </c-text>
        <CButton width="80%" my="3" bg="#7425F3" color="white"><a href="/search">Find your influencer</a></CButton>
      </c-box>
      <c-box v-else-if="user.roles=='ROLE_INFLUENCER'">
        <c-text fontSize="2xl">
          The other party has been contacted. <br>In the meantime, checkout our best partners.
        </c-text>
        <CButton width="80%" my="3" bg="#7425F3" color="white"><a href="/search">Find your partner</a></CButton>
      </c-box>
    </c-box>
  </c-box>
</template>

<script>
import {CButton,CBox,CIcon,CText} from "@chakra-ui/vue";

export default {
  components: {CButton,CBox,CIcon,CText},
  props:{
    user:Object
  }
}
</script>