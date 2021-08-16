import { Sequelize } from "sequelize";

//connecting to MySql by providing required configuration
const sequelize: any = new Sequelize("task2", "root", "hamza7406", {
  dialect: "mysql",
  host: "localhost",
  logging:false
});

export default sequelize;
