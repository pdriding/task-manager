import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

function Modal({ open, children, className = "", onClose }) {
  const dialogRef = useRef(null);

  // Handle dialog open/close
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Call onClose when dialog is closed manually (e.g., ESC or clicking backdrop)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      onClose?.();
    };

    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className={`modal flex flex-col gap-2 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
             rounded-xl shadow-lg p-6 backdrop:bg-black/30 ${className} overflow-visible`}
    >
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;
