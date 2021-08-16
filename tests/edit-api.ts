import chai, { expect } from "chai";
import server from "../App";
import chaiHttp from "chai-http";

chai.use(chaiHttp);

describe("Students Api Test", () => {
  describe("/PUT Student", () => {
    it("It should Update student data on server", (done) => {
        let studentId = 25;
        let student = {
            firstName : "Updated Name",
            lastName : "Updated Last Name",
            dateOfBirth : "1999-01-13",
            email:"hamzatariq7450@gmail.com",
            imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpzWSRLJULmPZ47m2ZI5bO3O_4vh8tO3xCHg&usqp=CAU"
        }
      chai
        .request(server)
        .put("/una/students/"+studentId)
        .send(student)
        .end(function (err, res) {
          expect(res).have.status(201);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});
