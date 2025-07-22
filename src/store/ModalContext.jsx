import { useState, createContext, useContext } from "react";
import TaskForm from "../components/TaskForm";
import Modal from "../components/Modal";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);

  const openModal = (name, payload = {}) => setModal({ name, payload });
  const closeModal = () => setModal(null);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {modal?.name === "task-form" && (
        <Modal open={true} onClose={closeModal}>
          <TaskForm items={modal.payload.items} onClose={closeModal} />
        </Modal>
      )}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
