const express=require('express')
const app =express()
const server=require('http').Server(app)
const io =require('socket.io')(server)
const id=require('nanoid')
const mongo=require('mongodb')

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{


    
   res.redirect('/'+id.nanoid())
})

app.get('/:id',(req,res)=>{
    res.render('index')
    io.on('connection',socket=>{
    socket.join(req.params.id)
})

io.to(req.params.id).emit('message',"message text");
    
})

server.listen(process.env.PORT || 3000)