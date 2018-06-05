const mysqldb = require('../models/dbconnection');

const startviews = (app)=>{
  //http://localhost:3005/apisys/getDataDict
  app.get('/warningf/getwarningf', (req, res)=> {
    const sql = `SELECT * FROM MA_WARNING_F`;
    mysqldb.load(sql).then((rows)=>{
      res.json(rows);
    })
  });



};

module.exports= startviews;
