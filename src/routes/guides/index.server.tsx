import { Suspense } from "react";
import { Breadcrumb } from "../../components/layout/Breadcrumb.client";
import { Layout } from "../../components/layout/Layout.server";
import { GuideTop } from "../../features/guides/GuideTop.client";

export default function () {
  return (
    <Layout>
      <Suspense>
        <Breadcrumb
          routes={[
            {
              title: "ご利用ガイド",
              path: "/guides",
            },
          ]}
        />
        <GuideTop />
      </Suspense>
    </Layout>
  );
}
