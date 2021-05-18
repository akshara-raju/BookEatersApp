const express = require('express');
const teamRouter = express.Router();
function router(nav){

    teamRouter.get('/', function(req,res){
        res.render("team",
        {
            nav,
            title:'Team members',
            
           
        }
        );//passed as object
    });
    return teamRouter;
}
module.exports = router;