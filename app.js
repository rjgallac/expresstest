const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/items');
let dotenv = require('dotenv').config()

const app = express();

const mongodb = 'mongodb+srv://' + process.env.mongouser +':' + process.env.mongopassword +'@cluster0.6qsz2.mongodb.net/item-database?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongodb)
    .then(()=>console.log("connected"))
    .catch(err=>console.log(err))
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))
app.listen(3000);

app.get('/', (req, res) =>{

    res.redirect('get-items');
});

app.get('/create-item', (req,res) =>{
    const item = new Item({
        name: 'phone',
        price: 200
    })
    item.save()
    .then(result=> res.send(result))
    .catch(err=>console.log(err));
})

app.get('/get-items', (req, res) =>{
    Item.find()
    .then(result=> res.render('index', {items:result}))
    .catch(err=>console.log(err));
})


app.get('/get-item', (req, res) =>{
    Item.findById('671d2d4c3411833ad8a7fbf1')
    .then(result=> res.send(result))
    .catch(err=>console.log(err));
})


app.get('/add-item', (req, res) =>{
    res.render('add-item');
});

app.post('/items', (req,res) =>{
    console.log(req.body);
    const item = Item(req.body);
    item.save().then(() =>{
        res.redirect('/get-items');
    }).catch(err=>console.log(err))
})

app.use((req,res) => {
    res.render('error');
});