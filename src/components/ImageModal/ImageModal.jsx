import { useEffect } from "react";
import Modal from "react-modal";

export default function ImageModal({ imageUrl, isOpen, onClose }) {
  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  if (!imageUrl) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
        content: {
          width: '80%',
          height: '80%',
          margin: 'auto',
          padding: '0',
        },
      }}
    >
      <img
        src={imageUrl}
        alt="Large"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Modal>
  );
}