import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import Loader from '../Loader/Loader';
import { getImages } from '../../images-api';

export default function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState();

  const fetchImages = async (searchQuery) => {
    try {
      setLoading(true);
      const newImages = await getImages(searchQuery, 1);
      setImages(newImages);
      setQuery(searchQuery);
      setCurrentPage(1); 
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch images');
    }
      finally {
        setLoading(false);
    }
  };

  const loadMoreImages = async () => {
    try {
      setLoading(true);
      const newImages = await getImages(query, currentPage + 1);
      setImages((prevImages) => [...prevImages, ...newImages]);
      setCurrentPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch more images');
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar onSubmit={fetchImages} />
      {images.length > 0 && (
        <>
          <ImageGallery images={images} />
          {loading && <Loader />}
          <LoadMoreBtn loadMoreImages={loadMoreImages} />
        </>
      )}
      <Toaster position="top-right" />
    </div>
  );
}