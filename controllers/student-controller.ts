//imports
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator/check";

import Student from "../models/student-model";
const STUDENTS_PER_PAGE: number = 5; //for pagination

const errorFunction = (err: any , next:any) => {
  //catching error
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err); //sending error to next(errorhandling middleware) middleware
}


//controller to get all students in the university
export const getStudents = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page: number = (req.query.page as unknown as number) || 1; //extracting page number
  Student.findAll({
    offset: (page - 1) * STUDENTS_PER_PAGE, //how many pages to left
    limit: STUDENTS_PER_PAGE, //no of items on current page
  })
    .then((students: any) => {
      if (students.length == 0) {
        //checking if students array length is equal to zero, to throw an error
        const err: any = new Error("No Students to Show"); //creating error
        err.statusCode = 404;
        throw err;
      }
      res.status(200).json({
        //sending response
        message: "Success",
        students,
      });
    })
    .catch((err:any) => {
      errorFunction(err,next);
    });
};

//controller to get single student
export const getStudent = (req: Request, res: Response, next: NextFunction) => {
  const studentId = req.params.studentID; //extracting student id from params
  Student.findByPk(studentId) //sequelize statement to search by primary key
    .then((student: any) => {
      if (!student) {
        //throwing error if not student found by that id
        const err: any = new Error("No Student to Show");
        err.statusCode = 404;
        throw err;
      }
      res.status(200).json({
        //sending response
        message: "success",
        student,
      });
    })
    .catch((err:any) => {
      errorFunction(err,next);
    });
};

//controller to post student data
export const postStudent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors: any = validationResult(req); //checking if any validation is failed
  if (!errors.isEmpty()) {
    //if errors array is not empty then throwing error
    const err: any = new Error(errors.errors[0].msg); //creating error
    err.statusCode = 422;
    throw err; //throwing error
  }

  //interface to check type of required fields
  interface InputObject {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    email: string;
    imageUrl: string;
  }

  //saving image using multer parser
  //const image: any = req.file;
  //imageUrl:string = image.path;

  //creating object to upload in database
  const uploadObject: InputObject = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
    email: req.body.email,
    imageUrl: req.body.imageUrl,  
  };

  Student.create(uploadObject) //sequelize create statement
    .then((result: any) => {
      res.status(201).json({
        //sending success response
        message: "successfully created",
        data: result,
      });
    })
    .catch((err:any) => {
      errorFunction(err,next);
    });
};

//controller to edit student data
export const editStudent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors: any = validationResult(req); //checking validation failuer
  if (!errors.isEmpty()) {
    const err: any = new Error(errors.errors[0].msg); //creating error with validation failuer message
    err.statusCode = 422;
    throw err; //throwing error
  }

  const studentId: string = req.params.studentID; //extracting id from params
  Student.findByPk(studentId)
    .then((student: any) => {
      if (!student) {
        //throwing error if no student is found by this id
        const err: any = new Error("No student found by this Id");
        err.statusCode = 404;
        throw err;
      }
      if (student.email !== req.body.email) {
        //if user changes email address then checking weather it is already present or not
        Student.findAll({ where: { email: req.body.email } })
          .then((students: any) => {
            if (students.length > 0) {
              //if student found by this email address then throwing error
              const err: any = new Error("Email Already Exists!");
              err.statusCode = 404;
              throw err;
            }
          })
          .catch((err:any) => {
            errorFunction(err,next);
          });
      }

      //typechecking interface
      interface InputObject {
        firstName: string;
        lastName: string;
        dateOfBirth: Date;
        email: string;
      }

      //creating object to upload
      const uploadedObject: InputObject = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        email: req.body.email,
      };
      return student.update(uploadedObject); //sequelize update statement
    })
    .then((updatedStudent: any) => {
      //sending positive response
      res.status(201).send({
        message: "Student Updated Successfully",
        updatedStudent,
      });
    })
    .catch((err:any) => {
      errorFunction(err,next);
    });
};

export const deleteStudent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const studentId: string = req.params.studentID; //extracting id from params
  Student.findByPk(studentId) //searching for specific student
    .then((student: any) => {
      if (!student) {
        //if no student found then throwing error
        const err: any = new Error("No Student found by this Id");
        err.statusCode = 404;
        throw err;
      }
      return student.destroy().then(() => {
        //if student found then destory it
        res.status(200).json({
          //sending success repsonse
          message: "Student deleted successfully",
        });
      });
    })
    .catch((err:any) => {
      errorFunction(err,next);
    });
};
