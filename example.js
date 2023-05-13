#!/usr/bin/env node

const express = require("express");
const path = require("path");
const app = express();
const axios = require("axios");
const router = express.Router();
const port = 8888; //端口号

// 封装log方法
function my_log(req) {
  console.log("GET 请求参数:", req.query);
  console.log("POST 请求参数:", req.params);
  console.log("API 请求路径:", decodeURI(req.url));
}

// 首页
router.get("/", async (req, res) => {
  const filename = "index.html";
  const fullPath = path.join(__dirname, "./public", filename);
  return res.sendFile(fullPath);
});

// 用户详情
router.get("/info", async (req, res) => {
  my_log(req); //打印
  try {
    // 使用axios请求数据
    const response = await axios.get(
      "https://api.bilibili.com/x/space/acc/info",
      {
        params: {
          mid: req.query.mid,
        }, //用户输入的参数
      }
    );
    res.send(response.data); //返回数据给用户
  } catch (error) {
    console.log(error); //服务器输出错误信息
  }
});

// 追番列表
router.get("/list", async (req, res) => {
  my_log(req); //打印
  try {
    // 使用axios请求数据
    const response = await axios.get(
      "https://api.bilibili.com/x/space/bangumi/follow/list",
      {
        params: {
          type: req.query.type, //1：追番
          follow_status: req.query.follow_status, //0：全部的已追番
          pn: req.query.pn, //页码
          ps: req.query.ps, //每页显示的条数
          vmid: req.query.vmid, //用户id
          ts: Date.now(), //时间戳
        }, //用户输入的参数
      }
    );
    res.send(response.data); //返回数据给用户
  } catch (error) {
    console.log(error); //服务器输出错误信息
  }
});

// 搜索用户
router.get("/search", async (req, res) => {
  my_log(req); //打印
  try {
    // 使用axios请求数据
    const response = await axios.get(
      "https://api.bilibili.com/x/web-interface/search/type",
      {
        params: {
          keyword: req.query.keyword,
          page: req.query.page,
          limit: req.query.limit,
          search_type: req.query.search_type,//"bili_user",//只搜索用户信息
        }, //用户输入的参数
      }
    );
    res.send(response.data); //返回数据给用户
  } catch (error) {
    console.log(error); //服务器输出错误信息
  }
});

app.use("/", router); //以 127.0.0.1:8888/ 开头的请求都会进入路由进行匹配

app.listen(port, () => console.log(`API 接口运行在 http://localhost:${port}`));