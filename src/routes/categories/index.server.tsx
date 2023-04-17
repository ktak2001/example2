import { Suspense } from "react";
import { Breadcrumb } from "../../components/layout/Breadcrumb.client";
import { Layout } from "../../components/layout/Layout.server";
import { CategoriesPage } from "../../features/category/CategoriesPage.client";

export default function () {
  return (
    <Layout>
      <Suspense>
        <Breadcrumb
          routes={[
            {
              title: "カテゴリー一覧",
              path: "/categories",
            },
          ]}
        />
        <CategoriesPage />
      </Suspense>
    </Layout>
  );
}
