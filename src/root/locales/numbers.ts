import { IntlNumberFormats } from 'vue-i18n';

export const numberFormats: IntlNumberFormats = {
  de: {
    currency: {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    currencyShort: {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    },
  },
};
