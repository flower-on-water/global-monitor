/**
 *  @typedef { import("@vue/cli-service").ProjectOptions } Options
 *  @type { Options }
 */
module.exports = {
  pluginOptions: {
    electronBuilder: {
      outputDir: 'dist',
      mainProcessFile: './src/main.ts',
      mainProcessWatch: ['src/*.ts'],
      /**
       * @param config { import('webpack-chain') }
       */
      chainWebpackRendererProcess: (config) => {
        config
          .entry('app')
          .clear()
          .add('./src/renderer/index.ts');
      },
    },
  },
  chainWebpack(config) {
    config
      .plugin('VuetifyLoaderPlugin')
      // https://github.com/vuetifyjs/vuetify-loader#automatic-imports
      .tap((args) => {
        const updatedArgs = [...(args.length ? args : [{}])];

        /**
         * This function will be called for every tag used in each vue component
         * It should return an array, the first element will be inserted into the
         * components array, the second should be a corresponding import
         *
         * originalTag - the tag as it was originally used in the template
         * kebabTag    - the tag normalised to kebab-case
         * camelTag    - the tag normalised to PascalCase
         * path        - a relative path to the current .vue file
         * component   - a parsed representation of the current component
         */
        function match(_, { kebabTag, camelTag }) {
          if (!kebabTag.startsWith('v-gm-')) {
            return null;
          }

          return [camelTag, `import ${camelTag} from '@/renderer/components/${camelTag}.vue'`];
        }

        updatedArgs[0].match = match;

        return updatedArgs;
      });
  },
};
