/**
 * 配置参考：https://wechat-miniprogram.github.io/kbone/docs/config/
 */
module.exports = {
  origin: 'https://test.miniprogram.com',
  entry: '/',
  router: {
    home: ['/(home|index)?']
  },
  redirect: {
    notFound: 'home',
    accessDenied: 'home'
  },
  generate: {
    autoBuildNpm: 'npm',
    globalVars: [['SVGElement', 'function SVGElement() {}']]
  },
  app: {
    navigationBarTitleText: '宁聚家年华',
    navigationStyle: 'custom'
  },
  global: {
    rem: true
  },
  projectConfig: {
    projectname: 'lining',
    appid: 'wx8adfe603fbe1042e',
    ignoreDevUnusedFiles: false
  }
}
