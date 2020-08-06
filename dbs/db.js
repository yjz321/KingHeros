// 导入mongodb模块   并且创建一个客户端对象
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectId;

// 数据库地址
const url = 'mongodb://localhost:27017';

// 声明数据库名
const dbName = 'king';

// 暴露接口
module.exports = {
  // 查询全部
  find(collectionName, query, callback) {
    // 调用连接数据库的方法
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {

      // console.log("连接成功");

      const db = client.db(dbName);

      // 选择使用的集合
      const collection = db.collection(collectionName);

      collection.find(query).toArray(function (err, docs) {
        // console.log("Found the following records");
        // console.log(docs)
        callback(docs);

        //   关闭数据库连接
        client.close();
      });
    })
  },

  // 具体查询
  findOne(collectionName, query, callback) {
    // 调用连接数据库的方法
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {

      // console.log("连接成功");

      const db = client.db(dbName);

      // 选择使用的集合
      const collection = db.collection(collectionName);

      collection.findOne(query, function (err, docs) {
        // console.log("Found the following records");
        // console.log(docs)
        callback(docs);

        //   关闭数据库连接
        client.close();
      });
    })
  },

  // 新增
  insertOne(collectionName, insertData, callback) {
    // 调用连接数据库的方法
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {

      // console.log("连接成功");

      const db = client.db(dbName);

      // 选择使用的集合
      const collection = db.collection(collectionName);

      // 插入单条数据
      collection.insertOne(insertData, function (err, result) {
        // console.log("连接成功");
        // console.log(result);
        callback(result);

        //   关闭数据库连接
        client.close();
      });
    })
  },

  // 删除
  deleteOne(collectionName, query, callback) {
    // 调用连接数据库的方法
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {

      // console.log("连接成功");

      const db = client.db(dbName);

      // 选择使用的集合
      const collection = db.collection(collectionName);

      // 删除数据
      collection.deleteOne(query, (err, result) => {
        // console.log(result);
        callback(result)

        // 关闭数据库
        client.close();
      })


    })
  },

  // 修改
  updateOne(collectionName, query, updateData, callback) {
    // 调用连接数据库的方法
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {

      // console.log("连接成功");

      const db = client.db(dbName);

      // 选择使用的集合
      const collection = db.collection(collectionName);

      // 修改数据
      collection.updateOne(query, { $set: updateData }, (err, result) => {
        // console.log(result);
        callback(result)

        // 关闭数据库
        client.close();
      })

    })
  },

  // 暴露ObjectId
  ObjectId

}
