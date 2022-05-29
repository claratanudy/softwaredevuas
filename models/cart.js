const req = require("express/lib/request");

module.exports = function Cart(oldCart){

    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, id){
        console.log("cart add")
        console.log(item);
        var storedItem = this.items[id];
        if(!storedItem){
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
        }
        storedItem.qty++; // +1
        storedItem.price = storedItem.item.price * storedItem.qty;
        console.log(storedItem)
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    };

    this.reduce = function(id){
        this.items[id].qty--;
        this.items[id].price = this.items[id].item.price;
        this.totalQty--;
        this.totalPrice -= this.items[id].price;
        if(this.items[id].qty <= 0){
            delete this.items[id];
        }
    }

    this.increase = function(id){
        this.items[id].qty++;
        this.items[id].price = this.items[id].item.price * this.items[id].qty;
        this.totalQty++;
        this.totalPrice += this.items[id].item.price;
    }

    this.removeItem = function(id){
        //console.log(this.items[id].qty," ",this.items[id].price, " || ", this.totalQty, " ", this.totalPrice);
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    }
    this.generateArray = function(){
        var arr = [];
        for (var id in this.items){
            arr.push(this.items[id]);
            console.log("generate array")
            console.log(this.items[id])
        }
        return arr;
    };
};