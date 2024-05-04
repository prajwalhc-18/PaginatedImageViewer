// components/ImageCard.tsx

import React from "react";
import "./ImageCard.css"; 

interface ImageCardProps {
  imageUrl: string;
  author: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, author }) => {
  return (
    <div className="image-card">
      <img src={imageUrl} alt={`Photo by ${author}`} />
      <div className="author">{author}</div>
    </div>
  );
};

export default ImageCard;
