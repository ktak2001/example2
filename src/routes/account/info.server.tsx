import { Suspense } from "react";
import { useSession, HydrogenRouteProps } from "@shopify/hydrogen";
import { Layout } from "../../components/layout/Layout.server";
import { Breadcrumb } from "../../components/layout/Breadcrumb.client";
import { AccountInfo } from "../../features/account/AccountInfo.client";
import { updateUser } from "../../apis/account/updateUser";

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
              title: "ログイン情報",
              path: "/accoutn/info",
            },
          ]}
        />
        <AccountInfo />
      </Suspense>
    </Layout>
  );
}

export const api = updateUser;
