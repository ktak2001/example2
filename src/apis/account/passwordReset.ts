import { resolver } from "../resolver";
import { Errors } from "../Errors";
import { gql } from "../../gql/index";

const PasswordResetMutation = gql(`
  mutation PasswordReset($id: ID!, $input: CustomerResetInput!) {
    customerReset(id: $id, input: $input) {
      customerAccessToken {
        accessToken
      }
      customerUserErrors {
        message
      }
    }
  }
`);

interface FormData {
  id: string;
  password: string;
  resetToken: string;
}

export const passwordReset = resolver<{}, FormData>(
  { method: "POST" },
  async ({ formData, session, queryShop }) => {
    const { id, password, resetToken } = formData;

    const { data } = await queryShop({
      query: PasswordResetMutation,
      variables: {
        id: `gid://shopify/Customer/${id}`,
        input: { id, resetToken, password },
      },
    });

    if (data?.customerReset?.customerAccessToken?.accessToken) {
      const accessToken = data.customerReset.customerAccessToken.accessToken;
      await session.setAccessToken(accessToken);
      return new Request("/account");
    } else {
      await session.setError(Errors.Failed);
      return new Request("/");
    }
  }
);
