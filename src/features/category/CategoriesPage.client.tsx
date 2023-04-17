import clsx from "clsx";
import { Heading } from "../../components/Heading.client";
import { Link } from "../../components/Link.client";
import { LinkButton } from "../../components/buttons/LinkButton.client";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { CategoryList } from "./CategoryList.client";

export const CategoriesPage = () => {
  const isDesktop = useIsDesktop();

  return (
    <div className={isDesktop ? "wrapper" : "px-5"}>
      <div className={clsx("mt-10", isDesktop ? "mb-8" : "mb-6")}>
        <Heading title="カテゴリー" subTitle="CATEGORY" />
      </div>
      <div>
        <CategoryList />
      </div>
      <div className={isDesktop ? "mb-24 flex justify-center" : "mb-20"}>
        <Link route="products">
          <LinkButton title="全ての商品へ" subTitle="ALL" />
        </Link>
      </div>
    </div>
  );
};
