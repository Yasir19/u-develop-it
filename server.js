const express = require('express');
const mysql =require('mysql2');

// add port designation
const PORT = process.env.PORT || 3001;
const app = express();
// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Conect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //MySQL username,
        user: 'root',
        //MySQL password
        password: 'Kurama33$',
        database: 'election'
},
console.log('connected to the election database.')
);
db.query(`SELECT * FROM candidates`,(err, rows)=>{
    console.log(rows)
})



app.use((req, res)=>{
    res.status(404).end();
})
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})