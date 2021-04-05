module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {
    //Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
    resolve: {
      symlinks: false,
    },
  },
  transpileDependencies: ['@coreui/utils', '@coreui/vue'],
  devServer: {
    hot: true,
    host: 'adm-keuangan.test',
    disableHostCheck: true,
    https: true,
  },
}
