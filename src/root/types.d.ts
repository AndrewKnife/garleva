/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module '*.svg?inline' {
  import Vue, { VueConstructor } from 'vue';
  const content: VueConstructor<Vue>;
  export default content;
}
declare module '*.svg' {
  const content: any;
  export default content;
}
declare module '*.png' {
  const value: string;
  export default value;
}
declare module 'vue3-popper';
declare module 'pdfjs-dist/build/pdf.worker.entry';
