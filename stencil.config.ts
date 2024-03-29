import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 's-vis',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'dist-custom-elements-bundle'
    },
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
};
