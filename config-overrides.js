const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function override(config, env) {
  console.log('Applying custom Webpack configuration...');
  
  // 修改 HtmlWebpackPlugin 配置，禁止生成内联脚本
  config.plugins = config.plugins.map(plugin => {
    if (plugin instanceof HtmlWebpackPlugin) {
      console.log('Modifying HtmlWebpackPlugin options...');
      return new HtmlWebpackPlugin({
        ...plugin.options,
        inject: 'body',
        scriptLoading: 'defer',
      });
    }
    return plugin;
  });

  return config;
};
