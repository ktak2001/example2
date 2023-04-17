import clsx from "clsx";
import { FC } from "react";
import { ReactComponent as CursorLeft } from "../assets/icon/cursor_left.svg";
import { ReactComponent as CursorRight } from "../assets/icon/cursor_right.svg";

interface Props {
  page: number;
  maxPage: number;
  onClick: (page: number) => void;
}

export const Pagination: FC<Props> = ({ page, maxPage, onClick }) => (
  <div className="flex justify-center">
    {page !== 1 && (
      <p
        onClick={() => onClick(page - 1)}
        className="w-12 pb-3 border-b border-solid border-lightGray"
      >
        <div className="flex justify-center items-center h-full">
          <CursorLeft height={12} width={12} />
        </div>
      </p>
    )}
    {[...Array(maxPage)].map((_, i) => (
      <p
        onClick={() => onClick(i + 1)}
        key={i}
        className={clsx(
          "w-12 border-solid",
          i === page - 1
            ? "border-b-4 border-black box-border"
            : "border-b border-lightGray text-gray box-content"
        )}
      >
        <div className="flex justify-center pb-3">
          <p className={clsx("font-outfit", i === page - 1 ? "" : "text-gray")}>
            {i + 1}
          </p>
        </div>
      </p>
    ))}
    {page !== maxPage && (
      <p
        onClick={() => onClick(page + 1)}
        className="w-12 pb-3 border-b border-solid border-lightGray"
      >
        <div className="flex justify-center items-center h-full">
          <CursorRight height={12} width={12} />
        </div>
      </p>
    )}
  </div>
);
