import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';

const theme = {
  themes: {
    light: {
      primary: colors.shades.black,
      secondary: colors.grey.darken1,
      accent: colors.shades.black,
      error: colors.red.accent3,
    },
    dark: {
      primary: colors.blue.lighten3,
    },
  },
};

const opts = {
  theme,
  icons: {
    iconfont: 'mdiSvg',
  },
};

Vue.use(Vuetify);

export default new Vuetify(opts);
