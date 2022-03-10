var db = require('../config/connection')
var collection = require('../config/collections')
var bcrypt =require('bcrypt')
var objectId = require('mongodb').ObjectId


module.exports={
    doSubmit:(userData)=>{
        return new Promise(async(resolve, reject) => {
            userData.name = await bcrypt.hash(userData.name, 10)
            //userData.email = await bcrypt.hash(userData.email, 10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data) => {
                resolve(data)
            })
        })    
    },
    doCheck:(userData)=>{
        return new Promise(async(resolve, reject)=>{
            let response={}
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ email: userData.email })
            if(user){
                let data= await db.get().collection(collection.USER_COLLECTION).find({ email: userData.email }).toArray()               
                console.log("success")
                //resolve(user)
                response.user = data
                response.status = true
                resolve(response)
            }
            else{
                console.log("error check")
                resolve({ status: false })
            }
        })
    }
}