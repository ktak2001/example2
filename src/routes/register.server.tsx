import { Layout } from "../components/layout/Layout.server";
import { Breadcrumb } from "../components/layout/Breadcrumb.client";
import { Register } from "../features/account/Register.client";
import { register } from "../apis/account/register";

export default function () {
  return (
    <Layout>
      <Breadcrumb
        routes={[
          {
            title: "会員登録",
            path: "/register",
          },
        ]}
      />
      <Register />
    </Layout>
  );
}

export const api = register;
