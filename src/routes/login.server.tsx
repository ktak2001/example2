import { Layout } from "../components/layout/Layout.server";
import { Breadcrumb } from "../components/layout/Breadcrumb.client";
import { Login } from "../features/account/Login.client";
import { login } from "../apis/account/login";

export default function () {
  return (
    <Layout>
      <Breadcrumb
        routes={[
          {
            title: "ログイン",
            path: "/login",
          },
        ]}
      />
      <Login />
    </Layout>
  );
}

export const api = login;
