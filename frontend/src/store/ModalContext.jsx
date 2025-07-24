import { useState, createContext, useContext } from "react";
import TaskForm from "../components/TaskForm";
import EditForm from "../components/EditForm";
import Modal from "../components/Modal";
import DeleteTask from "../components/DeleteTask";

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
          <TaskForm onClose={closeModal} />
        </Modal>
      )}
      {modal?.name === "edit-form" && (
        <Modal open={true} onClose={closeModal}>
          <EditForm id={modal.payload} onClose={closeModal} />
        </Modal>
      )}
      {modal?.name === "delete-task" && (
        <Modal open={true} onClose={closeModal}>
          <DeleteTask id={modal.payload} onClose={closeModal} />
        </Modal>
      )}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
