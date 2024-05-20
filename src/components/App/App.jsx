import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageModal from '../ImageModal/ImageModal';
import { getImages } from '../../images-api';

export default function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [modalUrl, setModalUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchImages = async (searchQuery) => {
    try {
      setLoading(true);
      const newImages = await getImages(searchQuery, 1);
      setImages(newImages);
      setQuery(searchQuery);
      setCurrentPage(1); 
    } catch (error) {
      setError(error);
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
      setError(error);
      toast.error('Failed to fetch more images');
    }
    finally {
      setLoading(false);
    }
  };

  const openModal = (imageUrl) => {
    setModalUrl(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalUrl(null);
  };
  
  return (
    <div>
      <SearchBar onSubmit={fetchImages} />
      {!error ? (
        <>
          <ImageGallery images={images} openModal={openModal}/>
          {loading && <Loader />}
          {images.length > 0 && currentPage < images.length && (
            <LoadMoreBtn loadMoreImages={loadMoreImages} />
          )}
          <ImageModal isOpen={isModalOpen} imageUrl={modalUrl} onClose={closeModal} />
        </>
      ) : (
        <>
          <ErrorMessage error={error} />
        </>
      )}
      <Toaster position="top-right" />
    </div>

  );
}