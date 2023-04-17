import { Link } from "../../components/Link.client";
import clsx from "clsx";
import { keywordItems } from "../../constants/Keywords";
import { useIsDesktop } from "../../hooks/useIsDesktop";

export const Keywords = () => {
  const isDesktop = useIsDesktop();

  return (
    <div
      className={clsx(
        isDesktop
          ? "wrapper flex justify-center items-center gap-8 flex-wrap"
          : ""
      )}
    >
      <div className={clsx(isDesktop ? "" : "flex items-end gap-3 mb-2 px-4")}>
        <p className="text-xs font-outfit font-bold text-red">KEYWORD</p>
        <p className="font-bold">人気キーワード</p>
      </div>
      <div
        className={clsx(
          "flex items-center gap-8",
          isDesktop ? "justify-center flex-wrap" : "overflow-x-scroll"
        )}
      >
        {keywordItems.map((item, i) => (
          <div
            key={i}
            className={clsx(
              "border border-solid border-lightGray rounded-sm",
              isDesktop ? "" : "first:ml-4 last:mr-4"
            )}
          >
            <Link route="search" query={item.title}>
              <div className="px-4 py-1 flex gap-1">
                <p className="font-outfit">#</p>
                <p className="font-bold tracking-[0.45px] whitespace-nowrap">
                  {item.title}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
