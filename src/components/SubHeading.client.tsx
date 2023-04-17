import { FC } from "react";
import { Responsive } from "./Responsive.client";

interface Props {
  title: string;
  subTitle: string;
}

export const SubHeading: FC<Props> = (props) => (
  <Responsive
    desktop={DesktopSubHeading}
    mobile={MobileSubHeading}
    props={props}
  />
);

const DesktopSubHeading: FC<Props> = ({ title, subTitle }) => (
  <div className="flex justify-center items-end gap-3">
    <p className="text-3xl font-outfit tracking-[1.8px]">{title}</p>
    <p className="text-sm font-bold">{subTitle}</p>
  </div>
);

const MobileSubHeading: FC<Props> = ({ title, subTitle }) => (
  <div className="text-center">
    <p className="text-2xl font-outfit tracking-[1.8px]">{title}</p>
    <p className="text-sm font-bold">{subTitle}</p>
  </div>
);
