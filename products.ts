// import app from './category';
// var fs = require('fs');
import express from "express";
const app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

interface IProduct {
    id: number;
    name: string;
    rawPrice: number;
    price: number;
    code: string;
    color: string;
    categoryId: number;
    description?: string;
    stockCount?: number;
    expirationDate?: number;
}
app.post('/api/product', (req, res) => {
    var Product: IProduct = {
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
    }
    if (Product.rawPrice >= Product.price) {
        res.status(404).send("rawPrice is more than price")
    }
    else {
        fs.readFile('./category.json', (err: string, currendata: string) => {
            let data: { id: number, name: string }[];
            data = JSON.parse(currendata)
            const categoryid = data.find(_item => _item.id == Product.categoryId);
            console.log("hello hello hello", categoryid)
            if (!categoryid) {
                res.status(404).send("no related category with this id")
            }
            else {
                fs.readFile('./product.json', (err: string, currendata: string) => {
                    if (err) {
                        console.log(err);
                    } else {
                        let obj: IProduct[];
                        obj = JSON.parse(currendata);
                        console.log(obj)
                        obj.push(Product);
                        var json = JSON.stringify(obj);
                        fs.writeFile('./product.json', json, (err: string) => {
                            if (err) throw err;
                            console.log('product saved!');
                            res.send(Product)
                        });
                    }
                });
            }
        });
    }
});

app.get('/api/product', (req, res) => {
    fs.readFile('./product.json', (err: string, data: string) => {
        if (err) {
            console.log(err);

        } else {
            let obj: { id: number, name: string }[];
            obj = JSON.parse(data);
            console.log(obj)
            res.send(obj)
        }
    });
});

app.get('/api/product/:id', (req, res) => {
    let itemId: number = Number(req.params.id);
    fs.readFile('./product.json', (err: string, data: string) => {
        if (err) {
            console.log(err);
        } else {
            let obj: { id: number, name: string }[];
            obj = JSON.parse(data);
            const item = obj.find(_item => _item.id == itemId);
            if (item) {
                res.send(item)
            }
            else {
                res.status(404).send({ message: `item ${itemId} doesn't exist` })
            }
        }
    });
});

app.delete('/api/product/:id', (req, res) => {
    let itemId: number = Number(req.params.id);
    fs.readFile('./product.json', (err: string, data: string) => {
        if (err) {
            console.log(err);
        } else {
            let obj: { id: number, name: string }[];
            obj = JSON.parse(data);
            const filtered_list = obj.filter(item => item.id != itemId);
            if (filtered_list) {
                var json = JSON.stringify(filtered_list);
                fs.writeFile('./product.json', json, (err: string) => {
                    if (err) throw err;
                    console.log('ele deleted');
                });
                res.send(filtered_list)
            }
            else {
                res.status(404).send({ message: `item ${itemId} doesn't exist` })
            }
        }
    });
});


app.put('/api/product/:id', (req, res) => {
    let itemId: number = Number(req.params.id);
    var item: IProduct = {
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
    }
    console.log(item)
    if (item.rawPrice >= item.price) {
        res.status(404).send("rawPrice is more than price")
    }
    else {
        fs.readFile('./category.json', (err: string, currendata: string) => {
            let data: { id: number, name: string }[];
            data = JSON.parse(currendata)
            const categoryid = data.find(_item => _item.id == req.body.products[0].productId);
            console.log("categoryid", categoryid)
            if (!categoryid) {
                res.status(404).send("no related category with this id")
            }
            else {
                fs.readFile('./product.json', (err: string, data: string) => {
                    if (err) {
                        console.log(err);
                    } else {
                        var updatedListItems: any = [];
                        let obj: { id: number, name: string }[];
                        obj = JSON.parse(data);
                        obj.forEach(oldItem => {
                            if (oldItem.id == itemId) {
                                console.log(item)
                                updatedListItems.push(item);
                            } else {
                                console.log(oldItem)
                                updatedListItems.push(oldItem);
                                console.log(updatedListItems)
                            }
                        });
                        var json = JSON.stringify(updatedListItems);
                        fs.writeFile('./product.json', json, (err: string) => {
                            if (err) throw err;
                            console.log('ele updated');
                        });
                        res.send(updatedListItems)
                    }
                });
            }
        });
    }
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`App listening on PORT ${port}`));


