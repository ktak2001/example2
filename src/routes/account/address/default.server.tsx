import {
  CacheLong,
  HydrogenRouteProps,
  useSession,
  useShopQuery,
} from "@shopify/hydrogen";
import { gql } from "../../../gql/index";
import { Layout } from "../../../components/layout/Layout.server";
import { Suspense } from "react";
import { Breadcrumb } from "../../../components/layout/Breadcrumb.client";
import { DefaultAddress } from "../../../features/address/DefaultAddress.client";

const DefaultAddressQuery = gql(`
  query DefaultAddress($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      defaultAddress {
        ...DefaultAddress
      }
    }
  }
`);

export default function ({ response }: HydrogenRouteProps) {
  const { customerAccessToken } = useSession();
  if (!customerAccessToken) return response.redirect("/login");

  const { data } = useShopQuery({
    query: DefaultAddressQuery,
    variables: {
      customerAccessToken,
    },
    cache: CacheLong(),
  });

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
              title: "アドレス帳",
              path: "/account/address",
            },
            {
              title: "登録住所編集",
              path: "/account/address/default",
            },
          ]}
        />
        <DefaultAddress address={data.customer!.defaultAddress!} />
      </Suspense>
    </Layout>
  );
}
