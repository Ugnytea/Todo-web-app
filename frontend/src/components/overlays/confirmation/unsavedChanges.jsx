import { useCallback } from "react";

export const unsavedChanges = (isDirty, onConfirm) => {
  const verifyAndClose = useCallback(() => {
    if (isDirty) {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Are you sure you want to discard them?",
      );
      if (confirmLeave) {
        onConfirm();
      }
    } else {
      onConfirm();
    }
  }, [isDirty, onConfirm]);

  return verifyAndClose;
};
