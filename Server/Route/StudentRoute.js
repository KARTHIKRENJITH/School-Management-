const express = require("express");
const router = express.Router();
const {createStudent,editStudent,deleteStudent,getStudent} = require("../Controller/Student");


router.post("/create",createStudent)
router.put("/edit/:id",editStudent)
router.delete("/delete/:id",deleteStudent)
router.get("/get",getStudent)



module.exports = router