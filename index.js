const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const mongoose = require('mongoose')

const app = express()


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session ({
    secret: 'som3_secre3t_keys',
    cookie: {}
}))

app.use( (req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn;
    next();
})

mongoose.connect(('mongodb://clara:clara123@cluster0-shard-00-00.mkqbl.mongodb.net:27017,cluster0-shard-00-01.mkqbl.mongodb.net:27017,cluster0-shard-00-02.mkqbl.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-11ixiz-shard-0&authSource=admin&retryWrites=true&w=majority')
, (err, res) => {
    if (err){
        console.error(err);
    }
    else{
        console.log('Database Terhubung!');
    }
})

const indexRouter = require('./routes/index');
// const cartRouter = require('./routes/cart');
// const wishRouter = require('./routes/wish');

app.use('/', indexRouter);
// app.use('/cart', cartRouter);

// app.post('/auth', function(request, response) {
// 	var email = request.body.email;
// 	var password = request.body.password;
// 	if (email && password) {
// 		connection.query('SELECT * FROM HaloDocDatabase WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
// 			if (results.length > 0) {
// 				request.session.loggedin = true;
// 				request.session.name = name;
// 				response.redirect('/');
// 			} else {
// 				response.send('Incorrect Username and/or Password!');
// 			}			
// 			response.end();
// 		});
// 	} else {
// 		response.send('Please enter Username and Password!');
// 		response.end();
// 	}
// });

// app.get('/', function(request, response) {
// 	if (request.session.loggedin) {
//         console.log(name,"cunscus")
//         res.locals.isLoggedIn = req.session.isLoggedIn;
//         next();
// 		// response.send('Welcome back, ' + request.session.username + '!');
//         indexRouter;
// 	} else {
// 		response.send('Please login to view this page!');
// 	}
// 	response.end();
// });

app.listen('4000', () => {
    console.log('Server sudah berjalan di port 4000')
})