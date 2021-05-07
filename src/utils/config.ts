const prodConfig = {
  prodOrDev: 'prod', // 正式环境
  apiHost: '/apiProxy',
};

const devConfig = {
  prodOrDev: 'dev', // 开发环境
  apiHost: '/apiProxy',
};

const config = process.env.NODE_ENV === 'development' ? devConfig : prodConfig;

export default config;
