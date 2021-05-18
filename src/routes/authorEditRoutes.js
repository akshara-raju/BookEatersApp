const express = require('express');
const upauthorRouter = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Authordata = require('../model/Authordata');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/authors');
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


function router(nav){

    upauthorRouter.get('/:id', function(req,res){
       
        const id = req.params.id;
        Authordata.findOne({_id:id}).then(function(author){
            res.render('authorEdit',{
                nav,
                id: id,
                title:'Edit Author',
                author
            });


        });
        
        upauthorRouter.post('/add/:id',function(req,res){
       
            const id = req.params.id;
    
            let upload = multer({ storage: storage }).single('image');
            let filePath = "";
            upload(req, res, function (err){
            if (err) console.log( err)
            else {
                filePath += req.file.path;
                
                filePath = filePath.substring(6, filePath.length);
                Authordata.updateMany({_id:id},{
                    $set : {
                        
                        author : req.body.author,
                        born : req.body.born,
                        about : req.body.about,
                        image : filePath
                    }
                }).then(function(authors){
                   
                    res.redirect('/authors');
                    
        
        
                });
                
                
            }

        });
        });
    

       
       

        
 
    });







    return upauthorRouter;

}
module.exports = router;