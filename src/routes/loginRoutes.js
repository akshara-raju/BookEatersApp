const express = require('express');
const loginRouter = express.Router();
const Userdata = require('../model/Userdata');
nav1 = [
    {
        link:'/books', name:'Book'
    },
    {
        link:'/authors', name: 'Author'
    },
    {
        link:'/admin',name :'Add Books'
    },
    {
        link:'/admin1',name:'Add Authors'
    },
    {
        link:'/logout', name:'Sign Out'
    }
];

function router3(nav)
{ 
    
loginRouter.get('/', function(req,res){
    res.render("login",
    {
        nav,
        title:'Log In',
        msg:''
       
    }
    );//passed as object
});

loginRouter.get('/index',function(req,res){
    const id=req.params.id;
    res.render("index", 
    {
        nav,
        title:"home"
    });
});

loginRouter.get('/signup', function(req,res){
    const id=req.params.id;
    res.redirect('/signup');
});



loginRouter.post('/home',function(req,res){
    const usr=req.body.usr;
    const pwd=req.body.pwd;
    Userdata.findOne({usrname:usr})
    .then(function(user){
    if (user.password == pwd) {
        res.render('home',
        {
            nav1,
             title: 'Library' 
        })
        
    } 
    
    else {
        
        res.render("login", {
            nav,
            title: 'Log In',
            msg:" Wrong Password!!"
        })
       
    }
    })

    .catch(function(user){
        res.render("login", {
        nav,
        title: 'Log In',
        msg:' Username doesnt exist !!'
    })
    
    
}
    )



    

});





return loginRouter;
}//fn router ends

module.exports=router3;//exporting to app.js