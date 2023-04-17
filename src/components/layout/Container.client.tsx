import { FC, ReactNode } from "react";
import clsx from "clsx";
import { useIsDesktop } from "../../hooks/useIsDesktop";

interface Props {
  children: ReactNode;
}

export const Container: FC<Props> = ({ children }) => {
  const isDesktop = useIsDesktop();

  return (
    <div
      className={clsx(
        "flex flex-col min-h-screen antialiased",
        isDesktop ? "min-w-[1280px]" : "w-full"
      )}
    >
      {children}
    </div>
  );
};
