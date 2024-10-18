const express = require("express")
const router = express.Router()
const {addBook,getBook,editBook,deleteBook} = require("../Controller/Book")



router.post("/create",addBook)
router.get("/get",getBook)
router.put("/edit/:id",editBook)
router.delete("/delete/:id",deleteBook)



module.exports = router