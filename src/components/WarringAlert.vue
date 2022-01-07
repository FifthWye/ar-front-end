<template>
  <v-alert v-model="alert" prominent type="error">
    <v-row align="center">
      <v-col class="grow">
        {{ text }}
      </v-col>
      <v-col class="shrink">
        <v-btn @click="handleYesClick">Yes</v-btn>
        <v-btn @click="callback(false)">No</v-btn>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
export default {
  name: "WarringAlert",
  props: {
    show: Boolean,
    text: String,
    callback: Function,
  },
  data() {
    return {
      alert: false,
    };
  },
  methods: {
    handleYesClick: function () {
      this.callback(true);
    },
  },
  watch: {
    show: function (newVal) {
      this.alert = newVal;
    },
  },
};
</script>

<style scoped>
.v-alert {
  display: absolute;
  position: fixed;
  left: 50%;
  bottom: 50px;
  transform: translate(-50%, -50%);
}

.shrink button:first-child {
  margin-bottom: 5px;
}
</style>