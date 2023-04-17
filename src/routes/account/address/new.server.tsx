import { HydrogenRouteProps, useSession } from "@shopify/hydrogen";
import { Layout } from "../../../components/layout/Layout.server";
import { createAddress } from "../../../apis/address/create";
import { Suspense } from "react";
import { Breadcrumb } from "../../../components/layout/Breadcrumb.client";
import { NewAddress } from "../../../features/address/NewAddress.client";

export default function ({ response }: HydrogenRouteProps) {
  const { customerAccessToken } = useSession();
  if (!customerAccessToken) return response.redirect("/login");

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
              title: "新規登録",
              path: "/account/address/new",
            },
          ]}
        />
        <NewAddress />
      </Suspense>
    </Layout>
  );
}

export const api = createAddress;
