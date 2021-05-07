const merge = require('webpack-merge');
// const tsImportPluginFactory = require('ts-import-plugin');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  parallel: false, // 关闭打包时多线程，解决vant样式丢失（可能是ts-import-plugin loader在多线程下工作不正常引起的）
  productionSourceMap: false,
  devServer: {
    open: true, // 使用npm run serve 之后是否自动在游览器中打开项目
    port: 9990, // 端口号
    proxy: {
      '/apiProxy': {
        target:
          'https://www.fastmock.site/mock/ee9ccce0199bf9b1782b95a5687538ae/api',
        changeOrigin: true,
        pathRewrite: (path) => path.replace('/apiProxy', ''),
      },
    },
  },
};
