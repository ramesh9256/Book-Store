import React, { useState } from "react";

const BooksCard = ({ data, fetchData }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    imgUrl: "",
    file: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, author, price, imgUrl } = formData;

    const bookData = { title, author, price, imgUrl };

    try {
      const response = await fetch("http://localhost:5000/addBook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });

      const result = await response.json();
      console.log(result);

      // Fetch updated book list after adding new book
      fetchData();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add a Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block font-medium">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block font-medium">Image URL</label>
          <input
            type="url"
            name="imgUrl"
            value={formData.imgUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block font-medium">Upload File</label>
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>

      <h2 className="text-xl font-bold mt-6">Books List</h2>
      <ul>
        {data.map((book, index) => (
          <li key={index}>
            {book.title} - {book.author} - ${book.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksCard;
