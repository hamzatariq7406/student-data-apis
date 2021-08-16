//imports 
import express, { Request, Response, NextFunction } from "express";
import bodyparser from "body-parser";
import path from "path";
import multer from "multer";

import sequelize from "./util/database-connection";
import StudentRoute from "./routes/student-routes";
import Student from "./models/student-model";

//console.log(Student);

const app = express();

//multer required configuration
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

//body parsers for json data and for images
app.use(bodyparser.json());
app.use(multer({ storage: diskStorage }).single("image"));
app.use("/images", express.static(path.join(__dirname, "images")));

//Route
app.use("/una", StudentRoute);

//Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode).send({
    message: err.message,
  });
});

//Connecting to database and establishing server connection
sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
     app.listen("3000", () => {
      console.log("Server Connected");
    });
  })
  .catch((err: any) => {
    console.log(err);
    err.statusCode = 505;
    throw err;
  });

  export default app;
