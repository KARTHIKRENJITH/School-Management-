const express = require ("express")
const router = express.Router()

const {Login,Logout,getCount} = require ("../Controller/Auth")



router.post("/login", Login)
router.post("/logout", Logout)
router.get("/count",getCount)


module.exports = router;