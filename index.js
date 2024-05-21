const bodyParser = require('body-parser');
const express=require('express');
const path=require('path');
const session=require('express-session');
const {v4:uuidv4}=require('uuid');
const router=require('./routers');
const nocache=require('nocache');

const app=express();

app.use(nocache());

const port=process.env.PORT ||3015;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}))

app.use('/static',express.static(path.join(__dirname,'public')));

app.set('view engine','ejs');

app.use('/route',router);

//home route
app.get('/',(req,res)=>{
    if(req.session.user){
        res.redirect('/route/dashboard');
    }else{
        const msg=req.query.id;
        res.render('base',{msg});
    }
})

app.listen(port,()=>console.log(`listening to the server on http://localhost:${port}`));