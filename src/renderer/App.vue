<template>
  <v-app>
    <v-gm-window-bar />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
}
</script>

<style lang="stylus">
html
  overflow-y: auto !important
</style>
