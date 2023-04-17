import { useRouteParams } from "@shopify/hydrogen";
import { Layout } from "../../../../components/layout/Layout.server";
import { PasswordReset } from "../../../../features/account/PasswordReset.client";

export default function () {
  const { id, resetToken } = useRouteParams();

  return (
    <Layout>
      <h1>Password Reset</h1>
      <PasswordReset id={id} resetToken={resetToken} />
    </Layout>
  );
}
