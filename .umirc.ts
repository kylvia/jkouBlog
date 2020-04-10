import { defineConfig } from 'umi';

export default defineConfig({
  // routes: [
  //   { path: '/', component: '@/pages/Home/index' },
  //   { path: '/about', component: '@/pages/About/index' },
  // ],
  antd: {
    dark: true, // 开启暗色主题
  },
  proxy: {
    '/api/': {
      target: 'http://localhost:8081/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
