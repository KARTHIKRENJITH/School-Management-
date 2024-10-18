const mongoose = require ("mongoose")

const bookSchema = new mongoose.Schema({

    bookname :  { type: String, required: true },
    author : { type: String, required: true },
    edition : { type: Number, required: true },
    quantity : { type: Number, required: true },
    date : { type: String, required: true },
    remarks : { type: String, required: true }

});

module.exports = mongoose.model("book", bookSchema);