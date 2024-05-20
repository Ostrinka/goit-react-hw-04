import Modal from "react-modal";
import css from './ImageModal.module.css'; 

export default function ImageModal({ isOpen, imageUrl, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className={css.modal}
      overlayClassName={css.overlay}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <img src={imageUrl} alt="Large" className={css.img} />
    </Modal>
  );
}

