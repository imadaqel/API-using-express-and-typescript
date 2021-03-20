  
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
app.post('/api/category', (req, res) => {
    var Category:ICategory={
        id:req.body.id,
        name:req.body.name
    }
    fs.readFile('./MOCK_DATA.json', (err:string, currendata:string) => {
        if (err){
            console.log(err);
        } else {
            let obj: { id: number, name: string }[];
    
            obj = JSON.parse(currendata);
            console.log(obj)
            obj.push(Category);
            var json = JSON.stringify(obj); 
            fs.writeFile('./MOCK_DATA.json', json, (err:string) => {
                    if (err) throw err;
                    console.log('Lyric saved!');
                });
    }});
    res.end()
});
app.get('/api/category', (req, res) => {
    fs.readFile('./MOCK_DATA.json', (err:string, data:string) => {
        if (err){
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
    let itemId:number = Number(req.params.id);
    fs.readFile('./MOCK_DATA.json', (err:string, data:string) => {
        if (err){
            console.log(err);
        } else {
            let obj: { id: number, name: string }[];
            obj = JSON.parse(data);
            // obj.forEach(oldItem => {
                const item = obj.find(_item  => _item.id == itemId);
                // if (Number(oldItem.id) == itemId) {
                //     console.log("oldItem.id",oldItem.id)
                //     console.log("itemId",itemId)
                //     res.send(oldItem)
                // } else {
                //     console.log("error")
                // }
                if(item){
                    res.send(item)
                }
                else{
                    res.send({ message: `item ${itemId} doesn't exist`})
                }
        // });
        }});
    });

    app.delete('/api/category/:id', (req, res) => {
        let itemId:number = Number(req.params.id);
        fs.readFile('./MOCK_DATA.json', (err:string, data:string) => {
            if (err){
                console.log(err);
            } else {
                let obj: { id: number, name: string }[];
                obj = JSON.parse(data);
                const filtered_list = obj.filter(item => item.id != itemId);
                    if(filtered_list){
            var json = JSON.stringify(filtered_list); 
                        fs.writeFile('./MOCK_DATA.json', json, (err:string) => {
                            if (err) throw err;
                            console.log('ele deleted');
                        });
                        res.send(filtered_list)
                    }
                    else{
                        res.send({ message: `item ${itemId} doesn't exist`})
                    }
            }});
    });


    app.put('/api/category/:id', (req, res) => {
        let itemId:number = Number(req.params.id);
        // const item = req.body;
        var item:ICategory={
            id:req.body.id,
            name:req.body.name
        }
        console.log(item)
        fs.readFile('./MOCK_DATA.json', (err:string, data:string) => {
            if (err){
                console.log(err);
            } else {
                var updatedListItems : any=[];
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
                        fs.writeFile('./MOCK_DATA.json', json, (err:string) => {
                            if (err) throw err;
                            console.log('ele deleted');
                        });
                        res.end(updatedListItems)
}});
    });





const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT ${port}`));

export default app;