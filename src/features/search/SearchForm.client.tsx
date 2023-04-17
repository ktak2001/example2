import { FC, useEffect, useState } from "react";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { Link } from "../../components/Link.client";

interface Props {
  defaultValue?: string | null;
  onClick?: () => void;
}

export const SearchForm: FC<Props> = ({ defaultValue, onClick }) => {
  const isDesktop = useIsDesktop();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    setKeyword(defaultValue ?? "");
  }, [defaultValue]);

  return (
    <div className={isDesktop ? "wrapper grid grid-cols-6 gap-5" : ""}>
      {isDesktop && <div className="col-span-1"></div>}
      <div className={isDesktop ? "col-span-3" : "mb-4"}>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border border-solid border-gray rounded-sm px-4 py-2 w-full"
        />
      </div>
      <div className={isDesktop ? "col-span-1" : ""}>
        <Link route="search" query={keyword} onClick={onClick}>
          <div className="py-3 bg-dark flex justify-center">
            <p className="text-white leading-[20px]">検索</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
