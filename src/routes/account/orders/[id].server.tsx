import { Suspense } from "react";
import {
  useShopQuery,
  useRouteParams,
  useSession,
  HydrogenRouteProps,
  CacheNone,
} from "@shopify/hydrogen";
import { Layout } from "../../../components/layout/Layout.server";
import { OrderDetail } from "../../../features/order/OrderDetail.client";
import { gql } from "../../../gql/index";
import { Breadcrumb } from "../../../components/layout/Breadcrumb.client";

const OrderDetailQuery = gql(`
  query OrderDetail(
    $customerAccessToken: String!
    $orderId: String!
  ) {
    customer(customerAccessToken: $customerAccessToken) {
      defaultAddress {
        ...AddressFull
      }
      orders(first: 1, query: $orderId) {
        edges {
          node {
            ...OrderDetail
          }
        }
      }
    }
  }
`);

export default function ({ response }: HydrogenRouteProps) {
  const { customerAccessToken } = useSession();
  if (!customerAccessToken) return response.redirect("/login");

  const { id } = useRouteParams();
  if (!id) response.redirect("/account/orders");

  const {
    data: { customer },
  } = useShopQuery({
    query: OrderDetailQuery,
    variables: {
      customerAccessToken,
      orderId: `id:${id}`,
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
        <OrderDetail
          order={customer!.orders.edges[0].node}
          customerAddress={customer!.defaultAddress!}
        />
      </Suspense>
    </Layout>
  );
}
