const mongoose = require ('mongoose');

const productSchema = mongoose.Schema ({
    image: {
        type: File,
        required: true
    },
    
    text: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Artikel", productSchema, 'addartikel');
