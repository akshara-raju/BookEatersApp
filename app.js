const express = require('express');
const app = express();


 

const port = process.env.PORT || 2000;
const nav = [   
    
    {
        link:'/signup',name :'Sign Up'
    },
    {
        link:'/login',name :'Sign In'
    },
    {
        link:'/team',name :'Team Members'
    }
];

const nav1 = [
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
        link:'/team',name :'Team Members'
    },
    {
        link:'/logout', name:'Sign Out'
    }
    
];






const booksRouter = require('./src/routes/bookRoutes')(nav1);
const authorsRouter = require('./src/routes/authorRoutes')(nav1);
const signupRouter = require('./src/routes/signupRoutes')(nav);
const loginRouter = require('./src/routes/loginRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav1);
const admin1Router = require('./src/routes/addAuthorRoutes')(nav1);
const upbookRouter = require('./src/routes/addBookRoutes')(nav1);
const upauthorRouter = require('./src/routes/authorEditRoutes')(nav1);
const logoutRouter = require('./src/routes/logoutRoutes')(nav);
const teamRouter = require('./src/routes/teamRoutes')(nav1);


app.use(express.urlencoded({extended:true}));



app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', __dirname+'/src/views');



app.use('/books',booksRouter);
app.use('/authors',authorsRouter);
app.use('/signup',signupRouter);
app.use('/login',loginRouter);
app.use('/admin',adminRouter);
app.use('/admin1',admin1Router);
app.use('/update',upbookRouter);
app.use('/updateauthor',upauthorRouter);
app.use('/logout',logoutRouter);
app.use('/team',teamRouter);





app.get('/', function(req,res){
    res.render('index',
    {
        nav,
         title: 'Library' 
    }
    );
});
// one method direct to books.ejs

// app.get('/books',function(req,res){
//     res.render('books',
//     {
//         nav:[{link:'/books', name:'Book'},{link:'/author', name: 'Author'}], title: 'Library App' 
//     }
//     );
// });

//second method - creating a seperate route handler for books page alone



  



app.listen(port, ()=> {console.log("Server Ready at "+port)});