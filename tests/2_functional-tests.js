/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *       (if additional are added, keep them at the very end!)
 */

var chaiHttp = require("chai-http");
var chai = require("chai");
var assert = chai.assert;
var server = require("../server");
var ObjectId = require("mongodb").ObjectID;
chai.use(chaiHttp);

suite("Functional Tests", function() {
  var putId;
  suite("POST /api/issues/{project} => object with issue data", function() {
    test("Every field filled in", function(done) {
      chai
        .request(server)
        .post("/api/issues/test")
        .send({
          issue_title: "Title",
          issue_text: "text",
          created_by: "Functional Test - Every field filled in",
          assigned_to: "Chai and Mocha",
          status_text: "In QA"
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isDefined(res.body._id);
          assert.isDefined(res.body.issue_title);
          assert.isDefined(res.body.issue_text);
          assert.isDefined(res.body.created_by);
          assert.isDefined(res.body.assigned_to);
          assert.isDefined(res.body.status_text);
          assert.isDefined(res.body.created_on);
          assert.isDefined(res.body.updated_on);
          assert.isDefined(res.body.open);
          assert.property(res.body, "issue_title");
          assert.property(res.body, "issue_text");
          assert.property(res.body, "created_by");
          assert.property(res.body, "assigned_to");
          assert.property(res.body, "status_text");
          assert.property(res.body, "created_on");
          assert.property(res.body, "updated_on");
          assert.property(res.body, "open");
          assert.property(res.body, "_id");

          assert.equal(res.body.issue_title, "Title");
          assert.equal(res.body.issue_text, "text");
          assert.equal(
            res.body.created_by,
            "Functional Test - Every field filled in"
          );
          assert.equal(res.body.assigned_to, "Chai and Mocha");
          assert.equal(res.body.status_text, "In QA");
          //fill me in too!
          //console.log(res);
          done();
        });
    });

    test("Required fields filled in", function(done) {
      chai
        .request(server)
        .post("/api/issues/test")
        .send({
          issue_title: "Title",
          issue_text: "text",
          created_by: "Required fields filled in"
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isDefined(res.body._id);
          assert.isDefined(res.body.issue_title);
          assert.isDefined(res.body.issue_text);
          assert.isDefined(res.body.created_by);
          assert.isDefined(res.body.assigned_to);
          assert.isDefined(res.body.status_text);
          assert.isDefined(res.body.created_on);
          assert.isDefined(res.body.updated_on);
          assert.isDefined(res.body.open);
          assert.property(res.body, "issue_title");
          assert.property(res.body, "issue_text");
          assert.property(res.body, "created_by");
          assert.property(res.body, "assigned_to");
          assert.property(res.body, "status_text");
          assert.property(res.body, "created_on");
          assert.property(res.body, "updated_on");
          assert.property(res.body, "open");
          assert.property(res.body, "_id");
          assert.equal(res.body.issue_title, "Title");
          assert.equal(res.body.issue_text, "text");
          assert.equal(res.body.created_by, "Required fields filled in");
          assert.isDefined(res.body._id);
          putId = res.body._id;
          //fill me in too!
          //console.log(res);
          done();
        });
    });

    test("Missing required fields", function(done) {
      chai
        .request(server)
        .post("/api/issues/test")
        .send({
          issue_text: "",
          created_by: ""
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "missing inputs");
          done();
        });
    });
  });

  suite("PUT /api/issues/{project} => text", function() {
    test("No body", function(done) {
      chai
        .request(server)
        .put("/api/issues/test")
        .send({
          id: putId
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          // assert.equal( res.body, JSON.stringify({ message: "no updated field sent" }) );
          assert.equal(res.text, "no updated field sent");
          done();
        });
    });

    test("One field to update", function(done) {
      chai
        .request(server)
        .put("/api/issues/test")
        .send({
          _id: putId,
          issue_text: "let's modify 2"
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "successfully updated");
          //    assert.equal(
          //      res.body,
          //      JSON.stringify({
          //        message: "successfully updated 5e34571a7b6b0c09ea804dd6"
          //      })
          //  );
          done();
        });
    });

    test("Multiple fields to update", function(done) {
      chai
        .request(server)
        .put("/api/issues/test")
        .send({
          _id: putId,
          issue_text: "let's modify 20",
          status_text: "let's modify the status",
          open: "false"
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "successfully updated");
          // assert.equal(
          //   res.body,
          //   JSON.stringify({
          //     message: "successfully updated 5e34571a7b6b0c09ea804dd6"
          //   })
          //  );
          done();
        });
    });
  });

  suite(
    "GET /api/issues/{project} => Array of objects with issue data",
    function() {
      test("No filter", function(done) {
        chai
          .request(server)
          .get("/api/issues/test")
          .query({})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.isDefined(res.body[0]._id);
            assert.isDefined(res.body[0].issue_title);
            assert.isDefined(res.body[0].issue_text);
            assert.isDefined(res.body[0].created_by);
            assert.isDefined(res.body[0].assigned_to);
            assert.isDefined(res.body[0].status_text);
            assert.isDefined(res.body[0].created_on);
            assert.isDefined(res.body[0].updated_on);
            assert.isDefined(res.body[0].open);
            assert.property(res.body[0], "issue_title");
            assert.property(res.body[0], "issue_text");
            assert.property(res.body[0], "created_by");
            assert.property(res.body[0], "assigned_to");
            assert.property(res.body[0], "status_text");
            assert.property(res.body[0], "created_on");
            assert.property(res.body[0], "updated_on");
            assert.property(res.body[0], "open");
            assert.property(res.body[0], "_id");

            res.body.forEach(d => {
              assert.isDefined(d._id);
              assert.isDefined(d.issue_title);
              assert.isDefined(d.issue_text);
              assert.isDefined(d.created_by);
              assert.isDefined(d.assigned_to);
              assert.isDefined(d.status_text);
              assert.isDefined(d.created_on);
              assert.isDefined(d.updated_on);
              assert.isDefined(d.open);
              assert.property(d, "issue_title");
              assert.property(d, "issue_text");
              assert.property(d, "created_on");
              assert.property(d, "updated_on");
              assert.property(d, "created_by");
              assert.property(d, "assigned_to");
              assert.property(d, "open");
              assert.property(d, "status_text");
              assert.property(d, "_id");
            });
            done();
          });
      });

      test("One filter", function(done) {
        chai
          .request(server)
          .get("/api/issues/test")
          .query({ open: false })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.isDefined(res.body[0]._id);
            assert.isDefined(res.body[0].issue_title);
            assert.isDefined(res.body[0].issue_text);
            assert.isDefined(res.body[0].created_by);
            assert.isDefined(res.body[0].assigned_to);
            assert.isDefined(res.body[0].status_text);
            assert.isDefined(res.body[0].created_on);
            assert.isDefined(res.body[0].updated_on);
            assert.isDefined(res.body[0].open);
            assert.property(res.body[0], "issue_title");
            assert.property(res.body[0], "issue_text");
            assert.property(res.body[0], "created_by");
            assert.property(res.body[0], "assigned_to");
            assert.property(res.body[0], "status_text");
            assert.property(res.body[0], "created_on");
            assert.property(res.body[0], "updated_on");
            assert.property(res.body[0], "open");
            assert.property(res.body[0], "_id");
            res.body.forEach(d => {
              assert.equal(d.open, false);
              res.body.forEach(d => {
                assert.isDefined(d._id);
                assert.isDefined(d.issue_title);
                assert.isDefined(d.issue_text);
                assert.isDefined(d.created_by);
                assert.isDefined(d.assigned_to);
                assert.isDefined(d.status_text);
                assert.isDefined(d.created_on);
                assert.isDefined(d.updated_on);
                assert.isDefined(d.open);
                assert.property(d, "issue_title");
                assert.property(d, "issue_text");
                assert.property(d, "created_on");
                assert.property(d, "updated_on");
                assert.property(d, "created_by");
                assert.property(d, "assigned_to");
                assert.property(d, "open");
                assert.property(d, "status_text");
                assert.property(d, "_id");
              });
            });
            done();
          });
      });

      test("Multiple filters (test for multiple fields you know will be in the db for a return)", function(done) {
        chai
          .request(server)
          .get("/api/issues/test")
          .query({ created_by: "Functional Test - Every field filled in", open: "true" })
          .end(function(err, res) {
            assert.equal(res.status, 200);
           assert.isArray(res.body);
            assert.isDefined(res.body[0]._id);
            assert.isDefined(res.body[0].issue_title);
            assert.isDefined(res.body[0].issue_text);
            assert.isDefined(res.body[0].created_by);
            assert.isDefined(res.body[0].assigned_to);
            assert.isDefined(res.body[0].status_text);
            assert.isDefined(res.body[0].created_on);
            assert.isDefined(res.body[0].updated_on);
            assert.isDefined(res.body[0].open);
            assert.property(res.body[0], "issue_title");
            assert.property(res.body[0], "issue_text");
            assert.property(res.body[0], "created_by");
            assert.property(res.body[0], "assigned_to");
            assert.property(res.body[0], "status_text");
            assert.property(res.body[0], "created_on");
            assert.property(res.body[0], "updated_on");
            assert.property(res.body[0], "open");
            assert.property(res.body[0], "_id");
            res.body.forEach(d => {
              assert.isDefined(d._id);
                assert.isDefined(d.issue_title);
                assert.isDefined(d.issue_text);
                assert.isDefined(d.created_by);
                assert.isDefined(d.assigned_to);
                assert.isDefined(d.status_text);
                assert.isDefined(d.created_on);
                assert.isDefined(d.updated_on);
                assert.isDefined(d.open);
                assert.property(d, "issue_title");
                assert.property(d, "issue_text");
                assert.property(d, "created_on");
                assert.property(d, "updated_on");
                assert.property(d, "created_by");
                assert.property(d, "assigned_to");
                assert.property(d, "open");
                assert.property(d, "status_text");
                assert.property(d, "_id");
              assert.equal(d.created_by, "Functional Test - Every field filled in");
              assert.equal(d.open, true);
            });
            done();
          });
      });
    }
  );

  suite("DELETE /api/issues/{project} => text", function() {
    test("No _id", function(done) {
      chai
        .request(server)
        .delete("/api/issues/test")
        .send({})
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "_id error");
          //assert.equal(res.body, JSON.stringify({ message: "_id error" }));
          done();
        });
    });

    test("Valid _id", function(done) {
      var myID;
      chai
        .request(server)
        .post("/api/issues/test")
        .send({
          issue_title: "Delete",
          issue_text: "To be Deleted",
          created_by: "Delete delete"
        })
        .end(function(err, res) {
          myID = res.body._id;
          //console.log(myID);
          chai
            .request(server)
            .delete("/api/issues/test")
            .send({ _id: ObjectId(myID) })
            .end(function(err, res) {
             assert.equal(res.status, 200);
              assert.equal(res.text, "deleted " + myID);
              //    assert.equal(
              //      res.body,
              //      JSON.stringify({ message: "successfully deleted " + myID })
              //    );
              done();
            });
        });
    });
  });
});
