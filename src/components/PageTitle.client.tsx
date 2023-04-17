import { FC } from "react";
import { useIsDesktop } from "../hooks/useIsDesktop";
import pageTitle from "../assets/banner/page_title.png";
import clsx from "clsx";

interface Props {
  title: string;
  subTitle: string;
}

export const PageTitle: FC<Props> = ({ title, subTitle }) => {
  const isDesktop = useIsDesktop();

  return (
    <div
      className={clsx(
        "relative",
        isDesktop ? "w-[max(100%,1208px)] mx-auto" : ""
      )}
    >
      <div className="flex justify-center h-[340px]">
        <img src={pageTitle} alt="サムネイル" className="object-cover" />
      </div>
      <div
        className={clsx(
          "absolute left-0 right-0 mx-auto",
          isDesktop ? "bottom-7" : "bottom-5"
        )}
      >
        <div className="text-white text-center">
          <p className="font-outfit font-semibold text-sm tracking-[0.84px]">
            {subTitle}
          </p>
          <p className="text-3xl">{title}</p>
        </div>
      </div>
    </div>
  );
};
