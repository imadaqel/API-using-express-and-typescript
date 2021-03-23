"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app1 = express_1.default();
var fs = require('fs');
var bodyParser = require('body-parser');
app1.use(bodyParser.urlencoded({
    extended: true
}));
var uniqueId = 4;
app1.post('/api/checkouts', function (req, res) {
    uniqueId++;
    console.log(req.body);
    var Checkouts = {
        id: uniqueId,
        products: [
            {
                productId: req.body.products[0].productId,
                unitPrice: req.body.products[0].unitPrice,
                quantity: req.body.products[0].quantity,
                subtotal: req.body.products[0].quantity * req.body.products[0].unitPrice,
            }
        ],
        total: req.body.total,
        discount: req.body.discount,
        payment_amount: req.body.payment_amount,
        payment_method: req.body.payment_method,
    };
    console.log(Checkouts);
    fs.readFile('./product.json', function (err, currendata) {
        var data;
        data = JSON.parse(currendata);
        var productid = data.find(function (_item) { return _item.id == req.body.products[0].productId; });
        console.log("hello hello hello", productid);
        if (!productid) {
            res.send("no related product with this id");
        }
        else {
            fs.readFile('./checkout.json', function (err, currendata) {
                if (err) {
                    console.log(err);
                }
                else {
                    var obj = void 0;
                    obj = JSON.parse(currendata);
                    console.log(obj);
                    obj.push(Checkouts);
                    var json = JSON.stringify(obj);
                    fs.writeFile('./checkout.json', json, function (err) {
                        if (err)
                            throw err;
                        console.log('checkout saved!');
                        res.send(Checkouts);
                    });
                }
            });
        }
    });
});
var port = process.env.PORT || 4000;
app1.listen(port, function () { return console.log("App listening on PORT " + port); });
exports.default = app1;
