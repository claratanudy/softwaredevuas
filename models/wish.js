module.exports = function Wish(oldWish) {
    this.items = oldWish.items || {};
    //atribut dengan nama items
    
    this.add = function(item, id) {
        var storedItem = this.items[id];
        // storedItem 
        if (!storedItem) {
            storedItem = this.items[id] = { item: item, qty: 0, price: 0};
        };
    };

    this.removeItem = function(id) {
        delete this.items[id];
    }
    this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        console.log(arr);
        return arr;
    };
};