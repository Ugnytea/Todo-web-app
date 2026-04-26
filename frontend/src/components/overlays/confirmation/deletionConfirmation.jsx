import { useCallback } from "react";

export const deletionConfirmation = (onConfirm) => {
  const verifyAndClose = useCallback(() => {
    const confirmLeave = window.confirm(
      "Are you sure you want to delete this?",
    );
    if (confirmLeave) {
      onConfirm();
    }
  }, [onConfirm]);

  return verifyAndClose;
};
