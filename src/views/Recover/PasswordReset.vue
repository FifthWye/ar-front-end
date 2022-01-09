<template>
  <v-app>
    <v-main style="color: grey">
      <v-container fluid class="fill-height bg">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card elevation="0" max-width="500px" class="mx-auto">
              <v-toolbar class="d-flex justify-center" flat>
                <v-toolbar-title>Password Reset</v-toolbar-title>
              </v-toolbar>
              <ValidationObserver v-slot="{ invalid }">
                <v-form @submit.prevent="handleResetPassword">
                  <v-card-text>
                    Now create a new password for your account and Log in.

                    <ValidationProvider
                      name="password"
                      rules="required|min:5|max:255"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        label="Password"
                        name="password"
                        prepend-icon="mdi-lock"
                        type="password"
                        v-model="password"
                        :error-messages="errors"
                      ></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider
                      name="confirm password"
                      rules="required|confirmed:password"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        label="Confirm password"
                        name="confirm-password"
                        prepend-icon="mdi-check"
                        type="password"
                        v-model="confirmPassword"
                        :error-messages="errors"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      type="submit"
                      color="primary"
                      :disabled="invalid"
                      @submit="handleResetPassword"
                      block
                      >Reset Password</v-btn
                    >
                  </v-card-actions>
                </v-form>
              </ValidationObserver>
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
      password: "",
      confirmPassword: "",
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
    async handleResetPassword() {
      if (this.password === this.confirmPassword) {
        const res = await userService.resetPasswordByToken(
          this.$route.params.token,
          this.password
        );

        for (const [key, value] of Object.entries(res)) {
          this.alertText = value;
          key === "error"
            ? (this.alertError = true)
            : (this.alertSuccess = true);
          setTimeout(() => {
            this.alertError = false;
            this.alertSuccess = false;
            this.$router.push("/Login");
          }, 5000);
        }
      }
    },
  },
};
</script>
