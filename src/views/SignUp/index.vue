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
              <ValidationObserver v-slot="{ invalid }">
                <v-form @submit.prevent="handleSignUp">
                  <v-card-text>
                    <ValidationProvider
                      name="email"
                      rules="required|email|min:5|max:255"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        label="Email"
                        name="login"
                        prepend-icon="mdi-email"
                        type="text"
                        v-model="email"
                        :error-messages="errors"
                      ></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider
                      name="first name"
                      rules="required|min:2|max:50|alpha"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        label="First Name"
                        name="firstName"
                        prepend-icon="mdi-pencil-circle-outline"
                        type="text"
                        v-model="firstName"
                        :error-messages="errors"
                      ></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider
                      name="last name"
                      rules="required|min:2|max:50|alpha"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        label="Last Name"
                        name="lastName"
                        prepend-icon="mdi-pencil-circle-outline"
                        type="text"
                        v-model="lastName"
                        :error-messages="errors"
                      ></v-text-field>
                    </ValidationProvider>
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
                      @submit="handleSignUp"
                      block
                      >Sign up</v-btn
                    >
                  </v-card-actions>
                </v-form>
              </ValidationObserver>
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
      firstName: "",
      lastName: "",
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
      const res = await authService.register({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      });

      for (const [key, value] of Object.entries(res)) {
        this.alertText = value;
        key === "error" ? (this.alertError = true) : (this.alertSuccess = true);
        setTimeout(() => {
          this.alertError = false;
          this.alertSuccess = false;
        }, 5000);
      }
    },
  },
};
</script>
