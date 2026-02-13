declare module '*.vue' {

  import type { DefineComponent } from 'vue';

  const component: DefineComponent<{}, {}, any>;
  
  export default component;

}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';