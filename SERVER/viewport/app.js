'use strict'

// const express = require('express')



// const app = module.exports = express();

// app.set('port', process.env.PORT || 3000);

// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'pug')

// app.use('/', require('./routes'))

// app.use(require('cookie-parser')());

// const session = require('express-session');
// const RedisStore = require('connect-redis')(session);

// const redis = require("redis");
// const RedisStore = require('connect-redis')
// const sessionStore = new RedisStore({
//   host: 'localhost',
//   port: 6379,
//   client: redis.createClient(),
//   logErrors: true,
//   ttl: 60
// })

// const sessionMiddleware = session({
//     store: sessionStore,
//     secret: 'ad;jkgq3;4gvbQrvdfgo87wvgo42g9fb@grvb',
//     saveUninitialized: true, 
//     resave: false,
// });

// const server = require('http').Server(app)

// const child_process = require('child_process')
// const server = require('net').createServer(socket => {
//   // socket.setKeepAlive(true, 100)

//   console.log('CONNECTED: ' + socket.remoteAddress +':'+ socket.remotePort);
//   let instance = child_process.fork('./server/viewer/instance')

//   instance.on('close', (code, signal) => {
//     console.log((signal ? `${signal}: ` : 'CLOSE: ') + `process ${instance.pid} terminated` + (code != null ? ` with code ${code}` : ""))
//   })

//   instance.send('socket', socket)

// }).listen({
//   host: 'localhost',
//   port: 3001
// }, () => {
//   console.log("Viewport server listening on %s:%s", server.address().address, server.address().port);  
// })


// const engine = require('engine.io')
const child_process = require('child_process');
const shortid = require('shortid');
const path = require('path');
const express = require('express');
var app = express();
var server = require('http').Server(app);

// import { createStore } from 'redux'
// import { Provider } from 'react-redux'

// const createStore = require('redux').createStore
// const Provider = require('react-redux').Provider
// const React = require('react')
// const renderToString = require('react-dom/server').renderToString

// var io = engine.attach(server)

app.set('port', process.env.PORT || 3000);

// app.set('views', path.join(__dirname, '../CLIENT/views'))
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, '../CLIENT')));
app.set('views', __dirname)

const io = require('socket.io')(server)

// io.use((socket, next) => {
//   sessionMiddleware(socket.request, socket.request.res, next)
// })

// app.use(sessionMiddleware)

// const redis = require("redis");
// var redis_client = redis.createClient({
//   host: 'localhost',
//   port: 6379
// })
// require('node-jsx').install()
// var html = ReactDOM.renderToString(require('../../src/CLIENT/js/components/viewport.jsx'))
// const viewport = require('../CLIENT/js/components/viewport.jsx')
// console.log(viewport)

// const ViewportComponent = React.createFactory(require('../CLIENT/js/components/viewport.jsx'))


// var html = renderToString()
// console.log(html)

app.get('/', (req, res) => {
  // const viewport = ViewportComponent({
  //   server: `${server.address().address}:${server.address().port}`
  // })
  // var html = renderToString(viewport)
  // res.send(html)
  // console.log(viewport)
  // res.render('viewer3D')
  res.render('main', {
    server: server.address()
  })
})

server.listen({
  host: 'localhost',
  port: 3000
}, () => {
  console.log("Viewport master server listening on %s:%s", server.address().address, server.address().port);  
})

// io.on('connection', socket => {
//   console.log(`CONNECT: ${socket.id}`);

//   let instance = child_process.fork('./server/viewer/instance');
  
//   instance.on('message', m => {
//     if (m.address) {
//       socket.send('instance address', m.address)
//     }
//   })

//   instance.on('close', (code, signal) => {
//     console.log((signal ? `${signal}: ` : 'CLOSE: ') + `process ${instance.pid} terminated` + (code != null ? ` with code ${code}` : ""))
//   })

//   socket.on('close', () => {
//     console.log(`DISCONNECT: ${socket.id}`);
//     instance.kill('SIGTERM')  
//   })
// })

io.sockets.on('connection', socket => {
  console.log(`CONNECT: ${socket.id}`);
  // console.log(socket.request.url)
  // console.log(socket.handshake)
  let instance = child_process.fork('./SERVER/viewer/instance');

  instance.on('error', err => {
    console.error(err);
  })

  instance.on('close', (code, signal) => {
    console.log((signal ? `${signal}: ` : 'CLOSE: ') + `process ${instance.pid} terminated` + (code != null ? ` with code ${code}` : ""))
  })

  instance.on('message', m => {
    if (m.address) {
      socket.emit('instance address', m.address)
    }
  })

  socket.on('disconnect', () => {
    console.log(`DISCONNECT: ${socket.id}`);
    instance.kill('SIGTERM')  
  })
});