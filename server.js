const express = require("express");
const mysql = require("mysql2");
const inputCheck = require('./utils/inputCheck');

// add port designation
const PORT = process.env.PORT || 3001;
const app = express();
// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Conect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    //MySQL username,
    user: "root",
    //MySQL password
    password: " ",
    database: "election",
  },
  console.log("connected to the election database.")
);
//get all candidate
app.get("/api/candidates", (req, res) => {
  const sql = `SELECT * FROM candidates`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// get a single candidate
app.get("/api/candidate/:id", (req, res) => {
  const sql = `SELECT * FROM candidates WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }

    res.json({
      message: "success",
      data: row,
    });
  });
});

// delete candidate
app.delete('/api/candidate/:id', (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Candidate is not found',
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

// create a candidate
app.post('/api/candidate', ({ body }, res)=> {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
        res.status(400).json({ error: errors});
        return;
    }
    const sql =`INSERT INTO candidates(first_name, last_name, industry_connected)
    VALUES (?,?,?)`;
    const params =[body.first_name, body.last_name, body.industry_connected];
    db.query(sql, params, (err, result) => {
        if(err){
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

app.use((req, res) => {
  res.status(404).end();
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
