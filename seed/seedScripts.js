const mongoose = require ('mongoose');
const Product = require ('../models/product');

// mongoose.connect('mongodb+srv://clara:clara123@cluster0.mkqbl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const allproducts = [
    new Product({
        imagePath: "https://d2qjkwm11akmwu.cloudfront.net/products/e9f0527f-ef63-4da8-afb5-88c0ce2f0758_product_image_url.webp",
        name: 'Obat Batuk Cap Ibu & Anak Sirup 75 ml',
        price: 30000
    }),
    new Product({
        imagePath: "https://d2qjkwm11akmwu.cloudfront.net/products/559a1e0a-e787-4446-99b3-082a784a3b8e_product_image_url.webp",
        name: 'Hufagrip Flu & Batuk Sirup 60 ml',
        price: 25000
    }),
    new Product({
        imagePath: "https://d2qjkwm11akmwu.cloudfront.net/products/97696_22-9-2021_10-51-58.webp",
        name: 'Rhinos SR 10 Kapsul (Pakai Resep)',
        price: 65000
    }),
];

var done = 0;
for(var i=0; i<allproducts.length; i++) {
    allproducts[i].save(function (err,result) {
        done++;
        if(done === allproducts.length){
            console.log('saved');
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
};