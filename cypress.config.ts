import { defineConfig } from 'cypress';
import webpackPreprocessor from '@cypress/webpack-preprocessor';
import path from 'path';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8100',
    // @ts-expect-error - property only recognized by Cypress
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
      options: {
        main: path.resolve(__dirname, 'src/main.cypress.ts'),
        port: 8100
      }
    },
    setupNodeEvents(on, config) {
      const options = {
        webpackOptions: {
          // Le indicamos a Webpack dónde buscar módulos y extensiones
          resolve: {
            // Para poder importar .ts y .js
            extensions: ['.ts', '.js'],
            // Siempre buscar primero en tu node_modules raíz
            modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
          },
          module: {
            rules: [
              {
                test: /\.ts$/,
                exclude: [/node_modules/],
                use: [
                  {
                    loader: 'ts-loader',
                    options: {
                      // Usa tu tsconfig principal
                      configFile: path.resolve(__dirname, 'tsconfig.json'),
                      transpileOnly: true
                    },
                  },
                ],
              },
            ],
          },
        },
        watchOptions: {},
      };

      // Registra el preprocesador
      on('file:preprocessor', webpackPreprocessor(options));

      return config;
    },
  },
});
