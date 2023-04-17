import { Suspense } from "react";
import { useShopQuery, CacheLong } from "@shopify/hydrogen";
import { Layout } from "../components/layout/Layout.server";
import { gql } from "../gql/index";
import { Home } from "../features/home/Home.client";

const HomeQuery = gql(`
  query Home($handle: String!) {
    recommend: collection(handle: $handle) {
      ...Recommend
    }
    ranking: collection(handle: $handle) {
      ...Ranking
    }
    newItems: products(first: 4, sortKey: CREATED_AT, reverse: true) {
      ...NewItems
    }
    news: articles(first: 3) {
      ...News
    }
  }
`);

export default function () {
  const {
    data: { recommend, ranking, newItems, news },
  } = useShopQuery({
    query: HomeQuery,
    variables: {
      handle: "サンプルコレクション",
    },
    cache: CacheLong(),
  });

  return (
    <Layout>
      <Suspense>
        <Home
          recommend={recommend!}
          ranking={ranking!}
          newItems={newItems}
          news={news}
        />
      </Suspense>
    </Layout>
  );
}
