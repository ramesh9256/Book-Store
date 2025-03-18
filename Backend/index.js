const express = require("express");
// const mongoose = require("mongoose");
const cors = require("cors");
const BookModel = require("./user");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());



// Fetch all books

app.get('/' , (req,res) => {
    res.send("data");
})
app.get("/show", async (req, res) => {
  try {
    const books = await BookModel.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new book
app.post("/addBook", async (req, res) => {
  try {
    const { title, author, price, imgUrl } = req.body;
    const newBook = new BookModel({ title, author, price, cover: imgUrl });
    await newBook.save();
    res.json({ message: "Book added successfully!" });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
