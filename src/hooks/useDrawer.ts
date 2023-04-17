import { useState } from "react";

export const useDrawer = (openDefault = false) => {
  const [isOpen, setIsOpen] = useState(openDefault);
  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  return {
    isOpen,
    openDrawer,
    closeDrawer,
  };
};
