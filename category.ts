
import express from "express";
const app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

interface ICategory {
    id: number;
    name: string;
}
var uniqueId: number = 4;
app.post('/api/category', (req, res) => {
    uniqueId++;
    console.log(uniqueId, req.body.name)
    var Category: ICategory = {
        id: uniqueId,
        name: req.body.name
    }
    fs.readFile('./category.json', (err: string, currendata: string) => {
        if (err) {
            console.log(err);
        } else {
            let obj: { id: number, name: string }[];
            obj = JSON.parse(currendata);
            console.log(obj)
            obj.push(Category);
            var json = JSON.stringify(obj);
            fs.writeFile('./category.json', json, (err: string) => {
                if (err) throw err;
                console.log('Category saved!');
            });
        }
    });
    res.send(Category)
});

// function addProduct(name, categoryId) {
//     let categryIdsList :number[] = [1,2];
//     if (categryIdsList.indexOf(categoryId) === -1) {
//         throw new Error(`Couldn't found category with this id  (${categoryId})`);
//     }
// }

app.get('/api/category', (req, res) => {
    // try {
    //     addProduct('pp',10);
    //     return res.send('Product has been added successfully');
    // } catch (error) {
    //     return res.status(400).send(error);
    // }

    fs.readFile('./category.json', (err: string, data: string) => {
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

app.get('/api/category/:id', (req, res) => {
    // res.send('id: ' + req.params.id);
    let itemId: number = Number(req.params.id);
    fs.readFile('./category.json', (err: string, data: string) => {
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

app.delete('/api/category/:id', (req, res) => {
    let itemId: number = Number(req.params.id);
    fs.readFile('./category.json', (err: string, data: string) => {
        if (err) {
            console.log(err);
        } else {
            let obj: { id: number, name: string }[];
            obj = JSON.parse(data);
            const filtered_list = obj.filter(item => item.id != itemId);
            if (filtered_list) {
                var json = JSON.stringify(filtered_list);
                fs.writeFile('./category.json', json, (err: string) => {
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

app.put('/api/category/:id', (req, res) => {
    let itemId: number = Number(req.params.id);
    // const item = req.body;
    var item: ICategory = {
        id: req.body.id,
        name: req.body.name
    }
    console.log(item)
    fs.readFile('./category.json', (err: string, data: string) => {
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
            fs.writeFile('./category.json', json, (err: string) => {
                if (err) throw err;
                console.log('ele deleted');
            });
            res.send(updatedListItems)
        }
    });
});
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT ${port}`));

export default app;