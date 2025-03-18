const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const BookModel = require("./user");

// Load Environment Variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Test API
app.get("/", (req, res) => {
  res.send({ message: "Welcome to the Book Store API 📚" });
});

// ✅ Fetch All Books
app.get("/show", async (req, res) => {
  try {
    const books = await BookModel.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Add a New Book
app.post("/addBook", async (req, res) => {
  try {
    const { title, author, price, cover } = req.body;
    const newBook = new BookModel({ title, author, price, cover });
    await newBook.save();
    res.json({ message: "✅ Book added successfully!" });
  } catch (error) {
    console.error("❌ Error adding book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
