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

              <v-card cols="2" style="margin-bottom: 2em">
                <v-card-text cols="2">
                  <table>
                    <tr>
                      <td>Email:</td>
                      <td>{{ this.email !== undefined ? this.email : 'loading...' }}</td>
                    </tr>
                    <tr>
                      <td>First name:</td>
                      <td>{{ this.firstName !== undefined ? this.firstName : 'loading...' }}</td>
                    </tr>
                    <tr>
                      <td>Last name:</td>
                      <td>{{ this.lastName !== undefined ? this.lastName : 'loading...' }}</td>
                    </tr>
                    <tr>
                      <td>My bots amount:</td>
                      <td>
                        {{ this.OwnedBotsQuantity !== undefined ? this.OwnedBotsQuantity : 'loading...' }}
                      </td>
                    </tr>
                    <tr>
                      <td>Invited bots amount:</td>
                      <td>
                        {{ this.InvitedBotsQuantity !== undefined ? this.InvitedBotsQuantity : 'loading...' }}
                      </td>
                    </tr>
                  </table>
                </v-card-text>
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
                style="margin-bottom: 2em"
              >
                <v-toolbar class="d-flex justify-center" flat>
                  <v-toolbar-title>Reset password</v-toolbar-title>
                </v-toolbar>
                <ValidationObserver v-slot="{ invalid }">
                  <v-form @submit.prevent="handleResetPassword">
                    <v-card-text>
                      <ValidationProvider
                        name="old-password"
                        rules="required|min:5|max:255"
                        v-slot="{ errors }"
                      >
                        <v-text-field
                          label="Password"
                          name="old-password"
                          prepend-icon="mdi-lock"
                          type="password"
                          v-model="oldPassword"
                          :error-messages="errors"
                        ></v-text-field>
                      </ValidationProvider>
                      <ValidationProvider
                        name="password"
                        rules="required|min:5|max:255|"
                        v-slot="{ errors }"
                      >
                        <v-text-field
                          label="New password"
                          name="new-password"
                          prepend-icon="mdi-lock"
                          type="password"
                          v-model="newPassword"
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
                        @submit="handleResetPassword"
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
                style="margin-bottom: 2em"
                v-if="!isHiddenEmailChange"
              >
                <v-toolbar class="d-flex justify-center" flat>
                  <v-toolbar-title>Change email</v-toolbar-title>
                </v-toolbar>
                <ValidationObserver v-slot="{ invalid }">
                  <v-form @submit.prevent="handleChangeEmail">
                    <v-card-text>
                      <ValidationProvider
                        name="Email"
                        rules="required|min:5|email|min:5|max:255"
                        v-slot="{ errors }"
                      >
                        <v-text-field
                          label="New email"
                          name="newEmail"
                          prepend-icon="mdi-account"
                          type="text"
                          v-model="newEmail"
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
                        @submit="handleChangeEmail"
                        block
                        >Change email</v-btn
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
import { userService } from "../../services/userService";

export default {
  name: "SignUp",
  async mounted() {
    let user;
    user = await userService.getMe();
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.OwnedBotsQuantity = user.OwnedBotsQuantity;
    this.InvitedBotsQuantity = user.InvitedBotsQuantity;
  },
  data: function () {
    return {
      isHiddenReset: true,
      isHiddenEmailChange: true,
      email: undefined,
      firstName: undefined,
      lastName: undefined,
      OwnedBotsQuantity: undefined,
      InvitedBotsQuantity: undefined,

      oldPassword: "",
      newPassword: "",
      confirmPassword: "",

      password: "",
      newEmail: "",

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
      const res = await userService.resetPassword(
        this.oldPassword,
        this.newPassword
      );

      for (const [key, value] of Object.entries(res)) {
        this.alertText = value;
        key === "error" ? (this.alertError = true) : (this.alertSuccess = true);
        setTimeout(() => {
          this.alertError = false;
          this.alertSuccess = false;
        }, 5000);
      }
    },
    async handleChangeEmail() {
      const res = await userService.changeEmail(this.password, this.newEmail);

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
table {
  width: 100%;
}

table tr {
  margin: 1em 0 1em 0;
}

table tr td:first-child {
  text-align: left;
  font-weight: bold;
}

table tr td:last-child {
  text-align: right;
  text-align: start;
}
</style>
