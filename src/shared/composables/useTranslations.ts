import { useI18n } from 'vue-i18n';
import * as enTranslations from '@/root/locales/en.json';
import * as ltTranslations from '@/root/locales/lt.json';

export type TranslationKeyType = keyof typeof enTranslations | keyof typeof ltTranslations | string;

export type TranslationFun = (key?: TranslationKeyType, vars?: Record<string, unknown>) => string;

export interface UseTranslationsType {
  t: TranslationFun;
}

export const useTranslations = (): UseTranslationsType => {
  const { t } = useI18n();
  const translate = (key?: string, vars: Record<string, unknown> = {}) => (key ? t(key, vars) : '');
  return { t: translate };
};
