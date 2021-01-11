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
            ><template v-slot:[`item.img`]="{ item }">
              <v-avatar>
                <img :src="item.profileImg" :alt="item.username" /> </v-avatar
            ></template>
            <template v-slot:[`item.id`]="{ item }">
              <v-btn small elevation="0" class="ev" fab dark color="green">
                <v-icon :alt="item.id" dark> mdi-play </v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Panel",
  data: () => ({
    headers: [
      {
        text: "Image",
        sortable: false,
        value: "img",
      },
      { text: "Username", value: "username" },
      { text: "Actions", value: "id", sortable: false },
    ],
    bots: [
      {
        profileImg:
          "https://instagram.flcj1-1.fna.fbcdn.net/v/t51.2885-19/s320x320/69930074_649809915546587_6893657384661549056_n.jpg?_nc_ht=instagram.flcj1-1.fna.fbcdn.net&_nc_ohc=6gLKZKokh70AX-fkJDP&tp=1&oh=bbd43cf98ffc73472a124fd22c7288de&oe=60258BB5",
        username: "username",
        url: "https://www.instagram.com/welovewebdesign/",
      },
      {
        profileImg:
          "https://instagram.flcj1-1.fna.fbcdn.net/v/t51.2885-19/s320x320/69930074_649809915546587_6893657384661549056_n.jpg?_nc_ht=instagram.flcj1-1.fna.fbcdn.net&_nc_ohc=6gLKZKokh70AX-fkJDP&tp=1&oh=bbd43cf98ffc73472a124fd22c7288de&oe=60258BB5",
        username: "username",
        url: "https://www.instagram.com/welovewebdesign/",
      },
    ],
  }),
};
</script>

<style scoped>
.bots-table {
  width: 90%;
}
</style>
