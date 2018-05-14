const fs = require('fs');
const mysql = require('mysql');

const express = require('express');
const bodyParser = require('body-parser');
import { shopping_list, shopping_item } from './classes.js';
import { parse } from 'path';
const app = express()


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))



// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'));
const newShoppingList = new shopping_list();


/** mySql connecction */
 
//var config = JSON.parse(fs.readFileSync("config-secret.json"))
 
 var db = mysql.createConnection({
    "host": "127.0.0.1",
    "user": "root",
    "password": "vici2FHh",
    "port": 3306,
    "database": "hyf"
});
 
 db.connect( (err) => {
    //if(err) throw err;
    console.log('database connected ....');
});
 


//******************************** */



/**
 * Get all the item in the shopping list
 */
app.get("/shopping_list", (req, res) => {

    
    let sql = 'SELECT * FROM user';
    let query = db.query(sql, (err, result, fields) =>{
        if(err) throw err;
        //console.log(result);
        res.status(200).send(result);        
    }); 
    
    
})

/**
 * Get a specific item from the shopping list
 */
app.get("/shopping_list/:name", (req, res) => {
 
res.send(newShoppingList.list_of_item.filter(data => {
    if(data.name === req.params.name){
        return (data.name, data.amount, data.price);
    }
}));
    
})

/**
 * Add an item from the shopping list
 */
app.post("/shopping_list", (req, res) => {
    
    /* let data = {name: req.body.name, email: req.body.amount, phone: req.body.price}; */

    let data = {name: req.body.name, email: req.body.email, phone: req.body.phone};
    let sql = 'INSERT INTO user SET ?';

    db.query(sql, data, (err, result, fields) =>{
        if(err) throw err;
        //res.redirect('/shopping_list');
        //res.status(200).redirect('/shopping_list');

        res.status(200).redirect('/shopping_list');
        
    });
    //res.redirect()

    
})

/**
 * Delete an item from the shopping list
 */
app.delete("/shopping_list/:id", (req, res) => {
   
    /**code for database */

    console.log('Delete id', req.params.id);
    console.log('farts');
    let sql = `DELETE FROM user WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) =>{
        if(err) { throw err; }
    
        res.status(200).send(result);
        //return true; 
    });
    
})

 app.patch("/shopping_list/:id", (req , res) => {
    
    /* if(newShoppingList.list_of_item[req.params.id]){
        const item = newShoppingList.editItem(req.params.id, req.body);
        res.status(200).send(newShoppingList.list_of_item);
    } */

    
    console.log('Patch id', req.params.id);

    
    let sql = `UPDATE user SET name = '${req.body.name}', 
               email = '${req.body.email}', phone = '${req.body.phone}'  
               WHERE id = ${req.params.id}`;

    db.query(sql, (err, result) => {
        if(err) throw err;
        res.status(200).send(result);     
    });
   
})

app.listen(3000, function () {
 console.log('Example app listening on port 3000!')
})