<template>
  <v-app>
    <v-main class="background">
      <v-container fluid class="pt-8 bg">
        <v-row align="start" justify="center">
          <v-data-table
            :headers="headers"
            :items="bots"
            :items-per-page="25"
            class="bots-table"
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
                <span>Start bot</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-hover v-slot="{ hover }">
                    <v-btn
                      v-if="item.isActive"
                      @click="handleTurnOnTurnOff(item.id, item.isActive)"
                      small
                      elevation="0"
                      class="stop-bot action"
                      fab
                      dark
                      color="blue"
                      :class="{ 'on-hover': hover }"
                    >
                      <v-icon
                        :alt="item.id"
                        v-on="on"
                        v-bind="attrs"
                        :class="{ rotating: !hover }"
                        dark
                      >
                        {{ hover ? "mdi-pause-octagon" : "mdi-cog" }}
                      </v-icon>
                    </v-btn>
                  </v-hover>
                </template>
                <span>Bot is currently in work.</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <router-link
                    style="text-decoration: none; color: inherit"
                    :to="{ name: 'Replies', params: { botId: item.id } }"
                  >
                    <v-btn
                      small
                      elevation="0"
                      class="action"
                      fab
                      dark
                      color="orange"
                    >
                      <v-icon :alt="item.id" v-on="on" v-bind="attrs" dark>
                        mdi-forum
                      </v-icon>
                    </v-btn>
                  </router-link>
                </template>
                <span>Edit replies</span>
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
                <span>Edit bot configuration</span>
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
                <span>Click if you want to delete this bot.</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-row>
        <v-btn
          @click="handleAdd"
          class="add-bot"
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
          :show="this.editBotDialogForm.show"
          :callback="this.editBotDialogForm.callback"
          :hide="this.hideEditDialogForm"
        />
        <DialogForm
          :onlyCredentials="true"
          :requireFields="true"
          :show="this.addBotDialogForm.show"
          :callback="this.addBotDialogForm.callback"
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
  name: "Panel",
  components: {
    WarringAlert,
    DialogForm,
  },
  data: () => ({
    headers: [
      // {
      //   text: "Image",
      //   sortable: false,
      //   value: "img",
      // },
      { text: "Username", value: "username", align: "left" },
      {
        text: "Actions",
        value: "id",
        sortable: false,
        class: "actions-header",
        align: "right",
      },
    ],
    bots: [],
    alertValues: {
      callback: () => null,
      text: "Are you sure you want to delete bot? You won't be able to restore it after this action.",
      show: false,
    },
    editBotDialogForm: {
      callback: () => null,
      show: false,
    },
    addBotDialogForm: {
      callback: () => null,
      show: false,
    },
  }),
  methods: {
    addBotsToTable: function (bots) {
      bots.map(({ _id, instagramUrl, isActive }) => {
        const username = instagramUrl
          .replace("https://www.instagram.com/", "")
          .replace("/", "")
          .trim();

        this.bots.push({
          id: _id,
          username,
          url: instagramUrl,
          isActive,
        });
      });
    },
    handleDelete: function (id) {
      const callback = async (withRequest) => {
        if (withRequest) {
          await botService.deleteBot(id);
          this.bots = [];
          this.setUpPage();
        }
        this.alertValues.show = false;
      };

      this.alertValues.callback = callback;
      this.alertValues.show = true;
    },
    handleTurnOnTurnOff: async function (id, currentState) {
      await botService.setActiveValue(id, !currentState);
      this.bots = [];
      this.setUpPage();
    },
    handleEdit: async function (id) {
      const callback = async (username, password, defaultReply) => {
        if (username && password)
          await botService.editCredentials(id, username, password);
        if (defaultReply) await botService.editDefaultReply(id, defaultReply);
        this.hideEditDialogForm();
        this.bots = [];
        this.setUpPage();
      };

      this.editBotDialogForm.callback = callback;
      this.editBotDialogForm.show = true;
    },
    handleAdd: async function () {
      const callback = async (username, password) => {
        if (username && password)
          await botService.createBot({ username, password });

        this.hideAddDialogForm();
        this.bots = [];
        this.setUpPage();
      };

      this.addBotDialogForm.callback = callback;
      this.addBotDialogForm.show = true;
    },
    hideEditDialogForm: function () {
      this.editBotDialogForm.show = false;
    },
    hideAddDialogForm: function () {
      this.addBotDialogForm.show = false;
    },
    setUpPage: async function () {
      const response = await botService.getBots();
      const { user } = response.data;
      const { OwnedBots } = user;
      this.addBotsToTable(OwnedBots);
    },
  },
  async mounted() {
    this.setUpPage();
  },
};
</script>

<style scoped>
.bots-table {
  width: 90%;
}

@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.rotating {
  -webkit-animation: rotating 4s linear infinite;
  -moz-animation: rotating 4s linear infinite;
  -ms-animation: rotating 4s linear infinite;
  -o-animation: rotating 4s linear infinite;
  animation: rotating 4s linear infinite;
}

.on-hover {
  background-color: red !important;
}

.action {
  margin: 0 10px;
}

.actions-header {
  padding-right: 20px !important;
}

.add-bot {
  bottom: 30px !important;
  right: 30px !important;
}
</style>
