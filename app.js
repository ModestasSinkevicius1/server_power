const express = require("express");
const app = express();
const port = 3006;

const cors = require("cors");
app.use(cors());
const mysql = require("mysql");
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

//express settings
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "energija",
});

//CREATE
app.post('/server/providers', (req, res) => {
  const sql = `
  INSERT INTO power_provider (title, price)
  VALUES (?, ?)
  `;
  con.query(sql, [req.body.title, req.body.price], (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});

//READ ALL
app.get('/server/providers', (req, res) => {
  const sql = `
  SELECT * FROM power_provider;
  `;
  con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});

// DELETE
app.delete('/server/providers/:id', (req, res) => {
  const sql = `
  DELETE FROM power_provider WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});

// EDIT
app.put('/server/providers/:id', (req, res) => {
  const sql = `
  UPDATE power_provider SET title = ?, price= ? WHERE id = ?
  `;
  con.query(sql, [req.body.title, req.body.price, req.params.id], (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});

//CLIENTS <---------------------------------

//CREATE
app.post('/server/clients', (req, res) => {
  const sql = `
  INSERT INTO power_client (name, surname, counter, power_id)
  VALUES (?, ?, ?, ?)
  `;
  con.query(sql, [req.body.name, req.body.surname, req.body.number, req.body.suplier], (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});

//READ ALL
app.get('/server/clients', (req, res) => {
  const sql = `
  SELECT * FROM power_client;
  `;
  con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});

// DELETE
app.delete('/server/clients/:id', (req, res) => {
  const sql = `
  DELETE FROM power_client WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});

// EDIT
app.put('/server/clients/:id', (req, res) => {
  const sql = `
  UPDATE power_client SET name = ?, surname= ?, counter= ?, power_id=? WHERE id = ?
  `;
  con.query(sql, [req.body.name, req.body.surname, req.body.number, req.body.suplier, req.params.id], (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});


app.listen(port, () => {
  console.log(`Power is flowing on port ${port}`)
})