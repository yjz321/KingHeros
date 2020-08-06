// 导入模板
var Crawler = require("crawler");

// 获取接口
var dta = require("../dbs/db");



var c = new Crawler({
    maxConnections: 10,
    // This will be called for each crawled page
    callback: function (error, res, done) {
        if (error) {
            console.log(error);
        } else {
            var $ = res.$;
            $(".herolist>li").each((index, ele) => {
                // 数据
                let names = $(ele).find("a").text();
                let alias = $(ele).find("a").text();
                let imgs = $(ele).find(">a>img").attr("src");
                // 判断能否添加
                if (imgs != undefined && names != undefined) {
                    // 向数据库添加
                    dta.insertOne("HeroInfo", { names, alias, imgs }, result => {
                        console.log(result);
                    })
                }
            })

        }
        done();
    }
});

// 爬取的地址
c.queue("https://pvp.qq.com/web201605/herolist.shtml");