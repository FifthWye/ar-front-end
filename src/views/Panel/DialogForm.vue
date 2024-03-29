<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ title }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-form @submit.prevent="handleLogin">
                <v-col v-if="emailOnly" cols="12">
                  <ValidationProvider
                    name="Email"
                    rules="required|min:5|max:255"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model="email"
                      :label="requireFields ? 'Email*' : 'Email'"
                      :required="requireFields"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col v-if="!emailOnly" cols="12">
                  <ValidationProvider
                    name="Username"
                    rules="required|min:5|max:255"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model="username"
                      :label="requireFields ? 'Username*' : 'Username'"
                      :required="requireFields"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col v-if="!emailOnly" cols="12">
                  <ValidationProvider
                    name="Password"
                    rules="required|min:5|max:255"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      :label="requireFields ? 'Password*' : 'Password'"
                      v-model="password"
                      type="password"
                      :required="requireFields"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col v-if="!onlyCredentials" cols="12">
                  <v-text-field
                    label="Default reply"
                    v-model="defaultReply"
                    hint="This text will be sent in case if bot didn't find any reply to send"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col>
              </v-form>
            </v-row>
          </v-container>
          <small v-if="requireFields">*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="handleCancel">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="handleSave"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "DialogForm",
  props: {
    title: String,
    show: Boolean,
    hide: Function,
    onlyCredentials: Boolean,
    callback: Function,
    requireFields: Boolean,
    emailOnly: Boolean,
  },
  data: () => ({
    dialog: false,
    username: "",
    password: "",
    defaultReply: "",
    email: "",
  }),
  watch: {
    show: function (newVal) {
      this.dialog = newVal;
    },
  },
  methods: {
    handleSave: async function () {
      await this.callback({
        username: this.username,
        password: this.password,
        defaultReply: this.defaultReply,
        email: this.email,
      });
    },
    handleCancel: function () {
      this.hide();
    },
  },
};
</script>

<style scoped>
form {
  width: 100%;
}
</style>