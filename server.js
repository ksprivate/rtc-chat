require('dotenv').config()
const express=require('express')
const app =express()
const server=require('http').Server(app)
const io =require('socket.io')(server)
const {nanoid}=require('nanoid')
const mongo=require('mongodb')
const message=require('./models/message')
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{

res.render('home')
 
   res.redirect('/'+id.nanoid())
})
app.get('/createnewroom',(req,res)=>{
    let id=nanoid()
    mongo.MongoClient.connect(process.env.DATABASE,{useUnifiedTopology:true},(err,db)=>{
        db.db('chat').collection(id).insertOne({active:true},(err,response)=>{
            if(err) throw err
        })
        
    })
    res.redirect('/'+id)
})


app.get('/:id',(req,res)=>{
    res.render('message')
    io.on('connection',socket=>{
    socket.join(req.params.id)
})

io.to(req.params.id).emit('message',"message text");
    
})

server.listen(process.env.PORT||3000)