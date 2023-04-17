import { Suspense } from "react";
import { useShopQuery, useRouteParams, useUrl } from "@shopify/hydrogen";
import { Layout } from "../../components/layout/Layout.server";
import { gql } from "../../gql/index";
import { Breadcrumb } from "../../components/layout/Breadcrumb.client";
import { CollectionDetail } from "../../features/collection/CollectionDetail.client";
import { useFilter } from "../../hooks/useFilter";
import { getSortVariables } from "../../constants/Sort";
import { ProductCollectionSortKeys } from "../../gql/graphql";
import { usePagination } from "../../hooks/usePagination";
import { PageTitle } from "../../components/PageTitle.client";
import { ProductFilter } from "@shopify/hydrogen/storefront-api-types";

const CategoryQuery = gql(`
  query Category(
    $handle: String!
    $rankingHandle: String!
    $sortKey: ProductCollectionSortKeys!
    $reverse: Boolean
    $filters: [ProductFilter!]
  ) {
    category: collection(handle: $handle) {
      ...CollectionDetail
    }
    ranking: collection(handle: $rankingHandle) {
      ...Ranking
    }
  }
`);

export default function () {
  const { handle } = useRouteParams();
  const { sort, minPrice, maxPrice } = useFilter();
  const filters: ProductFilter[] = [
    {
      price: {
        min: minPrice,
        max: maxPrice,
      },
    },
  ];

  const {
    data: { category, ranking },
  } = useShopQuery({
    query: CategoryQuery,
    variables: {
      handle,
      rankingHandle: "サンプルコレクション",
      ...getSortVariables<ProductCollectionSortKeys>(sort),
    },
  });

  const { searchParams } = useUrl();
  const categories = searchParams.get("categories")?.split("-");
  const filteredItems = category!.products.nodes.filter(
    (product) =>
      !categories ||
      product.collections.nodes.some((node) => categories.includes(node.title))
  );

  const { items, page, maxPage } = usePagination(filteredItems);

  return (
    <Layout>
      <Suspense>
        <PageTitle title="カテゴリー詳細" subTitle="CATEGORY DETAIL" />
        <Breadcrumb
          routes={[
            {
              title: "カテゴリー一覧",
              path: "/categories",
            },
            {
              title: category!.title,
              path: `/categories/${handle}`,
            },
          ]}
        />
        <CollectionDetail
          path={`/categories/${handle}`}
          collection={category!}
          products={items}
          ranking={ranking!}
          page={page}
          maxPage={maxPage}
          sort={sort ?? undefined}
        />
      </Suspense>
    </Layout>
  );
}
