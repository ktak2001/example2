import { Layout } from "../../../components/layout/Layout.server";
import { Breadcrumb } from "../../../components/layout/Breadcrumb.client";
import { Recover } from "../../../features/account/Recover.client";
import { recover } from "../../../apis/account/recover";

export default function () {
  return (
    <Layout>
      <Breadcrumb
        routes={[{ title: "パスワードリセット", path: "/account/recover" }]}
      />
      <Recover />
    </Layout>
  );
}

export const api = recover;
