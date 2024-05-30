import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";

chai.use(chaiHttp);

describe("authors", () => {
  it("should not create authors", (done) => {
    chai
      .request(app)
      .post("/api/authors")
      .send({
        first_name: 31212,
        last_name: "Anderson",
        birth_date: "1932-10-21T14:30:00Z",
        death_date: null,
      })
      .end((req, res) => {
        console.log(res.body); // This is useful for debugging. Make sure you remove it before you commit your code
        chai.expect(res.body.msg).to.be.equal("first_name should be a string");
        done();
      });
  });

  it("should create institution", (done) => {
    chai
      .request(app)
      .post("/api/institutions")
      .send({
        first_name: "George",
        last_name: "Anderson",
        birth_date: "1932-10-21T14:30:00Z",
        death_date: null,
      })
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(201);
        chai.expect(res.body).to.be.a("object");
        chai
          .expect(res.body.msg)
          .to.be.equal("author successfully created");
        done();
      });
  });

  it("should get all authors", (done) => {
    chai
      .request(app)
      .get("/api/authors")
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.data).to.be.a("array");
        done();
      });
  });

  it("should get authors by id", (done) => {
    chai
      .request(app)
      .get("/api/authors/1")
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.data).to.be.a("object");
        chai.expect(res.body.data.first_name).to.be.equal("George");
        done();
      });
  });

  it("should not update author by id", (done) => {
    chai
      .request(app)
      .put("/api/authors/1")
      .send({
        first_name: "George",
        last_name: "Anderson",
        birth_date: "hamburger",
        death_date: null,
      })
      .end((req, res) => {
        chai.expect(res.body.msg).to.be.equal("birth_date should be a datetime");
        done();
      });
  });

  it("should update institution by id", (done) => {
    chai
      .request(app)
      .put("/api/institutions/2")
      .send({
        first_name: "George2",
        last_name: "Anderson2",
        birth_date: "1933-10-21T14:30:00Z",
        death_date: null,
      })
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai
          .expect(res.body.msg)
          .to.be.equal("Institution with the id: 2 successfully updated");
        done();
      });
  });

  it("should delete authors by id", (done) => {
    chai
      .request(app)
      .delete("/api/authors/1")
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai
          .expect(res.body.msg)
          .to.be.equal("author with the id: 1 successfully deleted");
        done();
      });
  });
});