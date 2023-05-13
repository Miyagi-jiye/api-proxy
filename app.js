/**
 * 这段代码的作用是设置Express服务器上的API代理，所以它主要实现了以下几个功能：
 * 1.使用Express的app.use()函数设置允许跨域请求。
 * 2.使用http-proxy-middleware库的createProxyMiddleware()函数设置API代理。
 * 3.设置API代理的目标服务器地址、请求URL重写等相关属性。
 * 4.提供onProxyReq回调函数，可用来修改代理请求的请求头，比如设置Cookie信息和User-Agent等。
 * 5.使用app.listen()函数启动Express服务器并监听指定端口。
 * 这样，当有请求发起时，Express服务器就会代理转发到Bilibili的API服务器，并将响应返回给客户端。使用这种方式，你可以轻松地通过自己的服务器向Bilibili的API接口进行访问。
 */
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require("path");
const app = express();
const port = 3000; //端口号

// 允许跨域请求
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', '*');
  next();
});

// 设置引导页，首页
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// 设置代理
app.use('/api', createProxyMiddleware({
  target: 'https://api.bilibili.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // URL重写
  },
  // 修改请求头信息,带上Cookie和User-Agent
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('Cookie', `buvid3=A2E2AEC8-F1EF-37CE-D1E1-000F43263DC685021infoc; b_nut=1675422785; i-wanna-go-back=-1; _uuid=4BBC81FF-956A-F7CB-F678-B710E9C110668585551infoc; DedeUserID=24772083; DedeUserID__ckMd5=86ebfc6bf09a8e2b; CURRENT_FNVAL=4048; rpdid=|(k|~J|m~Jk)0J'uY~lRkk)u); blackside_state=1; CURRENT_BLACKGAP=1; b_ut=5; LIVE_BUVID=AUTO5216754298911095; buvid4=468A1652-659B-F9B2-B7B6-4D8AF890544386376-023020319-9H%2BeTTp9%2BHWJmMgVd%2BDSqQ%3D%3D; buvid_fp_plain=undefined; is-2022-channel=1; nostalgia_conf=-1; hit-dyn-v2=1; header_theme_version=CLOSE; buvid_fp=2285f4f63c20496aaf2b570efb7b8aee; i-wanna-go-feeds=2; home_feed_column=5; hit-new-style-dyn=1; CURRENT_QUALITY=120; fingerprint=cc35dca9d474b9781bd81e29c518bb37; CURRENT_PID=b5de3da0-d02d-11ed-8c61-d55daa911fd1; FEED_LIVE_VERSION=V8; bp_video_offset_24772083=784644182485500000; innersign=0; b_lsid=93121E4D_18813430B26; browser_resolution=1600-881; SESSDATA=72146964%2C1699502343%2Cbeeba%2A52; bili_jct=58405dfc1a9171a24672558aafbafd95; sid=6r4zgkh9`); // 替换为实际的SESSDATA值
  }
}));

app.listen(port, () => console.log(`API 接口运行在 http://127.0.0.1:${port}`));
