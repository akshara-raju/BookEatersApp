const express = require('express');

const signupRouter = express.Router();
const Userdata = require('../model/Userdata');

function routers(nav) {

    signupRouter.get('/',function(req,res){
        
        res.render('signup',
        {
            nav,
             title: 'Signup',
             msg:""
             
        }
        );
    });
    signupRouter.get('/log', function(req,res){
        const id=req.params.id;
        res.redirect('/login');
    });


    signupRouter.post('/login', function(req,res){
        var items = {
            usrname: req.body.usrname,
            email: req.body.email,
            password: req.body.password,
            number: req.body.number
        }



        // const usr=req.body.usrname;
        // console.log(usr);

        // Userdata.findOne({usrname:usr})
        // .then(function(usr){
        // res.render("signup", {
        //     nav,
        //     title: 'Signup',
        //      msg:"Username already exist"})
        // })

        // .catch(function(usr){
      //  })

//         const usr=req.body.usrname;
//         console.log(usr);
//         Userdata.findOne({usrname:usr},{explicit: true}).then(function(user){
//             console.log("ivdeyaado");
//         res.render('signup',
//         {
//             nav,
//              title: 'Signup',
//              msg:"Username already exist"
//         })
        
//     } ).catch(function(user){
//         res.render("login", {
//         nav,
//         title: 'Log In',
//         msg:' Username doesnt existkkkkk !!'
//     })
    
    
// }
//     )

const usr=req.body.usrname;
const pwd=req.body.password;
console.log(usr);
console.log(pwd);
Userdata.findOne({usrname:usr})
.then(function(user){
    
if (user.password == pwd) {
    res.render('signup',
    {
        nav,
         title: 'Signup' ,
         msg:"Username already exist"
    })
    
} 

else {
    
    res.render("signup", {
        nav,
        title: 'Signup',
        msg:" Username already exist !!"
    })
   
}
})

.catch(function(user){
    var user = Userdata(items);
    user.save();
    res.redirect('/login');


}
)







    });
    return signupRouter;
    
};
    
    
module.exports = routers;