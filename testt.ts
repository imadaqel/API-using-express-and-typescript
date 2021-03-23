// import app from './category';
// var fs = require('fs');

// interface ICheckouts {
//     id: number;
//     date?: Date;
//     products: [
//         {
//             productId: number;
//             unitPrice: number;
//             quantity: number;
//             subtotal: number;
//         }];
//     total: number;
//     discount: number;
//     payment_amount: number;
//     payment_method: string;
// }

// // app.post('/api/checkouts', (req, res) => {
// //     var Checkouts: ICheckouts = {
// //         id: req.body.id,
// //         date: req.body.date,
// //         products: [
// //             {
// //                 productId: req.body.products.productId,
// //                 unitPrice: req.body.products.unitPrice,
// //                 quantity: req.body.products.quantity,
// //                 subtotal: req.body.products.subtotal,
// //             }],
// //         total: req.body.total,
// //         discount: req.body.discount,
// //         payment_amount: req.body.payment_amount,
// //         payment_method: req.body.payment_method,

// //     }
// //     console.log(Checkouts);

// //     // // fs.readFile('./checkouts.json', (err: string, currendata: string) => {
// //     // //     if (err) {
// //     // //         console.log(err);
// //     // //     } else {
// //     // let obj: ICheckouts[];
// //     // // obj = JSON.parse(currendata);
// //     // // console.log(obj)
// //     // // obj.push(Checkouts);
// //     // var json = JSON.stringify(Checkouts);
// //     // fs.writeFile('./checkouts.json', json, (err: string) => {
// //     //     if (err) throw err;
// //     //     console.log('Checkouts saved!');
// //     // });
// //     // //     }
// //     // // });

// //     // res.end()
// // });
