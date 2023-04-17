import { useRouteParams } from "@shopify/hydrogen";
import { Layout } from "../../../../components/layout/Layout.server";
import { Activate } from "../../../../features/account/Activate.client";

export default function () {
  const { id, activationToken } = useRouteParams();

  return (
    <Layout>
      <h1>Activate</h1>
      <Activate id={id} activationToken={activationToken} />
    </Layout>
  );
}
