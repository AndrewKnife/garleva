import '@kk-digital/ui-library/dist/ui-library.css';
import './root/main.css';
import '@/shared/assets/styles/sentry.css';

import './root/registerServiceWorker';

import { createApp } from 'vue';
import { globalComponents } from '@/shared/components';
import { sentry } from '@/shared/services/sentry';
import { composition } from './root/composition';
import { router } from './root/router';
import { i18n } from './root/i18n';
import App from './root/App.vue';

createApp(App)
  .use(composition)
  .use(globalComponents)
  .use(i18n)
  .use(router)
  .use(sentry)
  .mount('#app');
