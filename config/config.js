import { defineConfig } from 'umi';

export default defineConfig({
  model: {},
  antd: {
    theme: {
      token: {
        colorPrimary: '#FA541C',
        borderRadius: 1
      }
    },
  },
  request: {},
  initialState: {},
  fastRefresh: true,
  dva: {
    immer: {},
    extraModels: [],
  },
  layout: false,
  locale: {
    antd: false, // 如果项目依赖中包含 `antd`，则默认为 true
    baseNavigator: true, //开启浏览器语言检测
    baseSeparator: '-', //语言（Language）与国家（Country） 之间的分割符
    default: 'zh-CN', //项目默认语言
    title: false, //开启标题国际化
    useLocalStorage: true, //自动使用 localStorage 保存当前使用的语言
  },
  ignoreMomentLocale: true,
  proxy: {
    "/api": {
      "target": "http://localhost:81/api/",
      "changeOrigin": true,
      "pathRewrite": { "^/api": "" }
    },
  },
});
