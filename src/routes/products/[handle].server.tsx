import { useShopQuery, useRouteParams } from "@shopify/hydrogen";
import { Layout } from "../../components/layout/Layout.server";
import { Breadcrumb } from "../../components/layout/Breadcrumb.client";
import { ProductDetail } from "../../features/product/ProductDetail.client";
import { gql } from "../../gql/index";

const ProductQuery = gql(`
  query Product($handle: String!) {
    product(handle: $handle) {
      ...ProductDetail
    }
  }
`);

export default function () {
  const { handle } = useRouteParams();

  const {
    data: { product },
  } = useShopQuery({
    query: ProductQuery,
    variables: {
      handle,
    },
  });

  return (
    <Layout>
      <Breadcrumb
        routes={[
          {
            title: product?.title ?? "",
            path: `/products/${handle}`,
          },
        ]}
      />
      <ProductDetail product={product!} />
    </Layout>
  );
}
