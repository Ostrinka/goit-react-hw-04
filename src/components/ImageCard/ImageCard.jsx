import css from "./ImageCard.module.css";

export default function ImageCard({ image, openModal }) {
  const { urls, alt_description } = image;
  return (
    <div className={css.wrapper}>
      <img onClick={() => openModal(urls.regular)} src={urls.small} alt={alt_description} />
    </div>
  );
}
