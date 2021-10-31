
const express =require('express');
const debug = require('debug')('app:sessionRouter');//second () order where to debug
const { MongoClient, ObjectID }  = require('mongodb');
const speakerService = require('../services/speakerService')
const sessions = require('../data/sessions.json');

const sessionsRouter =express.Router();//express hands us budle of code called router help us buid the session code

//building a piece of middleware that is going to help us entering the session route only if the user is signed in ,covering all the session router
sessionsRouter.use((req, res, next)=>{
    //next is the thing that is going to happend when this middleware is finished
    if(req.user){//if passport is dropped us a user on the request then we move to the next thing
        next();
    }else{
        res.redirect('/auth/signIn');//else we redict the user to signIN
    }
})
sessionsRouter.route('/')
    .get((req,res)=>{
        const url ='mongodb+srv://dbUser:XUeomd5KVYApIu3V@globomantics.lwgbu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        const dbName = 'globmantics';
    
     (async function mongo(){
         let client;
         try{
            client =await MongoClient.connect(url);
            console.log('connect to mongo db');
            const db =client.db(dbName);
            const sessions = await db.collection('sessions').find().toArray();//pulling everything out from our db in session
            res.render('sessions',{sessions})
         }catch(error){
             debug(error.stack);
         }
         client.close();
     }());

   
    });

    sessionsRouter.route('/:id')//everytime we get an ID parameter
    .get((req,res)=>{
        const id =req.params.id;
        const url ='mongodb+srv://dbUser:XUeomd5KVYApIu3V@globomantics.lwgbu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        const dbName = 'globmantics';
    //pulling a single session
     (async function mongo(){
         let client;
         try{
            client =await MongoClient.connect(url);
            console.log('connect to mongo db');
            const db =client.db(dbName);
            const session = await db
            .collection('sessions')
            .findOne({_id: new ObjectID(id)});// In mongo its an ObjectID we create a new OBject id and insert our ID. pulling one thing  out from our db in session
            const speaker = await speakerService.getSpeakerById(session.speaker[0].id);
            session.speaker = speaker.data //we returning the axios response
            res.render('session', {
                session,
            });
         }catch(error){
             debug(error.stack);
         }
         client.close();
     }());

     
    });
    module.exports =sessionsRouter;