const HttpError=require('../models/http-error')
class Student {
  constructor(rno, name, batch, t1marks, t2marks, t3marks) {
    this.enrollno = rno;
    this.name = name;
    this.batch = batch;
    this.t1marks = t1marks;
    this.t2marks = t2marks;
    this.t3marks = t3marks;
  }
}
let student1 = new Student("20103005", "Anisha Jain", "B1", 17.7, 13, 28);
const DUMMY_STUDENTS = [student1];

/*I have used this syntax to create a function. Alternatively, you can create a function object like const funcname = function(args){...} 
Or a function expression with an arrow function like const funcname = (args) => {...}*/

function getStudentbyRno(req, res, next) {
  const rollno = req.params.rno; //req.params returns object like { rno: '20103005' }
  const retstudent = DUMMY_STUDENTS.find((s) => {
    return s.enrollno === rollno;
  });
  if (!retstudent) {
    const err = new HttpError(
      "Could not find student with specified enrollment no.",
      404
    );
    throw err; //use return next(err) while working with asynchronous code i.e. when using database server with this
  }
  res.status(200).json({ retstudent });
}

function returnT1marks(req, res, next) {
  const rollno = req.params.rno; //req.params returns object like { rno: '20103005' }
  const retT1 = DUMMY_STUDENTS.find((s) => {
    if (s.enrollno === rollno)
      return s.t1marks;
  });
  if (!retT1) {
    const err = new HttpError(
      "Could not find student with specified enrollment no.",
      404
    );
    throw err;
  }
  res.status(200).json({ retT1 });
}

module.exports = { getStudentbyRno, returnT1marks };