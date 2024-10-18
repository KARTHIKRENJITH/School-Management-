const mongoose = require ("mongoose")

const studentSchema = new mongoose.Schema({
    name :  { type: String, required: true },
    std : { type: Number, required: true },
    gender : { type: String, required: true },

    bookname : { type: String, required: true },
    section: { type: String, required: true },
    purchasedate : { type: String, required: true },
    returndate : { type: String, required: true },


    fees : { type: Number, required: true },
    date : { type: String, required: true },

    remarks : { type: String, required: true }



});

module.exports = mongoose.model("student", studentSchema);