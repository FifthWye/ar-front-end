<template>
  <v-app>
    <v-main class="background">
      <v-container fluid class="pt-8 bg">
        <v-row align="start" justify="center">
          <v-data-table
            :headers="headers"
            :items="moderators"
            :items-per-page="25"
            class="moderators-table"
          >
            <template v-slot:[`item.id`]="{ item }">
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
                <span>Click if you want to delete this Moderator.</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-row>
        <v-btn
          @click="handleAddModerator"
          class="add-moderator"
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
          title="Add new moderator"
          :emailOnly="true"
          :onlyCredentials="true"
          :requireFields="true"
          :show="this.addModeratorDialogForm.show"
          :callback="this.addModeratorDialogForm.callback"
          :hide="this.hideAddDialogForm"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { botService } from "../../services/botService";
import DialogForm from "../Panel/DialogForm.vue";

import WarringAlert from "../../components/WarringAlert.vue";

export default {
  name: "Moderators",
  components: {
    WarringAlert,
    DialogForm,
  },
  data: () => ({
    headers: [
      { text: "Email", value: "email", align: "left" },
      { text: "First Name", value: "firstName", align: "left" },
      { text: "Last Name", value: "lastName", align: "left" },
      {
        text: "Actions",
        value: "id",
        sortable: false,
        class: "actions-header",
        align: "right",
      },
    ],
    moderators: [],
    alertValues: {
      callback: () => null,
      text: "Are you sure you want to delete Moderator? You won't be able to restore it after this action.",
      show: false,
    },
    addModeratorDialogForm: {
      callback: () => null,
      show: false,
    },
  }),
  methods: {
    addModeratorsToTable: async function (moderator) {
      moderator.map(async ({ _id, email, firstName, lastName }) => {
        this.moderators.push({
          id: _id,
          email,
          firstName,
          lastName,
        });
      });
    },
    setUpPage: async function (botId) {
      const response = await botService.getBots();
      const { user } = response.data;
      const { OwnedBots } = user;
      const { userModerators } = OwnedBots.find(({ _id }) => _id === botId);
      await this.addModeratorsToTable(userModerators);
    },
    hideAddDialogForm: function () {
      this.addModeratorDialogForm.show = false;
    },
    handleAddModerator: async function () {
      const id = this.$route.params.botId;
      const callback = async ({ email }) => {
        if (email) await botService.inviteModerator(email, id);

        this.hideAddDialogForm();
        this.moderators = [];
        this.setUpPage(id);
      };

      this.addModeratorDialogForm.callback = callback;
      this.addModeratorDialogForm.show = true;
    },
    handleDelete: function (id) {
      const callback = async (withRequest) => {
        const botId = this.$route.params.botId;
        if (withRequest) {
          console.log(id, botId)
          await botService.removeModerator(id, botId);
          this.moderators = [];
          this.setUpPage(botId);
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
.moderators-table {
  width: 90%;
}

.action {
  margin: 0 8px;
}

.add-moderator {
  bottom: 30px !important;
  right: 30px !important;
}
</style>