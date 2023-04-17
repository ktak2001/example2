import { FC } from "react";

interface Props {
  title: string;
  subTitle: string;
}

export const Heading: FC<Props> = ({ title, subTitle }) => (
  <>
    <p className="font-outfit font-semibold text-sm text-black tracking-[0.84px] text-center">
      {subTitle}
    </p>
    <p className="text-3xl text-black text-center">{title}</p>
  </>
);
