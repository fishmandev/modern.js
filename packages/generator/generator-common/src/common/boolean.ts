import { Schema } from '@modern-js/easy-form-core';
import { i18n, localeKeys } from '@/locale';

export enum BooleanConfig {
  NO = 'no',
  YES = 'yes',
}

export const BooleanConfigName: Record<string, () => string> = {
  [BooleanConfig.NO]: () => i18n.t(localeKeys.boolean.no),
  [BooleanConfig.YES]: () => i18n.t(localeKeys.boolean.yes),
};

export const getBooleanSchemas = (
  YesChildSchemas?: Schema[],
  NoChildSchemas?: Schema[],
): Schema[] => [
  {
    key: BooleanConfig.NO,
    label: BooleanConfigName[BooleanConfig.NO],
    isObject: Boolean(NoChildSchemas),
    items: NoChildSchemas,
  },
  {
    key: BooleanConfig.YES,
    label: BooleanConfigName[BooleanConfig.YES],
    isObject: Boolean(YesChildSchemas),
    items: YesChildSchemas,
  },
];
