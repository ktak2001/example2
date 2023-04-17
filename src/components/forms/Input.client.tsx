import { FC, HTMLInputTypeAttribute } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";
import { Wrapper } from "./Wrapper";

interface Props {
  title: string;
  type: HTMLInputTypeAttribute;
  register: UseFormRegisterReturn;
  error?: string;
  className?: string;
}

export const Input: FC<Props> = ({ type, register, ...props }) => (
  <Wrapper {...props}>
    <input
      type={type}
      {...register}
      className={clsx(
        "border border-solid rounded-sm px-4 py-2",
        props.error ? "border-red border-2" : "border-gray"
      )}
    />
  </Wrapper>
);
