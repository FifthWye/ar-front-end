<template>
   <v-app>
    <v-main class="background">
      <drawer/>
      <v-container fluid class="fill-height bg">
        <v-row align="center" justify="center">

        </v-row>
      </v-container>
    </v-main>
   </v-app>
</template>

<script>
import Drawer from '../../components/Drawer.vue'

export default {
  name: 'Panel',
  components: {
    Drawer
  }
}
</script>
