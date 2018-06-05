const mysqldb = require('../models/dbconnection');

const startviews = (app)=>{
  //http://localhost:3005/apisys/getDataDict
  app.get('/working/getcatlworking', (req, res)=> {
    const sql = `SELECT RDB,日期,cycle数,CATL项目名称,电芯最高温度,电芯最低温度,运行等效温差,充电次数 FROM MA_CATL_WORKING`;
    mysqldb.load(sql).then((rows)=>{
      res.json(rows);
    });
  });

  app.get('/working/cycle', (req, res)=> {
    const sql = `SELECT cycle数 as name,count(cycle数) as value FROM MA_CATL_WORKING  group by cycle数`;
    mysqldb.load(sql).then((rows)=>{
      res.json(rows);
    });
  });

  app.get('/working/celltemperature', (req, res)=> {//电芯最高温度,电芯最低温度
    const sql = `SELECT 电芯最高温度-电芯最低温度 as name,sum(电芯最高温度-电芯最低温度) as value FROM MA_CATL_WORKING  group by (电芯最高温度-电芯最低温度)`;
    mysqldb.load(sql).then((rows)=>{
      res.json(rows);
    });
  });

  app.get('/working/cyclecount', (req, res)=> {//充电次数
    const sql = `SELECT 充电次数 as name,count(充电次数) as value FROM MA_CATL_WORKING  group by 充电次数`;
    mysqldb.load(sql).then((rows)=>{
      res.json(rows);
    });
  });

  app.get('/working/dxtemperature', (req, res)=> {//运行等效温差
    const sql = `SELECT 运行等效温差 as name,count(运行等效温差) as value FROM MA_CATL_WORKING  group by 运行等效温差`;
    mysqldb.load(sql).then((rows)=>{
      res.json(rows);
    });
  });

};

module.exports= startviews;
