import './root/main.css';

import { createApp } from 'vue';
import { router } from './root/router';
import { i18n } from './root/i18n';
import App from './root/App.vue';

createApp(App).use(i18n).use(router).mount('#app');
