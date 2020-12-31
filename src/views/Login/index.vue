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
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="login" block>Login</v-btn>
              </v-card-actions>
              <v-card-text>
                Don't have an account? <router-link to="/sign-up">Sign up</router-link>
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
  name: "Login",
  methods: {
    login: () => {
      alert("Login");
    },
  },
};
</script>

<style scoped>

.background {
  background-color: transparent;
}

</style>
