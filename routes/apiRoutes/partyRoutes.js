const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// update a candidate's party 
router.put('/candidate/:id', (req, res)=>{
    const errors = inputCheck(req.body, 'party_id');
    if(errors){
      res.status(400).json({ error: errors });
      return;
    }
    const sql =`UPDATE candidates SET party_id =?
    where id= ?`
    const params =[req.body.party_id, req.params.id]
    db.query(sql,params, (err, result)=>{
      if(err) { 
        res.status(400).json({ error: err.message });
        //check if a record was found
      } else if (!result.affectedRows) {
        res.json({
          message: 'Candidate not found'
        });
      } else {
        console.log(params);
        res.json({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
  });

  router.get('/parties',(req,res)=>{
      const sql = `SELECT * FROM parties`;
      db.query(sql,(err, rows)=>{
          if(err){
              res.status(500).json({ error: err.message });
              return
          }
          res.json({
              message :'sucess',
              data: rows
          });
      });
  });

  router.get('/party/:id', (req, res)=>{
      const sql =`SELECT * FROM parties WHERE id = ? `;
      const params = [req.params.id];
      db.query(sql, params, (err, row)=>{
          if(err){
              res.status(400).json({ error: err.message })
          }
          res.json({
              message: 'success',
              data: row
          });
      });
  });

  router.delete('/party/:id',(req, res) =>{
      const sql =`DELETE FROM parties WHERE id = ?`;
      const params = [req.params.id];
      db.query(sql, params, (err, result)=>{
          if(err){
              res.status(400).json({ err: err.message });
              //check if anything was deleted 
          } else if (!result.affectedRows){
              res.json({
                   message: 'party not found'
                  });
          } else { 
              res.json({
                  message: 'deleted',
                  changes: result.affectedRows,
                  id: req.params.id
              });
          }
      });
  });

  module.exports = router;