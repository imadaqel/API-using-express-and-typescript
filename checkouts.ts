import express from "express";
const app1 = express();
var fs = require('fs');
var bodyParser = require('body-parser');
app1.use(bodyParser.urlencoded({
    extended: true
}));


interface ICheckouts {
    id: number;
    products: [
        {
            productId: number;
            unitPrice: number;
            quantity: number;
            subtotal: number;
        }];
    total: number;
    discount: number;
    payment_amount: number;
    payment_method: string;
}
var uniqueId: number = 4;

app1.post('/api/checkouts', (req, res) => {
    uniqueId++;
    console.log(req.body)
    var Checkouts: ICheckouts = {
        id: uniqueId,
        products: [
            {
                productId: req.body.products[0].productId,
                unitPrice: req.body.products[0].unitPrice,
                quantity: req.body.products[0].quantity,
                subtotal: req.body.products[0].quantity * req.body.products[0].unitPrice,
            }],
        total: req.body.total,
        discount: req.body.discount,
        payment_amount: req.body.payment_amount,
        payment_method: req.body.payment_method,

    }
    console.log(Checkouts);

    fs.readFile('./product.json', (err: string, currendata: string) => {
        let data: { id: number, name: string }[];
        data = JSON.parse(currendata)
        const productid = data.find(_item => _item.id == req.body.products[0].productId);
        console.log("hello hello hello", productid)
        if (!productid) {
            res.send("no related product with this id")
        }
        else {
            fs.readFile('./checkout.json', (err: string, currendata: string) => {
                if (err) {
                    console.log(err);
                } else {

                    let obj: ICheckouts[];
                    obj = JSON.parse(currendata);
                    console.log(obj)
                    obj.push(Checkouts);
                    var json = JSON.stringify(obj);
                    fs.writeFile('./checkout.json', json, (err: string) => {
                        if (err) throw err;
                        console.log('checkout saved!');
                        res.send(Checkouts)
                    });
                }
            });
        }
    });



});



const port = process.env.PORT || 4000;

app1.listen(port, () => console.log(`App listening on PORT ${port}`));

export default app1;