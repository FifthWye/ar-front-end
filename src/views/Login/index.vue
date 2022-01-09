<template>
  <v-app>
    <v-main class="background">
      <v-container fluid class="fill-height bg">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card elevation="0" max-width="500px" class="pa-6">
              <v-toolbar class="d-flex justify-center" flat>
                <v-toolbar-title>Login to your account</v-toolbar-title>
                <v-img />
              </v-toolbar>
              <ValidationObserver v-slot="{ invalid }">
                <v-form @submit.prevent="handleLogin">
                  <v-card-text>
                    <ValidationProvider
                      name="Email"
                      rules="required|min:5|email|min:5|max:255"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        label="Login"
                        name="login"
                        prepend-icon="mdi-account"
                        type="text"
                        v-model="email"
                        :error-messages="errors"
                      ></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider
                      name="Password"
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
                  </v-card-text>

                  <v-card-actions>
                    <v-btn
                      type="submit"
                      color="primary"
                      :disabled="invalid"
                      @submit="handleLogin"
                      block
                      >Login</v-btn
                    >
                  </v-card-actions>
                </v-form>
              </ValidationObserver>

              <v-card-text>
                Don't have an account?
                <router-link to="/sign-up">Sign up</router-link>
              </v-card-text>
              <router-link style="font-size: 0.9em" to="/accounts/recover/"
                >Forgot password?</router-link
              >
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
  name: "Login",
  data: function () {
    return {
      email: "",
      password: "",
      alertText: "",
      alertError: false,
      alertSuccess: false,
    };
  },
  methods: {
    async handleLogin() {
      const res = await authService.login(this.email, this.password);

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

<style scoped>
.background {
  background-color: transparent;
}

.alert {
  position: absolute;
  text-align: left;
  left: 50%;
  transform: translateX(-50%);
}
</style>
