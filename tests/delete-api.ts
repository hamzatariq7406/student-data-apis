import chai, { expect } from "chai";
import server from "../App";
import chaiHttp from "chai-http";

chai.use(chaiHttp);

describe("Students Api Test", () => {
  describe("/DELETE Student", () => {
    it("It should delete one student", (done) => {
        let studentId = 15;
      chai
        .request(server)
        .delete("/una/students/"+ studentId)
        .end(function (err, res) {
          expect(res).have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});
