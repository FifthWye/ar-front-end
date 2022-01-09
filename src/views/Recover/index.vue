<template>
  <v-app>
    <v-main style="color: grey">
      <v-container fluid class="fill-height bg">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card elevation="0" max-width="500px" class="mx-auto">
              <v-icon x-large aria-hidden="false"> mdi-lock </v-icon>
              <v-toolbar class="d-flex justify-center" flat>
                <v-toolbar-title>Trouble Logging In?</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                Enter your email and we'll send you a link to get back into your
                account.
                <v-form>
                  <v-text-field
                    label="Email"
                    name="login"
                    prepend-icon="mdi-email"
                    type="text"
                    v-model="email"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="handleSendRecover" block
                  >Send recover link</v-btn
                >
              </v-card-actions>

              <v-card-text>
                <router-link to="/sign-up">Create New Account</router-link>
              </v-card-text>
            </v-card>
            <v-alert
              :value="alertError"
              class="alert"
              transition="scale-transition"
              type="error"
            >
              {{ alertText }}
            </v-alert>
            <v-alert
              :value="alertSuccess"
              class="alert"
              transition="scale-transition"
              type="success"
            >
              {{ alertText }}
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { userService } from "../../services/userService";
export default {
  name: "Recover",
  data: function () {
    return {
      email: "",
      alertText: "",
      alertError: false,
      alertSuccess: false,
    };
  },
  methods: {
    showErrorAlert(text) {
      this.alertText = text;
      this.alertError = true;
      setTimeout(() => {
        this.alertError = false;
      }, 5000);
    },
    async handleSendRecover() {
      if (this.email === "") {
        this.showErrorAlert("Email field can't be empty");
      } else {
        const res = await userService.sendRecoverEmail(this.email);

        for (const [key, value] of Object.entries(res)) {
          this.alertText = value;
          key === "error"
            ? (this.alertError = true)
            : (this.alertSuccess = true);
          setTimeout(() => {
            this.alertError = false;
            this.alertSuccess = false;
          }, 5000);
        }
      }
    },
  },
};
</script>
