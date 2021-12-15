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
        <v-list-item>
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
      <div>
        <v-icon v-if="mini">mdi-logout</v-icon>
        <v-btn v-if="!mini" class="logout" light>Logout</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Drawer",
  data: () => ({
    mini: true,
    drawer: true,
    expandIcon: "mdi-chevron-right",
    menuItems: [
      { route: "/", icon: "mdi-home", text: "Home" },
      { route: "/panel", icon: "mdi-dns", text: "Panel" },
      { route: "/login", icon: "mdi-login", text: "Log in" },
      { route: "/automated-responses", icon: "mdi-forum", text: "Automated responses" },
    ],
  }),
  methods: {
    expandDrawer: function () {
      this.mini = !this.mini;
      this.expandIcon = this.mini ? "mdi-chevron-right" : "mdi-chevron-left";
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
</style>