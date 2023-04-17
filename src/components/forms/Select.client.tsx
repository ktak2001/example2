import { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { Wrapper } from "./Wrapper";

interface Props {
  title: string;
  register: UseFormRegisterReturn;
  options: { label: string; value: string }[];
  error?: string;
  className?: string;
}

export const Select: FC<Props> = ({ register, options, ...props }) => (
  <Wrapper {...props}>
    <select
      {...register}
      className="border border-solid border-gray rounded-sm px-4 py-2"
    >
      {options.map((option, i) => (
        <option value={option.value} key={i}>
          {option.label}
        </option>
      ))}
    </select>
  </Wrapper>
);
