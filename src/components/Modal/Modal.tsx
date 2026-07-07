import React from "react";

type ModalProps = {
  openModal: boolean;
  children?: React.ReactNode;
  closeModal?: () => void;
};

const Modal: React.FC<ModalProps> = ({ openModal, children, closeModal }) => {
  if (!openModal) return null;
  return (
    <div className="modalBackground" onClick={closeModal}>
      <div className="modalContainer">{children}</div>
    </div>
  );
};

export default Modal;
