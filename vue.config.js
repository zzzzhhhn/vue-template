// vue.config.js
const path = require("path");
const webpack = require("webpack");
function resolve(dir) {
  return path.join(__dirname, ".", dir);
}
// 是否为生产环境
const isProduction = process.env.NODE_ENV !== "development";

// 本地环境是否需要使用cdn
const devNeedCdn = false;
// cdn链接
const cdn = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  externals: {
    vue: "Vue",
    moment: "moment",
    jquery: "jquery"
  },
  // cdn的css链接
  css: [],
  // cdn的js链接
  js: [
    "//cdn.bootcss.com/vue/2.6.10/vue.min.js",
    "//cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js",
    "//cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js"
  ]
};
if (!isProduction) {
  cdn.js[0] = "//cdn.bootcss.com/vue/2.6.10/vue.js";
}
//依赖包扫描工具
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
//压缩代码
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// gzip压缩
const CompressionPlugin = require("compression-webpack-plugin");
const _UglifyJsPlugin = new UglifyJsPlugin({
  uglifyOptions: {
    //生产环境自动删除console
    compress: {
      drop_debugger: true,
      drop_console: true,
      pure_funcs: ["console.log"]
    }
  },
  sourceMap: false,
  parallel: true
});
const productionGzipExtensions = ["html", "js", "css"];
const _CompressionPlugin = new CompressionPlugin({
  filename: "[path].gz[query]",
  algorithm: "gzip",
  test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
  threshold: 10240, // 只有大小大于该值的资源会被处理 10240
  minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
  deleteOriginalAssets: false // 删除原文件
});
let _ProvidePlugin = new webpack.ProvidePlugin({
  $: "jquery",
  jQuery: "jquery",
  "windows.jQuery": "jquery",
  moment: "moment"
});
let plugins = ["production", "development"].includes(process.env.NODE_ENV)
  ? [_ProvidePlugin]
  : [_ProvidePlugin, _UglifyJsPlugin, _CompressionPlugin];
plugins.push(new BundleAnalyzerPlugin());

module.exports = {
  transpileDependencies: ["vuetify"],
  // 基础路径
  publicPath: "./",
  // 打包输出文件目录
  outputDir: "dist",
  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  lintOnSave: true,
  // webPack 相关配置
  chainWebpack: config => {
    config.output.filename("[name].[hash].js").end();
    // ============注入cdn start============
    config.plugin("html").tap(args => {
      // 生产环境或本地需要cdn时，才注入cdn
      if (isProduction || devNeedCdn) args[0].cdn = cdn;
      return args;
    });
    // ============注入cdn start============
  },
  configureWebpack: {
    externals: isProduction || devNeedCdn ? cdn.externals : {},
    resolve: {
      alias: {
        vue$: "vue/dist/vue.js",
        "@views": resolve("src/views"),
        "@comp": resolve("src/components"),
        "@assets": resolve("src/assets"),
        "@utils": resolve("src/utils"),
        "@mixins": resolve("src/mixins"),
        "@pub": resolve("public")
      }
    },
    plugins: plugins
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // webpack-dev-server 相关配置
  devServer: {
    open: true,
    host: "0.0.0.0",
    port: 8000,
    https: false,
    hotOnly: false,
    proxy: null // string | Object
  }
};
