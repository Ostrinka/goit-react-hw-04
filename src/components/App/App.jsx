import { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalUrl, setModalUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      if (!query) return;

      try {
        setLoading(true);
        const response = await getImages(query, currentPage);
        if (currentPage === 1) {
          setImages(response);
        } else {
          setImages((prevImages) => [...prevImages, ...response]);
        }
      } catch (error) {
        setError(error);
        toast.error('Failed to fetch images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, currentPage]);

  const onSubmit = (searchQuery) => {
    setCurrentPage(1);
    setImages([]);
    setQuery(searchQuery);
  };

  const onLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
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
      <SearchBar onSubmit={onSubmit} />
      {!error ? (
        <>
          <ImageGallery images={images} openModal={openModal}/>
          {loading && <Loader />}
          
          {images.length > 0 && currentPage < images.length && (
            <LoadMoreBtn loadMoreImages={onLoadMore} />
          )}
          <ImageModal isOpen={isModalOpen} imageUrl={modalUrl} onClose={closeModal} />
        </>
      ) : (
        <ErrorMessage error={error} />
      )}
      <Toaster position="top-right" />
    </div>
    
  );
}