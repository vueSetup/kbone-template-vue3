/**
 * 配置参考：https://wechat-miniprogram.github.io/kbone/docs/config/
 */

module.exports = {
  origin: "https://test.miniprogram.com",
  entry: "/",
  router: { app: ["/"] },
  redirect: {
    notFound: "app",
    accessDenied: "app",
  },
  generate: {
    autoBuildNpm: true,
    globalVars: [["SVGElement", "function SVGElement() {}"]],
  },
  app: {
    navigationBarTitleText: "蜂鸟音乐奖-全国级即时网络比赛",
  },
  appExtraConfig: {
    sitemapLocation: "sitemap.json",
  },
  global: {
    loadingText: "加载中...",
  },
  pages: {},
  optimization: {
    domSubTreeLevel: 10,

    elementMultiplexing: true,
    textMultiplexing: true,
    commentMultiplexing: true,
    domExtendMultiplexing: true,

    styleValueReduce: 5000,
    attrValueReduce: 5000,
  },
  projectConfig: {
    appid: "wx26ffe3029954ff5c",
    projectname: "蜂鸟音乐-全国级别",
  },
}
