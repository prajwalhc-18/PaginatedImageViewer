// App.tsx

import React, { useState, useEffect } from 'react';
import ImageCard from './components/ImageCard';
import './App.css'; // Import CSS file for styling

const App: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=10`);
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        setImages((prevImages) => [...prevImages, ...data]); // Append new images to the existing ones
        // Assuming the API returns total number of pages in the response headers
        const totalPages = Number(response.headers.get('X-Total-Pages'));
        setTotalPages(totalPages || 1);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="app">
      <header>
        <img src="logo.png" alt="Logo" />
        <h1>Paginated Image Viewer</h1>
      </header>
      <div className="image-gallery">
        {images.map((image) => (
          <ImageCard key={image.id} imageUrl={image.download_url} author={image.author} />
        ))}
      </div>
      {currentPage < totalPages && ( // Render "Load More" button if there are more pages
        <div className="load-more">
          <button onClick={handleLoadMore}>Load More</button>
        </div>
      )}
    </div>
  );
};

export default App;
