<template>
  <v-app>
    <v-main class="background">
      <v-container fluid class="fill-height bg">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-icon v-if="!this.isVerified" size="50" class="rotating" color="green" dark>
              mdi-loading
            </v-icon>
            <h1 v-if="!this.isVerified">Wait we are verifying your account</h1>
            <h1 v-if="this.isVerified">Your account successfully verified, now you can use panel.</h1>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { userService } from "../services/userService";

export default {
  name: "Verify",
  data: () => ({
      isVerified: false
  }),
  async mounted() {
    const resetToken = this.$route.params.resetToken;
    const res = await userService.activateAccount(resetToken);
    
    if(res) this.isVerified = true;
  },
};
</script>

<style scoped>
@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.rotating {
  -webkit-animation: rotating 1s linear infinite;
  -moz-animation: rotating 1s linear infinite;
  -ms-animation: rotating 1s linear infinite;
  -o-animation: rotating 1s linear infinite;
  animation: rotating 1s linear infinite;
  margin-bottom: 20px;
}
</style>
