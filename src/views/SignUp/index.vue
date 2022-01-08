<template>
  <v-app>
    <v-main>
      <v-container fluid class="fill-height bg">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card elevation="0" max-width="500px" class="mx-auto">
              <v-toolbar class="d-flex justify-center" flat>
                <v-toolbar-title>Sign in to your account</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    name="login"
                    prepend-icon="mdi-email"
                    type="text"
                    v-model="email"
                  ></v-text-field>
                  <v-text-field
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                  <v-text-field
                    label="Confirm password"
                    name="confirm-password"
                    prepend-icon="mdi-check"
                    type="password"
                    v-model="confirmPassword"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="handleSignUp" block
                  >Sign up</v-btn
                >
              </v-card-actions>
              <v-card-text>
                Have an account already?
                <router-link to="/login">Login</router-link>
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
import { authService } from "../../services/authService";
export default {
  name: "SignUp",
  data: function () {
    return {
      email: "",
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
    async handleSignUp() {
      if (this.email === "") {
        this.showErrorAlert("Email field can't be empty");
      } else {
        if (this.password === this.confirmPassword) {
          const res = await authService.register({
            firstName: "Unknown",
            lastName: "Unknown",
            email: this.email,
            password: this.password,
          });

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

        } else {
          this.showErrorAlert(
            "Password and password confirmation fields do not match"
          );
        }
      }
    },
  },
};
</script>
