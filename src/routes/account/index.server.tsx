import { Suspense } from "react";
import {
  useSession,
  useShopQuery,
  HydrogenRouteProps,
} from "@shopify/hydrogen";
import { gql } from "../../gql/index";
import { Layout } from "../../components/layout/Layout.server";
import { AccountTop } from "../../features/account/AccountTop.client";
import { Breadcrumb } from "../../components/layout/Breadcrumb.client";

export const AccountQuery = gql(`
  query Account($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      ...AccountDetail
    }
  }
`);

export default function ({ response }: HydrogenRouteProps) {
  const { customerAccessToken } = useSession();
  if (!customerAccessToken) return response.redirect("/login");

  const {
    data: { customer },
  } = useShopQuery({
    query: AccountQuery,
    variables: {
      customerAccessToken,
    },
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
          ]}
        />
        <AccountTop customer={customer!} />
      </Suspense>
    </Layout>
  );
}
