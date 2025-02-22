import * as path from 'path';
import { useAppContext, createPlugin } from '@modern-js/core';
import { createRuntimeExportsUtils, upath } from '@modern-js/utils';

export default createPlugin(
  () => {
    let bffExportsUtils: any;
    const runtimeModulePath = path.resolve(__dirname, '../runtime');

    return {
      config() {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const appContext = useAppContext();
        bffExportsUtils = createRuntimeExportsUtils(
          appContext.internalDirectory,
          'server',
        );

        return {
          source: {
            alias: { '@modern-js/runtime/server': bffExportsUtils.getPath() },
          },
        };
      },
      modifyEntryImports() {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { appDirectory } = useAppContext();
        const runtimePath = upath.normalizeSafe(
          require.resolve(`@modern-js/runtime`, {
            paths: [appDirectory],
          }),
        );

        const currentFile = bffExportsUtils.getPath();

        const runtimeDir = path.dirname(runtimePath);

        const relativeBffPath = path.relative(
          path.dirname(currentFile),
          path.join(runtimeDir, './exports/server'),
        );
        const relativeRuntimeModulePath = path.relative(
          path.dirname(currentFile),
          runtimeModulePath,
        );

        const relativeFramePath = path.relative(
          path.dirname(currentFile),
          require.resolve('koa'),
        );

        bffExportsUtils.addExport(`const bffRuntime = require('${relativeBffPath}');
           const pluginRuntime = require('${relativeRuntimeModulePath}');
           const Koa = require('${relativeFramePath}')
           module.exports = {
            Koa: Koa,
             ...bffRuntime,
             ...pluginRuntime
           }
          `);
      },
    };
  },
  { name: '@modern-js/plugin-koa' },
);
