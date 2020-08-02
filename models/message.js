class Message {
    constructor(message,sender,sentDate,lifetime){
        this.message=message,
        this.sender=sender,
        this.sentDate=sentDate,
        this.destroyTime=lifetime
    }

}

module.exports=Message