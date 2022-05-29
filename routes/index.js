const express = require('express')
const UserData = require('../models/user')
const res = require('express/lib/response')
const Product = require('../models/product')
const Cart = require('../models/cart')
const Wish = require('../models/wish')
const product = require('../models/product')


const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID;

const router = express.Router()

MongoClient.connect('mongodb://clara:clara123@cluster0-shard-00-00.mkqbl.mongodb.net:27017,cluster0-shard-00-01.mkqbl.mongodb.net:27017,cluster0-shard-00-02.mkqbl.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-11ixiz-shard-0&authSource=admin&retryWrites=true&w=majority', { useUnifiedTopology: true })
.then(client => {
    console.log('Connected to Database')
    // untuk pilih DB
    const db = client.db('HaloDocDatabase')
    const userDB = db.collection('User');
    const adminDB = db.collection('Admin');
    const artikelDB = db.collection('Artikel');
    const Product = db.collection('allproducts');

    router.get('/', (req, res) => {
        res.render('pages/index')
    })

// CART
    router.get('/cart', function(req, res, next) {
        if (!req.session.cart) {
            return res.render('pages/cart', { products: 0 });
        }

        var cart = new Cart(req.session.cart);

        console.log(cart.generateArray());
        res.render('pages/cart', { products: cart.generateArray(), totalPrice: cart.totalPrice });
    });
    
    router.get('/remove/:id', (req, res, next) => {
        const productId = req.params.id;
        const cart = new Cart(req.session.cart ? req.session.cart : {});
        
        cart.removeItem(productId);
        req.session.cart = cart;
        res.redirect('/cart');
     });
     
     router.get('/reduce/:id', (req, res, next) => {
        const productId = req.params.id;
        const cart = new Cart(req.session.cart ? req.session.cart : {});
        
     
        cart.reduce(productId);
        req.session.cart = cart;
        res.redirect('/cart');
     });
     
     router.get('/increase/:id', (req, res, next) => {
        const productId = req.params.id;
        const cart = new Cart(req.session.cart ? req.session.cart : {});
        
     
        cart.increase(productId);
        req.session.cart = cart;
        res.redirect('/cart');
     });
    
     router.get('/add-to-wish-from-cart/:id', (req, res, next) => {
        const productId = req.params.id;
        const wish = new Wish(req.session.wish ? req.session.wish : {});
        const cart = new Cart(req.session.cart ? req.session.cart : {});
        
        // var product = new Array(Product.find({_id: productId}));
        var id = new require('mongodb').ObjectID(productId);
        Product.findOne({'_id':id})
        .then(function(doc) {
            wish.add(doc, productId);
            cart.removeItem(productId);
            req.session.wish = wish;
            req.session.cart = cart;
            console.log('req sesion wish'+req.session.wish);
            res.redirect('/cart');
        });


    });


// WISHLIST
     router.get('/wishlist', async(req, res) => {
        if (!req.session.wish) {
            return res.render('pages/wishlist', { products: 0});
        }
        var wish = new Wish(req.session.wish);
        console.log(wish.generateArray());
        res.render('pages/wishlist', { products: wish.generateArray() });
    })
    
    router.get('/remove-w/:id', (req, res, next) => {
        const productId = req.params.id;
        const wish = new Wish(req.session.wish ? req.session.wish : {});
        
    
        wish.removeItem(productId);
        req.session.wish = wish;
        res.redirect('/wishlist');
    });
    
    router.get('/add-to-cart-from-wish/:id', (req, res, next) => {
        const productId = req.params.id;
        const cart = new Cart(req.session.cart ? req.session.cart : {});
        const wish = new Wish(req.session.wish ? req.session.wish : {});
        
        // var product = new Array(Product.find({_id: productId}));

        var id = new require('mongodb').ObjectID(productId);
        Product.findOne({'_id':id})
        .then(function(doc) {
            cart.add(doc, productId);
            wish.removeItem(doc, productId);
            req.session.cart = cart;
            req.session.wish = wish;
            // console.log(req.session.cart);
            res.redirect('/wishlist');
        });


    });

    router.get('/add-to-wish/:id', (req, res) => {
        const productId = req.params.id;
        const wish = new Wish(req.session.wish ? req.session.wish : {});
        // var product = new Array(Product.find({_id: productId}));
        // console.log(product);

        var id = new require('mongodb').ObjectID(productId);
        Product.findOne({'_id':id})
        .then(function(doc) {
            wish.add(doc, productId);
            req.session.wish = wish;
            res.redirect('/allproducts');
        });
     });
     
     router.get('/add-to-cart/:id', (req, res, next) => {
        const productId = req.params.id;
        // console.log("product id" + productId)
        const cart = new Cart(req.session.cart ? req.session.cart : {});

        //var product = new Array(Product.findOne({_id: productId}));
        var id = new require('mongodb').ObjectID(productId);
        Product.findOne({'_id':id})
        .then(function(doc) {
            cart.add(doc, productId);
            req.session.cart = cart;
            res.redirect('/allproducts');
        });
    
     });

    router.get(('/orderform'), async (req, res) => {
        var cart = new Cart(req.session.cart);
        res.render('pages/orderform', { products: cart.generateArray() })

    })

    
    router.get(('/artikel'), async (req, res) => {
        const data = await artikelDB.find().toArray();
        res.render('pages/artikel', { artikelList: data });
    })

    router.get(('/isiartikel'), async (req, res) => {
        const data = await artikelDB.find().toArray();
        res.render('pages/isiartikel', { artikelList: data });
    })

    router.get(('/allproducts'), async (req, res) => {
        // const data = productDB.find().toArray();
        var data = await Product.find().toArray();
        // console.log(data);
        res.render('pages/allproducts', { products: data });
    })
    
    router.get(('/bmi'), (req, res) => {
        res.render('pages/bmi')
    })
    
    router.get(('/faq'), (req, res) => {
        res.render('pages/faq')
    })
    
    router.get(('/isiartikel'), (req, res) => {
        res.render('pages/isiartikel')
    })
    
    router.get(('/kalkulatorLT'), (req, res) => {
        res.render('pages/kalkulatorLT')
    })
    
    router.get(('/kalkulatorK'), (req, res) => {
        res.render('pages/kalkulatorK')
    })
    
    router.get(('/kategori'), (req, res) => {
        res.render('pages/kategori')
    })
    
    router.get(('/security'), (req, res) => {
        res.render('pages/security')
    })
    
    router.get(('/sk'), (req, res) => {
        res.render('pages/sk')
    })
    
    router.get(('/admin'), (req, res) => {
        res.render('pages/admin')
    })

    router.get(('/aplikasi'), (req, res) => {
        res.render('pages/aplikasi')
    })
    
    router.get(('/addartikel'), (req, res) => {
        res.render('pages/addartikel', { error : "" })
    })
    
    router.get(('/updateartikel'), (req, res) => {
        res.render('pages/updateartikel')
    })

    router.get(('/artikeladmin'), async (req, res) => {
        // if (req.session.isLoggedIn) {
            const data = await artikelDB.find().toArray();
            res.render('pages/artikeladmin', { artikelList: data });
        // } else {
        //     res.redirect('/admin');
        // }
    })

    router.get(('/logout'), (req, res) => {
        req.session.isLoggedIn = false;
        res.render('pages/index')
    })

    router.get(('/logoutadmin'), (req, res) => {
        req.session.isLoggedIn = false;
        res.render('pages/admin')
    })

    router.get(('/listuser'), (req, res) => {
        res.render('pages/listuser')
    })

    router.get(('/cobalistuser'), async (req, res)=>{
        if (req.session.isLoggedIn) {
            const data = await userDB.find().toArray();
            res.render('pages/listuser', { userList: data || [], name: req.session.name });
        }
    })

    router.post(('/register'), async (req, res)=>{
        if (!req.session.isLoggedIn) {
            const body = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: 0,
            };
            userDB.insertOne(body).then(result => {
                res.redirect('/cobalistuser');
            })

            .catch(error => console.error(error))
        }
    })
    
    router.post(('/authenticationuser'), async (req, res)=>{
        const email = req.body.email;
        const password = req.body.password;
        let isLogin = false; 
        
        req.session.isLoggedIn = true;
    
        // untuk pilih collection user
        userDB.find().toArray().then(result => {
            result.forEach((data) => {
                if (email == data.email && password == data.password) {
                    req.session.isLoggedIn = true;
                    req.session.name = data.name;
                    res.redirect('http://localhost:4000/');
                    isLogin = true;
                }

            })

            if (isLogin == false) {
                res.render('pages/index', { error: "Email dan Password tidak terdaftar!" });
            }
        })
        .catch(error => console.error(error))
    })

    router.post(('/cobapostcreateartikel'), async (req, res)=>{
        const body = {
            title: req.body.title,
            isi: req.body.isi,
            // img: req.body.img,
        };
        artikelDB.insertOne(body).then(result => {
            res.redirect('/artikeladmin');
        })
        .catch(error => {
            res.render('pages/addartikel', { error : error })
        })
    })


    router.post(('/authenticationadmin'), async (req, res)=>{
        const email = req.body.email;
        const password = req.body.password;
        let isLogin = false; 
    
        // untuk pilih collection
        adminDB.find().toArray().then(result => {
            result.forEach((data) => {
                if (email == data.email && password == data.password) {
                    req.session.isLoggedIn = true;
                    req.session.name = data.name;
                    res.redirect('/artikeladmin');
                    isLogin = true;
                }
            })

            if (isLogin == false) {
                res.render('pages/admin', { error: "Email dan Password tidak terdaftar!" });
            }
        })
        .catch(error => console.error(error))
    })

    
    
})
.catch(console.error)

module.exports = router;