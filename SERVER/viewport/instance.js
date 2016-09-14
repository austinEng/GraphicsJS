'use strict'

console.log(`STARTING: process ${process.pid}`)

const express = require('express');

var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)

process.on('exit', code => {
  console.log(`Viewport process ${process.pid} exited with error code ${code}`)
})

process.on('close', code => {
  console.log(`Viewport process ${process.pid} closed with error code ${code}`)
})

server.listen({
  host: 'localhost',
  port: 0
}, () => {
  console.log("Viewport instance server listening on %s:%s", server.address().address, server.address().port);  
  process.send({address: server.address()})
})