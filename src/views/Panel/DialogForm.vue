<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Bot configuration</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col v-if="emailOnly" cols="12">
                <v-text-field
                  v-model="email"
                  :label="requireFields ? 'Email*' : 'Email'"
                  :required="requireFields"
                ></v-text-field>
              </v-col>
              <v-col v-if="!emailOnly" cols="12">
                <v-text-field
                  v-model="username"
                  :label="requireFields ? 'Username*' : 'Username'"
                  :required="requireFields"
                ></v-text-field>
              </v-col>
              <v-col v-if="!emailOnly" cols="12">
                <v-text-field
                  :label="requireFields ? 'Password*' : 'Password'"
                  v-model="password"
                  type="password"
                  :required="requireFields"
                ></v-text-field>
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
    email: ""
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