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
        <v-list-item-action> </v-list-item-action>
        <v-list-item-title>Panel</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-btn icon @click.stop="expandDrawer" class="btn-expandDrawer">
          <v-icon>{{ expandIcon }}</v-icon>
        </v-btn>
      </v-list-item>

      <br />
      <router-link to="/">
        <v-list-item>
          <v-list-item-action>
            <v-btn icon>
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </v-list-item-action>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
      </router-link>
    </v-list>

    <template v-slot:append>
      <div class="pa-4">
        <v-icon v-if="mini">mdi-logout</v-icon>
        <v-btn v-if="!mini" block>Logout</v-btn>
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
</style>