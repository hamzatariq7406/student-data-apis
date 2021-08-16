import chai, { expect } from "chai";
import server from "../App";
import chaiHttp from "chai-http";

chai.use(chaiHttp);

describe("Students Api Test", () => {
  describe("/GET Student", () => {
    it("It should GET all the students", (done) => {
      chai
        .request(server)
        .get("/una/students")
        .end(function (err, res) {
          expect(res).have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});
