import {
  CacheLong,
  HydrogenRouteProps,
  useRouteParams,
  useShopQuery,
  useSession,
} from "@shopify/hydrogen";
import { gql } from "../../../../gql/index";
import { Layout } from "../../../../components/layout/Layout.server";
import { updateAddress } from "../../../../apis/address/update";
import { Suspense } from "react";
import { Breadcrumb } from "../../../../components/layout/Breadcrumb.client";
import { EditAddress } from "../../../../features/address/EditAddress.client";

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

  const { addressId } = useRouteParams();
  if (!addressId) response.redirect("/account/address");

  const { data } = useShopQuery({
    query: AddressesQuery,
    variables: {
      customerAccessToken,
    },
    cache: CacheLong(),
  });

  const address = data.customer?.addresses.nodes.find(
    (address) => address.id.split("/").pop()!.split("?")[0] === addressId
  );
  if (!address) response.redirect("/account/address");

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
              path: `/account/address/${addressId}/edit`,
            },
          ]}
        />
        <EditAddress address={address!} />
      </Suspense>
    </Layout>
  );
}

export const api = updateAddress;
