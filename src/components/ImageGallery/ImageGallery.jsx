import ImageCard from '../ImageCard/ImageCard';
import css from "./ImageGallery.module.css";

export default function ImageGallery({ images, openModal }) {
  return (
    <ul className={css.menu}>
      {images.map((image) => (
        <li className={css.list} key={image.id}>
          <ImageCard image={image} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
}
