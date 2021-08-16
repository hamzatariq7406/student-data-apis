//imports
import express, { Request } from "express";
import { body } from "express-validator/check";

import {
  postStudent,
  getStudents,
  getStudent,
  deleteStudent,
  editStudent,
} from "../controllers/student-controller";
import Student from "../models/student-model";

//validation array used in post and edit routes to validate input data
const validationArray = [
  body("firstName")   //validation on first name field
    .trim()
    .isLength({ min: 3 })
    .matches(/[ A-Za-z.]/)
    .withMessage(
      "First Name should be atleast of 3 characters and has Alphabets"
    ),
  body("lastName")   //validation on last name field
    .trim()
    .isLength({ min: 3 })
    .matches(/[ A-Za-z.]/)
    .withMessage(
      "Last Name should be atleast of 3 characters and has Alphabets"
    ),
  body("dateOfBirth")  //validation on date of birth
    .isDate()
    .withMessage("Date of Birth format is incorrect. Format is YYYY-MM-DD"),
];

const router: express.Router = express.Router();  

//defining routes
router.get("/students", getStudents);
router.get("/students/:studentID", getStudent);
router.delete("/students/:studentID", deleteStudent);

router.post(
  "/student",
  [
    body("email") //validation on email field
      .isEmail()
      .withMessage("Please Enter a valid email")
      .custom((value: string, { req }) => {             //custom validation to check weather an email already exists or not
        return Student.findAll({ where: { email: value } }).then(
          (student: any) => {
            if (student.length > 0) {
              return Promise.reject("Email Already Exists");
            }
          }
        );
      })
      .normalizeEmail(),
      ...validationArray  //spreading validation array
    ],
  postStudent
);

router.put(
  "/students/:studentID",
  [
    body("email")  //validation on email field
      .isEmail()
      .withMessage("Please Enter a valid email")
      .normalizeEmail(),
      ...validationArray
  ],
  editStudent
);

export default router;  //exporting
