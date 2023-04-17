import { FC } from "react";
import { gql, DocumentType } from "../../gql/index";
import { ProductCardFragmentDoc, RankingFragmentDoc } from "../../gql/graphql";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { Filters } from "../../components/Filters.client";
import { ProductList } from "../product/ProductList.client";
import { Pagination } from "../../components/Pagination.client";
import { Ranking } from "../home/Ranking.client";
import { Image, useNavigate } from "@shopify/hydrogen";
import clsx from "clsx";
import { pageTransition } from "../../utils/pageTransition";

const CollectionDetailFragment = gql(`
  fragment CollectionDetail on Collection {
    id
    title
    handle
    description
    image {
      url
      altText
    }
    products(
      first: 250
      sortKey: $sortKey
      reverse: $reverse
      filters: $filters
    ) {
      nodes {
        ...ProductCard
      }
    }
  }
`);

interface Props {
  path: string;
  title?: string;
  subTitle?: string;
  isRanking?: boolean;
  collection: Omit<DocumentType<typeof CollectionDetailFragment>, "products">;
  products: DocumentType<typeof ProductCardFragmentDoc>[];
  ranking?: DocumentType<typeof RankingFragmentDoc>;
  page: number;
  maxPage: number;
  sort?: string;
}

export const CollectionDetail: FC<Props> = ({
  path,
  title,
  subTitle,
  isRanking,
  collection,
  products,
  ranking,
  page,
  maxPage,
  sort,
}) => {
  const isDesktop = useIsDesktop();
  const navigate = useNavigate();

  const onClick = pageTransition(navigate, path, {
    sort,
    page,
  });

  return (
    <div className="flex flex-col">
      <div
        className={clsx(
          "mt-10 mb-16",
          isDesktop ? "wrapper grid grid-cols-2 gap-10 items-center" : "px-5"
        )}
      >
        <div
          className={clsx(
            "overflow-y-hidden flex items-center",
            isDesktop ? "h-64" : "h-40 mb-8"
          )}
        >
          {collection.image && (
            <Image
              src={collection.image.url}
              alt={collection.image.altText ?? "カテゴリーイメージ"}
              width={"100%"}
              height={260}
            />
          )}
        </div>
        <div className="flex flex-col gap-5">
          <div
            className={clsx("flex", isDesktop ? "gap-4 items-end" : "flex-col")}
          >
            <p className={clsx("text-3xl", !!title ? "font-outfit" : "")}>
              {title ?? collection.title}
            </p>
            {subTitle && <p className="text-sm font-bold">{subTitle}</p>}
          </div>
          <p className="text-sm">{collection.description}</p>
        </div>
      </div>
      <div className={isDesktop ? "mb-12" : "mb-7"}>
        <Filters sort={sort} onClick={onClick} />
      </div>
      <div className={isDesktop ? "mb-24" : "mb-20"}>
        <div className="mb-12">
          <ProductList products={products} isRanking={isRanking} />
        </div>
        <div>
          <Pagination
            page={page}
            maxPage={maxPage}
            onClick={(page) => onClick({ page })}
          />
        </div>
      </div>
      {ranking && (
        <div>
          <Ranking ranking={ranking} />
        </div>
      )}
    </div>
  );
};
