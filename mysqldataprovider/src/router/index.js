const startrouter = (app)=>{
  require('./warningf.js')(app);
  require('./working.js')(app);
  require('./deviceext.js')(app);
};


exports.startrouter = startrouter;
