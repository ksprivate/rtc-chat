const express=require('express')
const app =express()
const http=require('http').Server(app)
const io =require('socket.io')(http)
const id=require('nanoid')

console.log(id.nanoid())