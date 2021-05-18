const express = require('express');
const admin1Router = express.Router();
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
    admin1Router.get('/',function(req,res){
        res.render('addAuthor', {
            nav,
            title:'Add Author'
        });
    });

    admin1Router.post('/addAuthor', function(req,res){
        
        let upload = multer({ storage: storage }).single('image');
        let filePath = "";
        upload(req, res, function (err){
            if (err) console.log( err)
            else {
                filePath += req.file.path;
                
                filePath = filePath.substring(6, filePath.length);
                var items = {
                    author: req.body.author,
                    born: req.body.born,
                    about: req.body.about,
                    image: filePath
                }
                var author = Authordata(items);
                author.save();
                res.redirect('/authors')
                
            }

        });
    });

    admin1Router.get('/:id',function(req,res){
        const id = req.params.id;
        
        Authordata.deleteOne({_id:id})
        .then(function(authors){
            res.redirect('/authors');

        });
        
    
    });
    return admin1Router;
};
module.exports = router;
