const mongoose = require ("mongoose")

const workerSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  email:{ type: String, required: true },
  password:{ type: String, required: true },
  role: { type: String, default: "worker" ,index:true }
 

});

module.exports = mongoose.model("worker", workerSchema);