import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

function Modal({ open, children, className = "", onClose }) {
  const dialog = useRef();

  // open/close on `open` prop changes
  useEffect(() => {
    if (!dialog.current) return;
    if (open) {
      dialog.current.showModal();
    } else {
      // only closes the native dialog, does NOT call onClose again
      dialog.current.close();
    }
  }, [open]);

  if (!open) return null;

  return createPortal(
    <dialog className={`modal ${className}`} ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;
