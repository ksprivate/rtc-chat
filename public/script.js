const socket = io('http://127.0.0.1:3000');

socket.on('message',data=>{
    console.log(data)
})



let btn=document.getElementById('submit-btn');
btn.addEventListener('click',function(){
printMsg()
})

function printMsg(msg,args){
let main=document.getElementById('main');
for(let i=0;i<20;i++){
let message=document.createElement('div');
message.classList.add('message');
if(i%3==0){
    message.classList.add(args);

}
else{
    message.classList.add('recived');

}
message.innerHTML=msg
main.append(message)
}
};


