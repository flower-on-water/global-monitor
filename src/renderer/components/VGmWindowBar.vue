<template>
  <v-system-bar
    v-show="isShow"
    lights-out fixed window app
    height="32"
    class="pa-0"
    @dblclick="maximize"
  >
    <v-container class="pa-0 ma-0">
      <v-row no-gutters dense>
        <v-col id="drag-region" class="ma-1" />
        <v-col cols="auto">
          <v-btn
            v-for="(options, action) in actions"
            :key="action"
            :color="options.color"
            text small tile input-value
            height="32"
            class="pa-0"
            width="46"
            @click="options.handler"
          >
            <v-icon small class="ma-0">{{ options.icon }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-system-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { remote, BrowserWindow } from 'electron';
import { forOwn } from 'lodash-es';
import colors from 'vuetify/lib/util/colors';


interface IWindowBarActionOptions {
  [p: string]: any;
  icon: string;
  color: string;
  handler(): void;
  init?(): void;
}

@Component
export default class VGmWindowBar extends Vue {
  isShow = true;
  actions: {
    [actions: string]: IWindowBarActionOptions;
  };

  maximize() {
    this.actions.maximize && this.actions.maximize.handler();
  }

  protected onFullScreen(win: BrowserWindow) {
    // here this === VueComponent
    win.on('enter-full-screen', () => { this.isShow = false; });
    win.on('leave-full-screen', () => { this.isShow = true; });
  }

  constructor() {
    super();

    const win = remote.getCurrentWindow();

    this.actions = {
      // only macOS, Windows (isMaximizable)
      ...(win.isMinimizable() ? {
        minimize: {
          color: colors.grey.base,
          icon: 'mdi-minus',
          handler() {
            win.minimize();
          },
        },
      } : {}),
      // only macOS, Windows (isMaximizable)
      ...(win.isMaximizable() ? {
        maximize: {
          isWinMaximized: win.isMaximized(),
          color: colors.grey.base,
          get icon() {
            return this.isWinMaximized ? 'mdi-window-restore' : 'mdi-window-maximize';
          },
          handler() {
            win.isMaximized() ? win.unmaximize() : win.maximize();
          },
          init() {
            win.on('maximize', () => {
              this.isWinMaximized = true;
            });
            win.on('unmaximize', () => {
              this.isWinMaximized = false;
            });
          },
        },
      } : {}),
      close: {
        color: colors.red.accent4,
        icon: 'mdi-window-close',
        handler() {
          win.close();
        },
      },
    };

    forOwn(this.actions, (action) => {
      action.init && action.init();
    });

    // here this !== VueComponent
    this.onFullScreen(win);
  }
}
</script>

<style scoped lang="stylus">
.v-system-bar
  #drag-region
    // https://electronjs.org/docs/api/frameless-window#draggable-region
    -webkit-user-select: none;
    -webkit-app-region: drag;

  .v-btn
    cursor default

    &:focus::before
      opacity 0
    &:hover::before
      opacity 0.3
</style>
