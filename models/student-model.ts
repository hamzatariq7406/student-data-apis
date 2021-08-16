//imports
import Sequelize from "sequelize";
import sequelize from "../util/database-connection";

const Student = sequelize.define("Student", {   //creating model Student
  //setting up id field and making it primary key
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  //other data relevant to student
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  imageUrl: Sequelize.STRING,
  email: Sequelize.STRING,
  dateOfBirth: Sequelize.DATE,
});

export default Student; //exporting
