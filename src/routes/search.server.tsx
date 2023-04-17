import { useShopQuery, useUrl } from "@shopify/hydrogen";
import { Suspense } from "react";
import { Breadcrumb } from "../components/layout/Breadcrumb.client";
import { Layout } from "../components/layout/Layout.server";
import { getSortVariables } from "../constants/Sort";
import { SearchResult } from "../features/search/SearchResult.client";
import { usePagination } from "../hooks/usePagination";
import { gql } from "../gql/index";
import { useFilter } from "../hooks/useFilter";
import { ProductSortKeys } from "../gql/graphql";

const SearchQuery = gql(`
  query Search(
    $searchTerm: String
    $sortKey: ProductSortKeys!
    $reverse: Boolean
  ) {
    products(
      first: 250
      sortKey: $sortKey
      query: $searchTerm
      reverse: $reverse
    ) {
      nodes {
        ...ProductCard
      }
    }
  }
`);

export default function () {
  const { searchParams } = useUrl();
  const searchTerm = searchParams.get("q");
  const { sort, minPrice, maxPrice } = useFilter();

  const {
    data: { products },
  } = useShopQuery({
    query: SearchQuery,
    variables: {
      searchTerm,
      ...getSortVariables<ProductSortKeys>(sort),
    },
    preload: true,
  });

  const categories = searchParams.get("categories")?.split("-");
  const filteredItems = products!.nodes.filter(
    (product) =>
      !categories ||
      product.collections.nodes.some((node) => categories.includes(node.title))
  );

  const { items, page, maxPage } = usePagination(filteredItems);

  return (
    <Layout>
      <Suspense>
        <Breadcrumb
          routes={[
            {
              title: "検索",
              path: "/search",
            },
          ]}
        />
        <SearchResult
          searchTerm={searchTerm}
          sort={sort ?? undefined}
          products={items}
          page={page}
          maxPage={maxPage}
        />
      </Suspense>
    </Layout>
  );
}
