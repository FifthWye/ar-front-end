<template>
  <v-app>
    <v-main>
      <v-container fluid class="fill-height bg">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card elevation="0" max-width="500px" class="pa-6">
              <v-toolbar class="d-flex justify-center" flat>
                <v-toolbar-title>Profile</v-toolbar-title>
                <v-img />
              </v-toolbar>

              <v-card cols="2">
                <v-card-text > Name: <span>edwin</span></v-card-text>
                
              </v-card>

              <v-card-actions>
                <v-btn
                  block
                  color="primary"
                  v-if="isHiddenReset"
                  v-on:click="isHiddenReset = !isHiddenReset"
                  ><template v-if="isHiddenReset">Reset password</template>
                </v-btn>
              </v-card-actions>
              <v-card
                elevation="0"
                max-width="500px"
                class="mx-auto"
                v-if="!isHiddenReset"
              >
                <v-toolbar class="d-flex justify-center" flat>
                  <v-toolbar-title>Reset password</v-toolbar-title>
                </v-toolbar>
                <ValidationObserver v-slot="{ invalid }">
                  <v-form @submit.prevent="handleSignUp">
                    <v-card-text>
                      <v-text-field
                        label="Password"
                        name="password"
                        prepend-icon="mdi-lock"
                        type="password"
                        v-model="password"
                        :error-messages="errors"
                      ></v-text-field>
                      <ValidationProvider
                        name="password"
                        rules="required|min:5|max:255"
                        v-slot="{ errors }"
                      >
                        <v-text-field
                          label="New password"
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
                          label="Confirm new password"
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
                        >Reset Password</v-btn
                      >
                    </v-card-actions>
                  </v-form>
                </ValidationObserver>
              </v-card>
              <v-card-actions>
                <v-btn
                  block
                  color="primary"
                  v-if="isHiddenEmailChange"
                  v-on:click="isHiddenEmailChange = !isHiddenEmailChange"
                  ><template v-if="isHiddenEmailChange">Change email</template>
                </v-btn>
              </v-card-actions>
              <v-card
                elevation="0"
                max-width="500px"
                class="mx-auto"
                v-if="!isHiddenEmailChange"
              >
                <v-toolbar class="d-flex justify-center" flat>
                  <v-toolbar-title>Change email</v-toolbar-title>
                </v-toolbar>
                <ValidationObserver v-slot="{ invalid }">
                  <v-form @submit.prevent="handleSignUp">
                    <v-card-text>
                      <ValidationProvider
                        name="Email"
                        rules="required|min:5|email|min:5|max:255"
                        v-slot="{ errors }"
                      >
                        <v-text-field
                          label="New email"
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
                        @submit="handleSignUp"
                        block
                        >Change password</v-btn
                      >
                    </v-card-actions>
                  </v-form>
                </ValidationObserver>
              </v-card>
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
      isHiddenReset: true,
      isHiddenEmailChange: true,
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
