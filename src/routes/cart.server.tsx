import { Suspense } from "react";
import { CartDetails } from "../features/cart/CartDetails.client";
import { Layout } from "../components/layout/Layout.server";

export default function () {
  return (
    <Layout>
      <Suspense>
        <CartDetails />
      </Suspense>
    </Layout>
  );
}
