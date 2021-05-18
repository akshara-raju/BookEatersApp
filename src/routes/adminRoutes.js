const express = require('express');
const adminRouter = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Bookdata = require('../model/Bookdata');





const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/books');
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});




function router(nav){
    adminRouter.get('/',function(req,res){
        res.render('addBook', {
            nav,
            title:'Add Book'
        });
    });

    
   
     
    
    adminRouter.post('/add', function(req,res){

        let upload = multer({ storage: storage }).single('image');
        let filePath = "";
        upload(req, res, function (err){
            if (err) console.log( err)
            else {
                filePath += req.file.path;
                
                filePath = filePath.substring(6, filePath.length);
                var items = {

                    title: req.body.title,
                    author: req.body.author,
                    genre: req.body.genre,
                    image: filePath,
                    about: req.body.about
        
                }
                var book = Bookdata(items);
                book.save(); //saving to database
                res.redirect('/books');
            }

        });
        

       
        
        
    });
    adminRouter.post('/add/:id',function(req,res){
       
        const id = req.params.id;
        Bookdata.updateMany({_id:id},{
            $set : {
                title : req.body.title,
                author : req.body.author,
                genre : req.body.genre,
                image : filePath,
                about : req.body.about
                
            }
        }).then(function(books){
           
            res.render('books', {
                nav,
                title:'Updated Book',
                books
            });
            


        });
        

        
    });
    adminRouter.get('/:id',function(req,res){
        const id = req.params.id;
        
        Bookdata.deleteOne({_id:id})
        .then(function(books){
            res.redirect('/books');

        });
        
    
    });

    

    

    

    return adminRouter;

}
module.exports = router;

