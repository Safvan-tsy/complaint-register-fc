var db = require('../config/connection')
var collection = require('../config/collections')
var bcrypt =require('bcrypt')
var objectId = require('mongodb').ObjectId

module.exports={
   /* doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            userData.password = await bcrypt.hash(userData.password, 10)
            db.get().collection(collection.ADMIN_COLLECTION).insertOne(userData).then((data) => {
                db.get().collection(collection.ADMIN_COLLECTION).findOne({ _id: data.insertedId }).then((user) => {
                    resolve(user)
                })
            })
        })
    },*/
    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {
            let loginstatus = false
            let user=null
            let status=null
            let response = {}
            if(userData.username=="user@1234"){
                if(userData.password=="user@1234"){
                    console.log('login success');
                        response.user = user
                        response.status = true
                        resolve(response)
                }
                else {
                    console.log('login failed');
                    resolve({ status: false })
                }
            }
            else {
                console.log('login failed');
                resolve({ status: false })
            }
            //let user = await db.get().collection(collection.ADMIN_COLLECTION).findOne({ username: userData.username })
            /*if (user) {
                bcrypt.compare(userData.password, user.password).then((status) => {
                    if (status) {
                        console.log('login success');
                        response.user = user
                        response.status = true
                        resolve(response)
                    }
                    else {
                        console.log('login failed');
                        resolve({ status: false })
                    }
                })
            }
            else {
                console.log('login failed');
                resolve({ status: false })
            }*/
        })
    },
    getAllComplaints:()  =>{
        return new Promise(async(resolve,reject)=>{
            let complaints=await db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(complaints)
        })
    },
    sendResponse:(cId,resp)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION)
            .updateOne({_id:objectId(cId)},{
                $set:{                    
                    response:resp.response
                }
            }).then((respo)=>{
                resolve()
            })
        })
    },
    getComplaint:(data)=>{
        return new Promise(async(resolve,reject)=>{
            let complaints=await db.get().collection(collection.USER_COLLECTION).find({ department: data.department}).toArray()
            resolve(complaints)
        })
    }     
}