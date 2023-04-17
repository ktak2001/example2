import { FC } from "react";
import { useIsDesktop } from "../hooks/useIsDesktop";

interface Props<T = {}> {
  desktop: FC<T>;
  mobile: FC<T>;
  props?: T;
}

export const Responsive = <T extends {}>({
  desktop,
  mobile,
  props,
}: Props<T>) => {
  const isDesktop = useIsDesktop();

  return (
    <div>
      <div className={isDesktop ? "block" : "hidden"}>
        {desktop(props as T)}
      </div>
      <div className={isDesktop ? "hidden" : "block"}>{mobile(props as T)}</div>
    </div>
  );
};
