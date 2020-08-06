// 导入模块
const express = require("express");

//  导入mongodb
var dta = require("./dbs/db");

// 导入multer模板
var multer = require('multer');

// 导入url模板
var url = require('url');

var path = require('path');

// 设置上传的文件保存的地址
var upload = multer({ dest: 'views/imgs/' });

//  创建服务器对象
const app = express();

// 静态资源托管
app.use(express.static("views"));

// 查询数据是否正确
app.get("/listUser", (req, res) => {
  // 查询的数据
  var users = req.query.userName;
  var pwds = req.query.userPass;
  // 数据查询
  dta.findOne("UserInfo", { users, pwds }, result => {
    console.log(result);
    // 返回数据
    res.send(JSON.stringify(result));
  });

});


// 查询数据是否存在
app.get("/userOne", (req, res) => {
  // 查询的数据
  var users = req.query.users;
  // 数据查询
  dta.findOne("UserInfo", { users }, result => {
    console.log(result);

    // 返回数据
    res.send(JSON.stringify(result));
  });

});

// 具体查询
app.get("/listOne", (req, res) => {
  // 查询的数据
  var searchOn = url.parse(req.headers.referer, true).query._id;
  // 数据查询
  dta.findOne("HeroInfo", { _id: dta.ObjectId(searchOn) }, result => {
    // 返回数据
    res.send(JSON.stringify(result));
  });

});

// 查询
app.get("/list", (req, res) => {
  // 页码
  const pageIndex = Number(req.query.pageIndex);
  // 每页的条数
  const pageSize = Number(req.query.pageSize);
  // 查询的数据
  const searchOn = req.query.searchOn;
  // 数据查询
  dta.find("HeroInfo", searchOn, result => {
    // 起始页
    let start = (pageIndex - 1) * pageSize;
    // 终止页
    let end = pageIndex * pageSize;
    // 返回数据
    res.send({
      data: result.slice(start, end),
      pageSum: Math.ceil(result.length / pageSize)
    });
  });
});

// 添加英雄信息
app.post("/addHero", upload.single('icon'), (req, res) => {
  var names = req.body.heroName;
  var alias = req.body.skill;
  var imgs = path.join("imgs", req.file.filename)
  // spl语句
  dta.insertOne("HeroInfo", { names, alias, imgs }, result => {
    // 转成字符串
    res.send(JSON.stringify({
      msg: "数据添加成功",
      status: 1
    }));
  })
});

// 添加用户信息
app.post("/addUser", upload.none(), (req, res) => {
  console.log(req.body);

  var users = req.body.userName;
  var pwds = req.body.userPass;
  // spl语句
  dta.insertOne("UserInfo", { users, pwds }, result => {
    // 转成字符串
    res.send(JSON.stringify({
      msg: "数据添加成功",
      status: 1
    }));
  })
});



// 删除
app.get("/delete", (req, res) => {
  var id = req.query.id;
  console.log(id);
  // spl语句
  dta.deleteOne("HeroInfo", { _id: dta.ObjectId(id) }, result => {
    // 转成字符串
    res.send(JSON.stringify({
      msg: "数据删除成功",
      status: 0
    }));
  })
})

// 修改
app.post("/updateUser", upload.single('icon'), (req, res) => {
  console.log(req.body);
  // 查询的id
  var searchOn = url.parse(req.headers.referer, true).query._id;
  console.log(searchOn);

  // form数据
  var names = req.body.heroName;
  var alias = req.body.skill;
  var imgs = path.join("imgs", req.file.filename);
  console.log(imgs);

  // spl语句
  dta.updateOne("HeroInfo", { _id: dta.ObjectId(searchOn) }, { names, alias, imgs }, result => {
    console.log(JSON.stringify(result));

    // 转成字符串
    res.send(JSON.stringify({
      msg: "数据修改成功",
      status: 1
    }));
  })
});

// 开启监听
app.listen(3000);