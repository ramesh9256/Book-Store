import { useEffect, useState } from "react";
import "./App.css";
import BooksCard from "./components/booksCard";


function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/show");
      const books = await response.json();
      setData(books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <>
      <BooksCard data={data} fetchData={fetchData} />
    </>
  );
}

export default App;
