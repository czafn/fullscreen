const mysqldb = require('../models/dbconnection');

const startviews = (app)=>{
  //http://localhost:3005/apisys/getDataDict
  app.get('/deviceext/getcarcount', (req, res)=> {
    const sql = `SELECT COUNT(电池系统流水号) FROM 客档信息 WHERE 类型='CAR'`;
    mysqldb.load(sql).then((rows)=>{
      res.json(rows);
    })
  });

  app.get('/deviceext/getbuscount', (req, res)=> {
    const sql = `SELECT COUNT(电池系统流水号) FROM 客档信息 WHERE 类型='BUS'`;
    mysqldb.load(sql).then((rows)=>{
      res.json(rows);
    })
  });

  app.get('/deviceext/getcarusedyear', (req, res)=> {
    const sql = `SELECT 开始使用年份 as name,count(开始使用年份) as value FROM 客档信息  WHERE 类型='CAR' group by 开始使用年份`;
    mysqldb.load(sql).then((rows)=>{
      res.json(rows);
    })
  });

  app.get('/deviceext/getbususedyear', (req, res)=> {
    const sql = `SELECT 开始使用年份 as name,count(开始使用年份) as value FROM 客档信息  WHERE 类型='BUS' group by 开始使用年份`;
    mysqldb.load(sql).then((rows)=>{
      res.json(rows);
    })
  });

  app.get('/deviceext/getprovice', (req, res)=> {
    const sql = `SELECT 省份 as name,count(省份) as value FROM 客档信息 group by 省份`;
    mysqldb.load(sql).then((rows)=>{
      res.json(rows);
    })
  });

  app.get('/deviceext/getproject', (req, res)=> {
    const sql = `SELECT CATL项目名称 as name,count(CATL项目名称) as value FROM 客档信息 group by CATL项目名称`;
    mysqldb.load(sql).then((rows)=>{
      res.json(rows);
    })
  });

};

module.exports= startviews;
