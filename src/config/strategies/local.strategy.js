const passport =require ('passport');
const  { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:localStrategy');
module.exports =function localStrategy(){
    passport.use(
        new Strategy(
       {//when the information is sended in the post method from the ejs
        usernameField: 'username',
        passwordField: 'password',
       },
       (username, password, done)=> {// here we take the username and password and go to the db
        const url ='mongodb+srv://dbUser:XUeomd5KVYApIu3V@globomantics.lwgbu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        const dbName = 'globmantics';
        (async function validateUser(){
            let client;
            try{
                client =await MongoClient.connect(url);
                console.log('connect to mongo db');
                const db =client.db(dbName);
                const user = await db.collection('users').findOne({username}); //looking if there is a user that match the usename that was sent to us
                if(user&& user.password===password){//if there is a user and the passwords are matched
                    done(null, user)//we will send there is no errors and the user back
                }else{
                    done(null, false)//there is no eroors but the is no users this is the reason we sent false
                }
            }catch(error){
                done(error,false)
            }
            client.close();
        }());
    }
        )
    );
};
    
