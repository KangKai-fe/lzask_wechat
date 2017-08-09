var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')


/* multiple htmls for dev */
var path = require('path');
var glob = require('glob');

function getEntry(globPath) {
  var entries = {},
    basename, tmp, pathname;

  glob.sync(globPath).forEach(function(entry) {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/').splice(-3);
    // pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
    pathname = basename; // 正确输出js和html的路径
    entries[pathname] = entry;
  });
  console.log('dev-entrys:');
  console.log(entries);
  return entries;
}

var pages = getEntry('./src/pages/**/*.html');
console.log('dev pages----------------------');

if (!baseWebpackConfig.plugins) {
  baseWebpackConfig.plugins = [];
}
for (var pathname in pages) {
  console.log('filename:' + pathname + '.html');
  console.log('template:' + pages[pathname]);
  // 配置生成的html文件，定义路径等
  var conf = {
    filename: pathname + '.html',
    template: pages[pathname], // 模板路径
    inject: 'body', // js插入位置
    chunks: [pathname]
  };
  // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
  baseWebpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin

    /* origin index page when dev */
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),

    new FriendlyErrorsPlugin()
  ]
})
