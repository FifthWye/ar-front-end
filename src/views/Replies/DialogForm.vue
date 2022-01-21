<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="900px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Reply configuration</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <ValidationProvider
                  name="Reply text"
                  rules="required|min:5|max:655"
                  v-slot="{ errors }"
                >
                  <v-textarea
                    :label="requireFields ? 'Reply text*' : 'Reply text'"
                    v-model="text"
                    hint="Enter here text you want bot to send to specific keywords"
                    :error-messages="errors"
                  ></v-textarea>
                </ValidationProvider>
              </v-col>
              <v-col cols="12">
                <ValidationProvider
                  name="Keyword"
                  rules="required|min:5|max:655"
                  v-slot="{ errors }"
                >
                  <v-textarea
                    :label="requireFields ? 'Keywords*' : 'Keywords'"
                    v-model="keywords"
                    hint="Write one ore more keywords that will trigger bot to write your reply"
                    :error-messages="errors"
                  ></v-textarea>
                </ValidationProvider>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
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
    callback: Function,
    requireFields: Boolean,
    currentKeywords: String,
    currentReply: String,
  },
  data: () => ({
    dialog: false,
    text: "",
    keywords: "",
    defaultReply: "",
  }),
  watch: {
    show: function (newVal) {
      this.dialog = newVal;
    },
    currentKeywords: function (newVal) {
      this.keywords = newVal;
    },
    currentReply: function (newVal) {
      this.text = newVal;
    },
  },
  methods: {
    handleSave: async function () {
      await this.callback(this.text, this.keywords);
    },
    handleCancel: function () {
      this.hide();
    },
  },
};
</script>