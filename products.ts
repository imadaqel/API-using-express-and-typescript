import app from './category';
var fs = require('fs');
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
    expirationDate?: Date;
}


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

app.post('/api/product', (req, res) => {
    var Product: IProduct = {
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
    if (Product.rawPrice >= Product.price) {
        res.send("rawPrice is more than price")
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
                    console.log('Lyric saved!');
                });
            }
        });
    }
    res.end()
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
                res.send({ message: `item ${itemId} doesn't exist` })
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
                res.send({ message: `item ${itemId} doesn't exist` })
            }
        }
    });
});


app.put('/api/product/:id', (req, res) => {
    let itemId: number = Number(req.params.id);
    // const item = req.body;
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
        res.send("rawPrice is more than price")
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



