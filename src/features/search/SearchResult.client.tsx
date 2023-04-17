import clsx from "clsx";
import { FC } from "react";
import { useNavigate } from "@shopify/hydrogen";
import { Heading } from "../../components/Heading.client";
import { ProductCardFragmentDoc } from "../../gql/graphql";
import { DocumentType } from "../../gql/index";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { SearchForm } from "./SearchForm.client";
import { Filters } from "../../components/Filters.client";
import { Pagination } from "../../components/Pagination.client";
import { ProductList } from "../product/ProductList.client";
import { pageTransition } from "../../utils/pageTransition";

interface Props {
  searchTerm: string | null;
  products: DocumentType<typeof ProductCardFragmentDoc>[];
  page: number;
  maxPage: number;
  sort?: string;
}

export const SearchResult: FC<Props> = ({
  searchTerm,
  sort,
  products,
  page,
  maxPage,
}) => {
  const isDesktop = useIsDesktop();
  const navigate = useNavigate();

  const onClick = pageTransition(navigate, "/search", {
    q: searchTerm,
    sort,
    page,
  });

  return (
    <div className="flex flex-col">
      <div className="mt-10 mb-6">
        <Heading title="検索結果" subTitle="SEARCH RESULTS" />
      </div>
      <div className={clsx("mb-10", isDesktop ? "" : "px-5")}>
        <SearchForm defaultValue={searchTerm} />
      </div>
      <div className={isDesktop ? "mb-12" : "mb-7"}>
        <Filters sort={sort} onClick={onClick} />
      </div>
      <div className="mb-24">
        {products.length > 0 ? (
          <>
            <div className="mb-12">
              <ProductList products={products} />
            </div>
            <div>
              <Pagination
                page={page}
                maxPage={maxPage}
                onClick={(page) => onClick({ page })}
              />
            </div>
          </>
        ) : (
          <div>
            <p className="text-center text-xl">商品は見つかりませんでした</p>
          </div>
        )}
      </div>
    </div>
  );
};
