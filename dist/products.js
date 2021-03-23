"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var category_1 = __importDefault(require("./category"));
var fs = require('fs');
// function read(): any {
//     var readData: string = '';
//     fs.readFile('./product.json', (err: string, currendata: any): any => {
//         if (err) {
//             console.log(err);
//             readData = err;
//         } else {
//             // console.log(JSON.parse(currendata))
//             readData = currendata;
//             return (readData);
//         }
//     });
//     console.log(readData)
//     return readData;
// }
// var currendata: any = read();
// console.log(currendata)
category_1.default.post('/api/product', function (req, res) {
    var Product = {
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
    if (Product.rawPrice >= Product.price) {
        res.send("rawPrice is more than price");
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
                    console.log('Lyric saved!');
                });
            }
        });
    }
    res.end();
});
category_1.default.get('/api/product', function (req, res) {
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
category_1.default.get('/api/product/:id', function (req, res) {
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
                res.send({ message: "item " + itemId + " doesn't exist" });
            }
        }
    });
});
category_1.default.delete('/api/product/:id', function (req, res) {
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
                res.send({ message: "item " + itemId + " doesn't exist" });
            }
        }
    });
});
category_1.default.put('/api/product/:id', function (req, res) {
    var itemId = Number(req.params.id);
    // const item = req.body;
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
        res.send("rawPrice is more than price");
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
