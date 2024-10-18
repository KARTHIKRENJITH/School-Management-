const mongoose = require ("mongoose")

const staffSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  email:{ type: String, required: true },
  password:{ type: String, required: true },
  role: { type: String, default: "staff" ,index:true }
 
 

});

module.exports = mongoose.model("Staff", staffSchema);