import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

export const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  const query = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    setIsDesktop(query);
  }, [query]);

  return isDesktop;
};
