const express = require("express");
const Student = require("../Model/Student");

const createStudent = async (req, res) => {
    try {
        const { name, std, gender, bookname, section, purchasedate, returndate, fees, date, remarks } = req.body;

        const student = new Student({ name, std, gender, bookname, section, purchasedate, returndate, fees, date, remarks });

        await student.save();

        res.send(student);
    }catch (err) {
        res.send(err);
    }
}

const getStudent = async (req, res) => {
    try{
        const students = await Student.find();
        res.status(200).json(students);

    }catch(err){
        res.send(err);
    }
}

const editStudent = async (req, res) => {
    try{
        const id = req.params.id;
        const { name, std, gender, bookname, section, purchasedate, returndate, fees, date, remarks } = req.body;
        const student = await Student.findByIdAndUpdate(id, { name, std, gender, bookname, section, purchasedate, returndate, fees, date, remarks });
        res.send(student);


    }catch(err){
        res.send(err);
    }
}


const deleteStudent = async (req, res) => {
    try{
        const id = req.params.id;
        const student = await Student.findByIdAndDelete(id);
        res.send(student);

    }catch(err){
        res.send(err);
    }
}


module.exports = {
    createStudent,
    editStudent,
    deleteStudent,
    getStudent
}