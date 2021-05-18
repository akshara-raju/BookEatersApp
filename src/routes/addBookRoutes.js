const express = require('express');
const upbookRouter = express.Router();
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
function router(nav) {

    


        
   upbookRouter.get('/:id', function(req,res){
       
        const id = req.params.id;
        Bookdata.findOne({_id:id}).then(function(book){
            res.render('bookEdit',{
                nav,
                id: id,
                title:'Edit Book',
                book
            });


        });
        

       
       

        
 
    });
    upbookRouter.post('/add/:id',function(req,res){
        const id = req.params.id;
       
        let upload = multer({ storage: storage }).single('image');
        let filePath = "";
        upload(req, res, function (err){
            if (err) console.log( err)
            else {
                filePath += req.file.path;
                
                filePath = filePath.substring(6, filePath.length);
                Bookdata.updateMany({_id:id},{
                    $set : {
                        title : req.body.title,
                        author : req.body.author,
                        genre : req.body.genre,
                        about : req.body.about,
                        image : filePath
                    }
                }).then(function(books){
                   
                    res.redirect('/books')
                    
        
        
                });
            }

        });

        

        
    });

    
    return upbookRouter;

}
module.exports = router;