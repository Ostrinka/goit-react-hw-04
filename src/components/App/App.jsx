import { useState } from 'react';
import { toast } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import { getImages } from '../../images-api';

export default function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');

  const fetchImages = async (searchQuery) => {
    try {
      const newImages = await getImages(searchQuery, 1);
      setImages(newImages);
      setQuery(searchQuery);
      setCurrentPage(1); 
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch images');
    }
  };

  const loadMoreImages = async () => {
    try {
      const newImages = await getImages(query, currentPage + 1);
      setImages((prevImages) => [...prevImages, ...newImages]);
      setCurrentPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch more images');
    }
  };

  return (
    <div>
      <SearchBar onSubmit={fetchImages} />
      {images.length > 0 && (
        <>
          <ImageGallery images={images} />
          <button onClick={loadMoreImages}>Load More</button>
        </>
      )}
    </div>
  );
}