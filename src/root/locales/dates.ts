import { IntlDateTimeFormats } from 'vue-i18n';

export const datetimeFormats: IntlDateTimeFormats = {
  de: {
    short: {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    },
    long: {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    },
  },
};
