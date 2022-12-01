const express = require("express");
const HttpError = require('../models/http-error')
const student_controller = require('../controllers/student-controller')
/*----------------------------------------------------------------------------------------------------------------------------------------------
This gives us a special object on which we can also register middleware which is filtered by HTTP method in path, but we then can export our configured router by the end of this file, import it in index.js and register this entire configured router as one single middleware in the main server app
------------------------------------------------------------------------------------------------------------------------------------------------*/
const router = express.Router();
          // : indicates a dynamic element
router.get("/:rno/home", student_controller.getStudentbyRno);

router.get("/:rno/T1", student_controller.returnT1marks)

module.exports = router;