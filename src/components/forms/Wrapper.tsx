import { FC, ReactNode } from "react";

interface Props {
  title: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

export const Wrapper: FC<Props> = ({ title, error, className, children }) => (
  <div className={["flex flex-col", className].join(" ")}>
    <label className="text-gray mb-2">{title}</label>
    {children}
    {error && <p className="text-red">{error}</p>}
  </div>
);
