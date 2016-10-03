const KEY = 'ntalk.sid', SECRET = 'ntalk';

var express = require('express'), load = require('express-load'), path = require('path');//, routes = require('./routes');
var app = express();

var mongoose = require('mongoose');
global.db = mongoose.connect('mongodb://localhost/ntalk');

var methodOverride = require('method-override');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

//var error = require(path.join(__dirname,'middleware//error.js'));
//var error = require('.//middleware//error');
var error = require('./middleware/error');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var MemoryStore = require('session-memory-store')(session); 
var sessOpts = { secret: SECRET, key: KEY, store: new MemoryStore() }; 
var sessionCall = session(sessOpts);

var cookie = cookieParser(SECRET);

app.use(cookie);
app.use(sessionCall);//session()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'))

//app.use(app.router);

app.use(express.static(path.join(__dirname, 'public')));

load('models')
  .then('controllers')
  .then('routes')
  .into(app);

app.use(error.notFound);
app.use(error.serverError);

/*app.listen(3000, function () {
  console.log("Ntalk no ar.");
});*/

var server = require('http').createServer(app);
    //io = require('socket.io').listen(server);

/*
io.set('authorization', function(data, accept) {
  cookie(data, {}, function(err) {
      var sessionID = data.signedCookies[KEY];
      sessOpts.store.get(sessionID, function(err, session) {
      if (err || !session) {
        accept(null, false);
      } else {
        data.session = session;       
        accept(null, true);
      }
    });
  });
});
*/

/*
io.use(function(socket, next) {
  var data = socket.request;
  cookie(data, {}, function(err) {
    var sessionID = data.signedCookies[KEY];
    sessOpts.store.get(sessionID, function(err, session) {
      if (err || !session) {
        return next(new Error('Acesso negado!'));
      } else {
        socket.handshake.session = session;
        return next();
      }
    });
  });
});*/

//load('sockets').into(io);

server.listen(3000, function () {
  console.log("Ntalk no ar.");
});