const express = require("express");
const Staff = require("../Model/Staff");
const bcrypt = require("bcryptjs");
const worker = require("../Model/Librarian");


const createEmployee = async (req,res)=>{
    try{
        const {name,email,password,role} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
         if(role === "staff"){
            let staff = new Staff({name,email,password:hashPassword,role});
            staff = await staff.save();
            res.send(staff);
         }
         else if(role === "worker"){
            let staff = new worker({name,email,password:hashPassword,role});
            staff = await staff.save();
            res.send(staff);
         }

    }catch(err){
        res.send(err);
        
    }
}

const getEmployee = async (req, res) => {
    try {
        
        const staffMembers = await Staff.find();
        const workers = await worker.find();
        const employees = [...staffMembers, ...workers];

        
        res.status(200).json(employees);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
};


const editEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, password, role } = req.body;

        // Create the update object
        const updateData = { name, email, role };

        // If a new password is provided, hash it and add to the updateData
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            updateData.password = hashPassword;
        }

        let employee;

        // Determine which model to use based on the role
        if (role === "staff") {
            employee = await Staff.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        } else if (role === "worker") {
            employee = await worker.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        } else {
            return res.status(400).json({ message: "Invalid role specified" });
        }

        // Check if the employee was found and updated
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json(employee);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
};

const deleteEmployee = async (req, res) => {
    try {
      const id = req.params.id;
  
      
      let staffUser = await Staff.findByIdAndDelete(id);
  
      let workerUser = null;
      if (!staffUser) {
        workerUser = await worker.findByIdAndDelete(id);
      }
  
      // Check if a user was deleted in either collection
      if (staffUser) {
        return res.status(200).json({ message: "Staff user deleted", user: staffUser });
      } else if (workerUser) {
        return res.status(200).json({ message: "worker user deleted", user: workerUser });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
  
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
    


module.exports = {
    createEmployee,
    getEmployee,
    editEmployee,
    deleteEmployee
}