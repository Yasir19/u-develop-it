const mysql = require("mysql2");

// Conect to database
const db = mysql.createConnection(
    {
      host: "localhost",
      //MySQL username,
      user: "root",
      //MySQL password
      password: "",
      database: "election",
    },
    console.log("connected to the election database.")
  );

  module.exports = db;