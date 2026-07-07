import React from "react";
import type { ModalProps } from "../../types/components";

const Modal = ({ openModal, children, closeModal }: ModalProps) => {
  return (
    openModal && (
      <div className="modalBackground" onClick={closeModal}>
        <div className="modalContainer">{children}</div>
      </div>
    )
  );
};

export default Modal;
