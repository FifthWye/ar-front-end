<template>
  <v-app>
    <v-main class="background">
      <v-container fluid class="pt-8 bg">
        <v-row align="start" justify="center">
          <v-data-table
            :headers="headers"
            :items="replies"
            :items-per-page="25"
            class="replies-table"
          >
            <template v-slot:[`item.username`]="{ item }">
              <a :href="item.url" target="_blank">{{ item.username }}</a>
            </template>
            <template v-slot:[`item.id`]="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-if="!item.isActive"
                    @click="handleTurnOnTurnOff(item.id, item.isActive)"
                    small
                    elevation="0"
                    class="action"
                    fab
                    dark
                    color="green"
                  >
                    <v-icon v-on="on" v-bind="attrs" :alt="item.id" dark>
                      mdi-play
                    </v-icon>
                  </v-btn>
                </template>
                <span>Activate reply</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-if="item.isActive"
                    @click="handleTurnOnTurnOff(item.id, item.isActive)"
                    small
                    elevation="0"
                    class="action"
                    fab
                    dark
                    color="grey"
                  >
                    <v-icon :alt="item.id" v-on="on" v-bind="attrs" dark>
                      mdi-pause-octagon
                    </v-icon>
                  </v-btn>
                </template>
                <span>Disable reply</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="handleEdit(item.id)"
                    small
                    elevation="0"
                    class="action"
                    fab
                    dark
                    color="purple"
                  >
                    <v-icon :alt="item.id" v-on="on" v-bind="attrs" dark>
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                </template>
                <span>Edit reply configuration</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    small
                    elevation="0"
                    class="action"
                    fab
                    dark
                    @click="handleDelete(item.id)"
                    color="red"
                  >
                    <v-icon :alt="item.id" v-on="on" v-bind="attrs" dark>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </template>
                <span>Click if you want to delete this reply.</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-row>
        <v-btn
          @click="handleAdd"
          class="add-reply"
          color="green"
          dark
          absolute
          bottom
          right
          fab
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <WarringAlert
          :show="this.alertValues.show"
          :text="this.alertValues.text"
          :callback="this.alertValues.callback"
        />
        <DialogForm
          :show="this.editReplyDialogForm.show"
          :callback="this.editReplyDialogForm.callback"
          :hide="this.hideEditDialogForm"
        />
        <DialogForm
          :onlyCredentials="true"
          :requireFields="true"
          :show="this.addReplyDialogForm.show"
          :callback="this.addReplyDialogForm.callback"
          :hide="this.hideAddDialogForm"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { botService } from "../../services/botService";
import WarringAlert from "../../components/WarringAlert.vue";
import DialogForm from "./DialogForm.vue";

export default {
  name: "Replies",
  components: {
    WarringAlert,
    DialogForm,
  },
  data: () => ({
    headers: [
      { text: "Text", value: "text", align: "left" },
      { text: "Keywords", value: "keywords", align: "left" },
      {
        text: "Actions",
        value: "id",
        sortable: false,
        class: "actions-header",
        align: "right",
      },
    ],
    replies: [],
    alertValues: {
      callback: () => null,
      text: "Are you sure you want to delete reply? You won't be able to restore it after this action.",
      show: false,
    },
    editReplyDialogForm: {
      callback: () => null,
      show: false,
    },
    addReplyDialogForm: {
      callback: () => null,
      show: false,
    },
  }),
  methods: {
    addRepliesToTable: function (bots) {
      bots.map(({ _id, keywords, isActive, answer }) => {
        this.replies.push({
          id: _id,
          keywords,
          text: answer,
          isActive,
        });
      });
    },
    setUpPage: async function (botId) {
      const response = await botService.getReplies(botId);
      const { bot } = response.data;
      const { replies } = bot;
      this.addRepliesToTable(replies);
    },
    hideEditDialogForm: function () {
      this.editReplyDialogForm.show = false;
    },
    hideAddDialogForm: function () {
      this.addReplyDialogForm.show = false;
    },
    handleAdd: async function () {
      const callback = async (reply, rawKeywords) => {
        const botId = this.$route.params.botId;
        const keywords = rawKeywords
          .split(",")
          .map((keyword) => keyword.trim());
        if (reply && keywords.length !== 0)
          await botService.addReply(botId, keywords, reply);

        this.hideAddDialogForm();
        this.bots = [];
        this.setUpPage();
      };

      this.addReplyDialogForm.callback = callback;
      this.addReplyDialogForm.show = true;
    },
    handleDelete: function (id) {
      const callback = async (withRequest) => {
          const botId = this.$route.params.botId;
        if (withRequest) {
          await botService.deleteReply(botId, id);
          this.bots = [];
          this.setUpPage();
        }
        this.alertValues.show = false;
      };

      this.alertValues.callback = callback;
      this.alertValues.show = true;
    },
  },
  async mounted() {
    const botId = this.$route.params.botId;
    await this.setUpPage(botId);
  },
};
</script>

<style scoped>
.replies-table {
  width: 90%;
}

.action {
  margin: 0 8px;
}
</style>