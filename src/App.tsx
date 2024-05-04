import React, { useState, useEffect } from "react";
import ImageCard from "./components/ImageCard";
import "./App.css";

const App: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://picsum.photos/v2/list?page=${currentPage}&limit=10`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const data = await response.json();
        setImages((prevImages) => [...prevImages, ...data]);
        const totalPages = Number(response.headers.get("X-Total-Pages"));
        setTotalPages(totalPages || 1);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="app container">
      <header className="header">
        <div className="logo">
          <img
            src="src\assets\gallery-svgrepo-com (2).svg"
            alt="Logo"
            className="img-fluid"
          />
        </div>
        <div className="title">
          <h1>Paginated Image Viewer</h1>
        </div>
      </header>
      <div className="image-gallery grid">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`image-card ${index < 5 ? "grid-item" : ""}`}
          >
            <ImageCard imageUrl={image.download_url} author={image.author} />
          </div>
        ))}
      </div>
      {currentPage < totalPages && (
        <div className="load-more">
          <button onClick={handleLoadMore}>Load More</button>
        </div>
      )}
    </div>
  );
};

export default App;
