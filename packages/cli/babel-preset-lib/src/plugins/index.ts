import { createBabelChain, BabelChain } from '@modern-js/babel-chain';
import { upath } from '@modern-js/utils';
import { ILibPresetOption } from '../types';
import { aliasPlugin } from './alias';
import { envPlugin } from './env';
import { globalVarsPlugin } from './globalVar';

export const getPlugins = (libPresetOption: ILibPresetOption): BabelChain => {
  const chain = createBabelChain();

  const finalPlugins = [];

  if (libPresetOption.globalVars) {
    finalPlugins.push(globalVarsPlugin(libPresetOption.globalVars));
  }

  if (libPresetOption.envVars) {
    finalPlugins.push(envPlugin(libPresetOption.envVars));
  }
  if (libPresetOption.alias) {
    finalPlugins.push(aliasPlugin(libPresetOption.alias));
  }

  for (const plugin of finalPlugins) {
    const [name, opt] = plugin;
    chain.plugin(name).use(upath.normalizeSafe(require.resolve(name)), [opt]);
  }

  return chain;
};
