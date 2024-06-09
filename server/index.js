const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'orders_db'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

// Get all orders
app.get('/fetch', (req, res) => {
    db.query('SELECT * FROM orders',
    (err, results) => {
        if (err) {
            console.log(err);
        }
        else{
            res.send(results);
        }
    });
  });
  

// Create order
app.post('/create', (req, res) => {
  const orderNumber = req.body.orderNumber;
  const date = req.body.date;
  const productCount = req.body.productCount;
  const finalPrice = req.body.finalPrice;
  db.query('INSERT INTO orders(ORDERNUM,DATE,PRODUCTS,PRICE) VALUES(?,?,?,?)', [orderNumber,date,productCount,finalPrice], (err, result) => {
    if (err) {
        console.log(err);
    }
    else{
        res.send("Order registered succesfully")
    }
  });
});

// Update order
app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const orderNumber = req.body.orderNumber;
  const date = req.body.date;
  const productCount = req.body.productCount;
  const finalPrice = req.body.finalPrice;
  db.query(`UPDATE orders SET ORDERNUM=?,DATE=?,PRODUCTS=?,PRICE=? WHERE ID=?`,[orderNumber,date,productCount,finalPrice,id], 
    (err, result) => {
    if (err) {
      console.log(err);
    }
    else{
      res.send("Order updated succesfully")
  }
  });
});
  
// Delete order
app.delete('/delete/:id', (req, res) => {
  const sql = `DELETE FROM orders WHERE ID = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    else{
      res.send("Order deleted succesfully")
  }
  });
});


// Get single order
app.get('/get/:id', (req, res) => {
  const sql = `SELECT * FROM orders WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    else{
      res.send(result)
  }
  });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});