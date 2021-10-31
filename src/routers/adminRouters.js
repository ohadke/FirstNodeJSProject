const express = require('express');
const debug = require('debug')('app:adminRouter');//second () order where to debug
const {MongoClient }  = require('mongodb');
const adminRouter= express.Router();
const sessions = require('../data/sessions.json');
adminRouter.route('/').get((req,res)=>{
    const url ='mongodb+srv://dbUser:XUeomd5KVYApIu3V@globomantics.lwgbu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    const dbName = 'globmantics';

 (async function mongo(){
     let client;
     try{
        client =await MongoClient.connect(url);
        debug('connect to mongo db');
        const db =client.db(dbName);
        const response = await db.collection('sessions').insertMany(sessions);
        res.json(response);

     }catch(error){
         debug(error.stack);
     }
 }())
});



module.exports=adminRouter;