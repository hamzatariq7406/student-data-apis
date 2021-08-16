import chai, { expect } from "chai";
import server from "../App";
import chaiHttp from "chai-http";

chai.use(chaiHttp);

describe("Students Api Test", () => {
  describe("/POST Student", () => {
    it("It should Post one student data on server", (done) => {
        let student = {
            firstName : "M.Hamza",
            lastName : "Tariq",
            dateOfBirth : "1999-01-13",
            email:"hamzatariq5445@gmail.com",
            imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpzWSRLJULmPZ47m2ZI5bO3O_4vh8tO3xCHg&usqp=CAU"
        }
      chai
        .request(server)
        .post("/una/student")
        .send(student)
        .end(function (err, res) {
          expect(res).have.status(201);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});
