const express =require('express');
const chalk =require('chalk');//coloring the messasges to identify
const debug = require('debug')('app');//second () order where to debug
const morgan =require('morgan');
const path =require('path');//part of node
const passport =require('passport');//maintaing my use object in the session
const cookieParser = require('cookie-parser');
const session= require('express-session');

const PORT =process.env.PORT|| 3000;
const app = express();
const sessionsRouter = require('./src/routers/sessionRouters');
const adminRouter = require('./src/routers/adminRouters');
const authRouter =require ('./src/routers/authRouter');
const exp = require('constants');

app.use(morgan('tiny'));//app.use is the middlewwares and need to flow in a order
app.use(express.static(path.join(__dirname,'/public/'))); //where the middleware will take the static files from _dirname is where we run from
app.use(express.json())// pulling from req body content
app.use(express.urlencoded({extended:false}));
app.use(cookieParser);
app.use(session({secret: 'globmantics'}));

require('./src/config/passport.js')(app);//in order to be completed must be worked after cookieparser and session middlewares are completed

app.set('views','./src/views');//allows us to set variables inside the context of our application
app.set('view engine', 'ejs');


app.use('/sessions',sessionsRouter);//using a middleware where everything that use session we want it to go via sessionsRouter hold the code the related to session(including session ID)
app.use('/admin',adminRouter);
app.use('/auth',authRouter);
app.get('/',(req,res)=>{
    res.render('index', {title: 'Lebron Kingdom', data : ['a','b','c'] });// now its rendring us a new page from src/views and passsing object to this one we want to pull alot of data from original webstie
});
app.listen(PORT,()=>{
    console.log('listening in port '+chalk.green(PORT) +chalk.grey('Ohad Keshet'));//when the app is working
    debug(`listening here ${chalk.greenBright('Dor sinai')}`); // we need to run in terminal the command :set DEBUG= *&node app.js
});