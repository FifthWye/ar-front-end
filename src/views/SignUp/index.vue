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
                  ></v-text-field>
                  <v-text-field
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                  <v-text-field
                    label="Confirm password"
                    name="confirm-password"
                    prepend-icon="mdi-check"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="login" block>Sign up</v-btn>
              </v-card-actions>
              <v-card-text>
                Have an account already?
                <router-link to="/login">Login</router-link>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Sign up",
  methods: {
    login: () => {
      alert("Sign up");
    },
  },
};
</script>
