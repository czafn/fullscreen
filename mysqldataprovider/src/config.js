const config =  {
  listenport:process.env.listenport || 3008,
  issmsdebug:process.env.issmsdebug || false,
  secretkey:'catltestrestful',
  logdir:'../../dist/log',
  mysqlconfig:{
    host: process.env.mysqlhost || '121.204.135.87',
  	user: process.env.mysqluser || 'root',
  	password: process.env.mysqlpassword || '',
  	database: process.env.mysqldb || 'catltest'
  }
};


module.exports = config;
