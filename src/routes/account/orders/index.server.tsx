import { Suspense } from "react";
import {
  useSession,
  useShopQuery,
  CacheNone,
  type HydrogenRouteProps,
} from "@shopify/hydrogen";
import { Layout } from "../../../components/layout/Layout.server";
import { OrderList } from "../../../features/order/OrderList.client";
import { gql } from "../../../gql/index";
import { Breadcrumb } from "../../../components/layout/Breadcrumb.client";

const OrdersQuery = gql(`
  query Orders($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      orders(first: 250, sortKey: PROCESSED_AT, reverse: true) {
        ...OrderListConnection
      }
    }
  }
`);

export default function ({ response }: HydrogenRouteProps) {
  const { customerAccessToken } = useSession();
  if (!customerAccessToken) return response.redirect("/login");

  const {
    data: { customer },
  } = useShopQuery({
    query: OrdersQuery,
    variables: {
      customerAccessToken,
    },
    cache: CacheNone(),
  });

  if (!customer) return response.redirect("/login");

  return (
    <Layout>
      <Suspense>
        <Breadcrumb
          routes={[
            {
              title: "マイページ",
              path: "/account",
            },
            {
              title: "ご注文履歴",
              path: "/account/orders",
            },
          ]}
        />
        <OrderList orders={customer!.orders} />
      </Suspense>
    </Layout>
  );
}
