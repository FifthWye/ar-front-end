<template>
  <v-navigation-drawer
    app
    stateless
    value="true"
    color="primary"
    dark
    :mini-variant.sync="mini"
  >
    <v-list color="primary">
      <v-list-item>
        <v-btn icon @click.stop="expandDrawer" class="btn-expandDrawer">
          <v-icon>{{ expandIcon }}</v-icon>
        </v-btn>
      </v-list-item>

      <br />
      <router-link v-for="item in menuItems" :key="item.text" :to="item.route">
        <v-list-item v-if="isShown({ ...item, isAuthorized })">
          <v-list-item-action>
            <v-btn icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-btn>
          </v-list-item-action>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </router-link>
    </v-list>

    <template v-slot:append>
      <div v-if="isAuthorized" @click="handleLogout" class="logout-wrapper">
        <v-icon v-if="mini">mdi-logout</v-icon>
        <v-btn v-if="!mini" class="logout" light>Logout</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { authService } from "../../src/services/authService";

export default {
  name: "Drawer",
  data: () => ({
    mini: true,
    drawer: true,
    expandIcon: "mdi-chevron-right",
    menuItems: [
      {
        route: "/account",
        icon: "mdi-account",
        text: "Account",
        showUnauth: false,
      },
      { route: "/panel", icon: "mdi-dns", text: "Panel", showUnauth: false },

      { route: "/login", icon: "mdi-login", text: "Log in", showUnauth: true },
    ],
  }),
  methods: {
    expandDrawer: function () {
      this.mini = !this.mini;
      this.expandIcon = this.mini ? "mdi-chevron-right" : "mdi-chevron-left";
    },
    handleLogout: function () {
      authService.logout();
    },
    isShown: ({ showUnauth, isAuthorized }) => {
      if (showUnauth === null) return true;
      return isAuthorized
        ? !showUnauth && isAuthorized
        : showUnauth && !isAuthorized;
    },
  },
  computed: {
    isAuthorized: function () {
      return Boolean(localStorage.getItem("token"));
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.v-btn {
  left: -6px;
}

.logout {
  left: initial;
  width: 90%;
}

.logout-wrapper {
  margin-bottom: 10px;
}
</style>