"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
var uniqueId = 4;
app.post('/api/category', function (req, res) {
    uniqueId++;
    console.log(uniqueId, req.body.name);
    var Category = {
        id: uniqueId,
        name: req.body.name
    };
    fs.readFile('./category.json', function (err, currendata) {
        if (err) {
            console.log(err);
        }
        else {
            var obj = void 0;
            obj = JSON.parse(currendata);
            console.log(obj);
            obj.push(Category);
            var json = JSON.stringify(obj);
            fs.writeFile('./category.json', json, function (err) {
                if (err)
                    throw err;
                console.log('Category saved!');
            });
        }
    });
    res.send(Category);
});
// function addProduct(name, categoryId) {
//     let categryIdsList :number[] = [1,2];
//     if (categryIdsList.indexOf(categoryId) === -1) {
//         throw new Error(`Couldn't found category with this id  (${categoryId})`);
//     }
// }
app.get('/api/category', function (req, res) {
    // try {
    //     addProduct('pp',10);
    //     return res.send('Product has been added successfully');
    // } catch (error) {
    //     return res.status(400).send(error);
    // }
    fs.readFile('./category.json', function (err, data) {
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
app.get('/api/category/:id', function (req, res) {
    // res.send('id: ' + req.params.id);
    var itemId = Number(req.params.id);
    fs.readFile('./category.json', function (err, data) {
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
app.delete('/api/category/:id', function (req, res) {
    var itemId = Number(req.params.id);
    fs.readFile('./category.json', function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            var obj = void 0;
            obj = JSON.parse(data);
            var filtered_list = obj.filter(function (item) { return item.id != itemId; });
            if (filtered_list) {
                var json = JSON.stringify(filtered_list);
                fs.writeFile('./category.json', json, function (err) {
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
app.put('/api/category/:id', function (req, res) {
    var itemId = Number(req.params.id);
    // const item = req.body;
    var item = {
        id: req.body.id,
        name: req.body.name
    };
    console.log(item);
    fs.readFile('./category.json', function (err, data) {
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
            fs.writeFile('./category.json', json, function (err) {
                if (err)
                    throw err;
                console.log('ele deleted');
            });
            res.send(updatedListItems);
        }
    });
});
var port = process.env.PORT || 3000;
app.listen(port, function () { return console.log("App listening on PORT " + port); });
exports.default = app;
