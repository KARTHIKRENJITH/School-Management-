const express = require("express")
const Book = require("../Model/Book")

const addBook = async (req, res) => {
    try {
      const { bookname, author, edition, quantity, date, remarks } = req.body;
  
      // Check if all required fields are present
      if (!bookname || !author || !edition || !quantity || !date || !remarks) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Create a new book instance
      const book = new Book({ bookname, author, edition, quantity, date, remarks });
  
      // Save the book to the database
      await book.save();
  
      res.status(201).json(book);
    } catch (err) {
      console.error("Error adding book:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  

const getBook = async (req, res) => {
    try{
        const books = await Book.find();
        res.status(200).json(books);
    }catch(err){
        res.send(err);
    }
}

const editBook = async (req, res) => {
    try{
        const id = req.params.id;
        const {bookname, author, edition, quantity, date, remarks} = req.body;
        const book = await Book.findByIdAndUpdate(id, {bookname, author, edition, quantity, date, remarks});
        res.send(book);
    }catch(err){
        res.send(err);
    }
}

const deleteBook = async (req, res) => {
    try{
        const id = req.params.id;
        const book = await Book.findByIdAndDelete(id);
        res.send(book);
    }catch(err){
        res.send(err);
    }
}


module.exports = {
    addBook,
    getBook,
    editBook,
    deleteBook
}