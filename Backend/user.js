const mongoose = require("mongoose");
require("dotenv").config();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "❌ MongoDB Connection Error!"));
db.once("open", () => console.log("✅ Connected to MongoDB!"));

// Book Schema
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  cover: { type: String },
});

// Create Model
const BookModel = mongoose.model("Book", bookSchema);
module.exports = BookModel;
