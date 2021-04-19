/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";
const dotenv = require("dotenv");
require("dotenv").config();
var expect = require("chai").expect;
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
const bodyParser = require("body-parser");
const CONNECTION_STRING = process.env.DB;
const cors = require("cors");

module.exports = function(app) {
  //database connection

  MongoClient.connect(
    process.env.DB,
    { useUnifiedTopology: true },
    (err, database) => {
      if (err) {
        console.log("Database error: " + err);
      } else {
        const myAwesomeDB = database.db("issues");
        console.log("Successful database connection");
        //manca il body parser
        app.route("/api/issues/:project").post(function(req, res) {
          var project = req.params.project;
          
          if (
            req.body.issue_title != null &&
            req.body.issue_text != null &&
            req.body.created_by != null
          ) {
            myAwesomeDB.collection(project).insertOne(
              {
                // _id: new ObjectId(id),
                issue_title: req.body.issue_title,
                issue_text: req.body.issue_text,
                created_by: req.body.created_by,
                assigned_to: req.body.assigned_to || "",
                status_text: req.body.status_text || "",
                created_on: new Date(),
                updated_on: new Date(),
                open: true
              },
              function(err, data) {
                if (err) {
                  res.send({ err: "error" });
                } else {
                  //console.log(data.ops);
                  res.send(data.ops[0]);
                  //console.log(data.ops[0]);
                }
              }
            );
          } else {
            //console.log("missing");
           // res.send({ message: "missing required fields" });
            res.send({ error: 'required field(s) missing' });
          }
        });
        app
          .route("/api/issues/:project")
          .get(function(req, res) {
            var project = req.params.project;
            var filter = req.query;
          //console.log(filter);
            if (filter.open == "true") {
              filter.open = true;
            } else if (filter.open == "false") {
              filter.open = false;
            }
           if (filter._id != undefined){
             filter._id= ObjectId(filter._id)
           }
            // console.log(filter)
            myAwesomeDB
              .collection(project)
              .find(filter)
              .toArray((err, data) => {
                if (err) throw err;
                // console.log(data[0]);
                res.send(data);
              });
          })
          .put(function(req, res) {
            // funziona, manca la checkbox!!
            var project = req.params.project;
            var updates = {};
            if (req.body._id == "" || req.body._id == undefined){
              res.send({ error: 'missing _id' })
            }
            if (
              req.body.issue_title != "" &&
              req.body.issue_title != undefined
            ) {
              updates["issue_title"] = req.body.issue_title;
            }
            if (req.body.issue_text != "" && req.body.issue_text != undefined) {
              updates["issue_text"] = req.body.issue_text;
            }
            if (req.body.created_by != "" && req.body.created_by != undefined) {
              updates["created_by"] = req.body.created_by;
            }
            if (
              req.body.assigned_to != "" &&
              req.body.assigned_to != undefined
            ) {
              updates["assigned_to"] = req.body.assigned_to;
            }
            if (
              req.body.status_text != "" &&
              req.body.status_text != undefined
            ) {
              updates["status_text"] = req.body.status_text;
            }
            if (req.body.open == "false") {
              updates["open"] = false;
            }
            //confronta i campi fuori dalla funzione e modifica solo quelli non vuoti
            //console.log(updates);
            if (JSON.stringify(updates) != JSON.stringify({})) {
              updates["updated_on"] = new Date();
              myAwesomeDB.collection(project).findOneAndUpdate(
                { _id: ObjectId(req.body._id) },
                {
                  $set: updates
                },
                { returnNewDocument: true, strict: false },
                function(err, data) {
                  if (err)
                    res.send({ error: 'could not update', '_id': req.body._id })
                    //res.json(JSON.stringify({ message: "could not update " + req.body._id }));
                  //non va bene
                  else {
                    //console.log(data)
                    if (data.lastErrorObject.updatedExisting == true ) {
                      //i found something
                      res.json({  result: 'successfully updated', '_id': req.body._id });
                     // res.json(JSON.stringify(({ message: "successfully updated " //+ req.body._id   })));
                    } else { //i did not find it
                      console.log("i'm here")
                      res.json({ error: 'could not update', '_id': req.body._id });
                    }
                  }
                }
              );
              //ritorna il nuovo dato, levala, non serve
            } else {
              //res.json(JSON.stringify({ message: "no updated field sent" }));
              res.send({ error: 'no update field(s) sent', '_id': req.body._id });
            }
          
          })

          .delete(function(req, res) {
            var project = req.params.project;
            var id = req.body._id;
            if (req.body._id == undefined || req.body._id == "") {
              //console.log("no id");
              res.send({ error: 'missing _id' })
              //res.json(JSON.stringify({ message: "_id error" }));
            } else {
               myAwesomeDB.collection(project)
                .deleteOne({_id: ObjectId(id)}, function(err, data) {
                  if (err)  {
                    
                    console.log("error could not delete" + req.body._id)
                    res.send({ error: 'could not delete', '_id': req.body._id })
                  }//res.json(JSON.stringify({ message: "successfully deleted"}));
                  else {
                    console.log(data.deletedCount);
                    if (data.deletedCount == 1) {
                       res.send({ result: 'successfully deleted', '_id': req.body._id });
                    }
                    else {
                      res.send({ error: 'could not delete', '_id': req.body._id })
                    }
                    //res.json(
                      //JSON.stringify({ message: "successfully deleted"})
                   // );
                  }
                  //console.log(res.body)
                });
               
            }
          });

        app.use(function(req, res, next) {
          res
            .status(404)
            .type("text")
            .send("Not Found");
        });
      }
    }
  );
};
