import { Sequelize } from "sequelize";

console.log(process.env.DATABASE_PASSWORD);
//connecting to MySql by providing required configuration
const sequelize: any = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_FOLDER, process.env.DATABASE_PASSWORD, {
  dialect: "mysql",
  host: process.env.DATABASE_HOST,
  logging:false
});

export default sequelize;
