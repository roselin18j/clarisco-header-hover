const express = require('express');
const https = require('https');
const fs = require('fs');
var cron = require('node-cron');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const session = require('cookie-session');
const expressvalidator = require('express-validator')
const path = require('path');
const async = require('async');
const cors = require('cors');
const compression = require('compression');
const { createProxyMiddleware } = require('http-proxy-middleware');
const morgan = require("morgan")
const keys = require('./config/config.js');
const home = require('./routes/index.js');
// var key = fs.readFileSync(__dirname + '/public/private.key');
// var cert = fs.readFileSync(__dirname + '/public/certificate.crt');
// var options = {
//   key: key,
//   cert: cert
// };

mongoose.set({ strictQuery: false })
mongoose.connect(keys.mongodb.dbstring, { }).then(() => console.log("Mongo DB Connected")).catch((err) => console.error(err));
// mongoose.connect(keys.mongodb.dbstring,{ useNewUrlParser: true },()=>{
//   console.log("Connected to mongoDB");
// });

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open');
});
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

const app = express()



// Compress dynamic responses before route/static middleware.
app.use(compression({ threshold: 1024 }));

app.use(cors({
  origin: 'https://www.clarisco.com',
  methods: ['GET','POST','PUT','DELETE'],
}));

app.use(morgan("dev"));

// app.use(session(({ 
// 	name: 'session',
//     keys: [keys.session.cookieKey,keys.session.cookieKey],
//     // maxAge: 24 * 60 * 60 * 1000 // 24 hours 
// })));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

//setup view engine
app.set('view engine', 'ejs');

// ─────────────────────────────────────────────────────────────
// IMPORTANT: specific static paths MUST be registered BEFORE the
// generic '/public' static handler below. Express walks static
// middleware in registration order and serves the first match it
// finds on disk. If '/assets/css/style.css' also exists under
// 'public/assets/css/style.css', the generic handler used to win
// and this config below was never actually reached.
// ─────────────────────────────────────────────────────────────

app.use('/assets', express.static(path.join(__dirname, 'assets'), {
  maxAge: '30d',           // browser + CDN cache for 30 days
  etag: true,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.css') || filePath.endsWith('.js')) {
      res.setHeader('Cache-Control', 'public, max-age=2592000, immutable');
    }
  }
}));

app.use('/build', express.static(path.join(__dirname, 'build'), {
  maxAge: '30d',
  etag: true,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.css') || filePath.endsWith('.js')) {
      res.setHeader('Cache-Control', 'public, max-age=2592000, immutable');
    }
  }
}));

// Generic public static handler — must come AFTER the specific
// '/assets' and '/build' handlers above, so it only catches files
// that aren't already served by those.
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '30d', etag: true, setHeaders: (res, filePath) => { if (/\.(?:css|js|mjs|woff2?|ttf|svg|png|jpe?g|webp|gif|ico|mp4)$/i.test(filePath)) res.setHeader('Cache-Control', 'public, max-age=2592000, immutable'); } }));

//mongoose Connect
// console.log(keys.mongodb.dbstring);
// mongoose.connect(keys.mongodb.dbstring,{ useNewUrlParser: true },()=>{
//   console.log("Connected to mongoDB");
// });

/* app.get('/pitchdesk', (req, res) => {
  const filePath = path.join(__dirname + '/public/assets/files/pitchdesk.pdf');
  res.sendFile(filePath);
}); */

app.use('/', home);

app.use((req,res,next)=>{
  res.locals.baseUrl = "";
  next();
});



app.use(function (req, res, next) {
  res.status(404).render('common/404', { title: " Sorry, page not found" });
});


module.exports = app;