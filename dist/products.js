"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import app from './category';
// var fs = require('fs');
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.post('/api/product', function (req, res) {
    var Product = {
        id: Math.floor(Math.random() * 100),
        name: req.body.name,
        rawPrice: req.body.rawPrice,
        price: req.body.price,
        code: req.body.code,
        color: req.body.color,
        categoryId: req.body.categoryId,
        description: req.body.description,
        stockCount: req.body.stockCount,
        expirationDate: req.body.expirationDate,
    };
    if (Product.rawPrice >= Product.price) {
        res.status(404).send("rawPrice is more than price");
    }
    else {
        fs.readFile('./category.json', function (err, currendata) {
            var data;
            data = JSON.parse(currendata);
            var categoryid = data.find(function (_item) { return _item.id == Product.categoryId; });
            console.log("hello hello hello", categoryid);
            if (!categoryid) {
                res.status(404).send("no related category with this id");
            }
            else {
                fs.readFile('./product.json', function (err, currendata) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        var obj = void 0;
                        obj = JSON.parse(currendata);
                        console.log(obj);
                        obj.push(Product);
                        var json = JSON.stringify(obj);
                        fs.writeFile('./product.json', json, function (err) {
                            if (err)
                                throw err;
                            console.log('product saved!');
                            res.send(Product);
                        });
                    }
                });
            }
        });
    }
});
app.get('/api/product', function (req, res) {
    fs.readFile('./product.json', function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            var obj = void 0;
            obj = JSON.parse(data);
            console.log(obj);
            res.send(obj);
        }
    });
});
app.get('/api/product/:id', function (req, res) {
    var itemId = Number(req.params.id);
    fs.readFile('./product.json', function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            var obj = void 0;
            obj = JSON.parse(data);
            var item = obj.find(function (_item) { return _item.id == itemId; });
            if (item) {
                res.send(item);
            }
            else {
                res.status(404).send({ message: "item " + itemId + " doesn't exist" });
            }
        }
    });
});
app.delete('/api/product/:id', function (req, res) {
    var itemId = Number(req.params.id);
    fs.readFile('./product.json', function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            var obj = void 0;
            obj = JSON.parse(data);
            var filtered_list = obj.filter(function (item) { return item.id != itemId; });
            if (filtered_list) {
                var json = JSON.stringify(filtered_list);
                fs.writeFile('./product.json', json, function (err) {
                    if (err)
                        throw err;
                    console.log('ele deleted');
                });
                res.send(filtered_list);
            }
            else {
                res.status(404).send({ message: "item " + itemId + " doesn't exist" });
            }
        }
    });
});
app.put('/api/product/:id', function (req, res) {
    var itemId = Number(req.params.id);
    var item = {
        id: req.body.id,
        name: req.body.name,
        rawPrice: req.body.rawPrice,
        price: req.body.price,
        code: req.body.code,
        color: req.body.color,
        categoryId: req.body.categoryId,
        description: req.body.description,
        stockCount: req.body.stockCount,
        expirationDate: req.body.expirationDate,
    };
    console.log(item);
    if (item.rawPrice >= item.price) {
        res.status(404).send("rawPrice is more than price");
    }
    else {
        fs.readFile('./category.json', function (err, currendata) {
            var data;
            data = JSON.parse(currendata);
            var categoryid = data.find(function (_item) { return _item.id == req.body.products[0].productId; });
            console.log("categoryid", categoryid);
            if (!categoryid) {
                res.status(404).send("no related category with this id");
            }
            else {
                fs.readFile('./product.json', function (err, data) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        var updatedListItems = [];
                        var obj = void 0;
                        obj = JSON.parse(data);
                        obj.forEach(function (oldItem) {
                            if (oldItem.id == itemId) {
                                console.log(item);
                                updatedListItems.push(item);
                            }
                            else {
                                console.log(oldItem);
                                updatedListItems.push(oldItem);
                                console.log(updatedListItems);
                            }
                        });
                        var json = JSON.stringify(updatedListItems);
                        fs.writeFile('./product.json', json, function (err) {
                            if (err)
                                throw err;
                            console.log('ele updated');
                        });
                        res.send(updatedListItems);
                    }
                });
            }
        });
    }
});
var port = process.env.PORT || 3000;
var server = app.listen(port, function () { return console.log("App listening on PORT " + port); });
