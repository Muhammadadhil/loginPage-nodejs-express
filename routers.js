const express=require('express');
const router=express.Router();    // creating an instance of an Express Router
                                //express.Router is a method in the Express.js framework that creates a new router object.

const credentials={
    email:"admin123@gmail.com",
    password:'hello124'
}

router.post('/login',(req,res)=>{
    // res.send('welcome to the dashboard');
    if(req.body.email==credentials.email && req.body.password==credentials.password){
        req.session.user=req.body.email;
        res.redirect('/route/dashboard'); 
    }else{
        // res.end('invalid username or password');
        res.render('base',{title:'validation', invalid:'invalid username or password'});
    }
})

router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{title:'dashboard',user:req.session.user}); 
    }else{
        res.render('base');
    }
})

router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){ 
            console.log('error occured while logout');
            res.send('error occured');
        }else{
            
            // res.render('base',{title:'hellllooooo',logout:'logout successfully'})
            const message="logout successfully";
            res.redirect(`/?id=${message}`);
        }
    })
})



module.exports=router; 