const express =require('express');
const debug = require('debug')('app:authRouter');//second () order where to debug
const { MongoClient, ObjectID }  = require('mongodb');
const passport =require('passport');
const authRouter =express.Router();
authRouter.route('/signUp').post((req,res)=>{
    const {username, password} =req.body;
    const url ='mongodb+srv://dbUser:XUeomd5KVYApIu3V@globomantics.lwgbu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    const dbName = 'globmantics'; //now we creating the users
    (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url);
    
          const db = client.db(dbName);
          const user = { username, password };
          const results = await db.collection('users').insertOne(user);
          debug(results);
          req.login(results.ops[0], () => {
            res.redirect('/auth/profile');
          });
        } catch (error) {
          debug(error);
        }
        client.close();
      })();
    

}); //first time we post data and not getting data

//doing get and post toghter
 authRouter.route('/signIn').get((req,res)=>{
     res.render('signin');
 })
 .post(
    passport.authenticate('local', {
     successRedirect: '/auth/profile',
     failureMessage: '/',
 })
 );
    //when we call the post we authenticate the user, pass has a built in func authenticate that is going to return that function handlere for the post request(using the local option)
 
authRouter.route('/profile').get((req,res)=>{// if the user is slogged in its going to give us the user
res.json(req.user);
})
module.exports = authRouter;