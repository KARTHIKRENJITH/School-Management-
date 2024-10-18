const express = require("express");
const router = express.Router();
const {createEmployee,getEmployee,editEmployee,deleteEmployee} = require("../Controller/Staff");


router.post("/create", createEmployee);
router.delete("/delete/:id", deleteEmployee);
router.put("/edit/:id", editEmployee);
router.get("/get", getEmployee);

module.exports = router;