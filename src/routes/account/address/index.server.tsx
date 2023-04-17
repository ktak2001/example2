import {
  CacheLong,
  HydrogenRouteProps,
  useSession,
  useShopQuery,
} from "@shopify/hydrogen";
import { Layout } from "../../../components/layout/Layout.server";
import { gql } from "../../../gql/index";
import { AddressList } from "../../../features/address/AddressList.client";
import { Breadcrumb } from "../../../components/layout/Breadcrumb.client";

const AddressesQuery = gql(`
  query Addresses($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      defaultAddress {
        ...DefaultAddressDetail
      }
      addresses(first: 6) {
        ...AddressListConnection
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
    query: AddressesQuery,
    variables: {
      customerAccessToken,
    },
    cache: CacheLong(),
  });

  if (!customer) return response.redirect("/login");

  return (
    <Layout>
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
        ]}
      />
      {customer?.defaultAddress && (
        <AddressList
          addresses={customer.addresses}
          defaultAddress={customer.defaultAddress}
        />
      )}
    </Layout>
  );
}
