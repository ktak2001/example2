import { resolver } from "../resolver";
import { Errors } from "../Errors";
import { gql } from "../../gql/index";

const ActivateMutation = gql(`
  mutation Activate($id: ID!, $input: CustomerActivateInput!) {
    customerActivate(id: $id, input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`);

interface FormData {
  id: string;
  password: string;
  activationToken: string;
}

export const activate = resolver<{}, FormData>(
  { method: "POST" },
  async ({ formData, session, queryShop }) => {
    const { id, password, activationToken } = formData;

    const { data } = await queryShop({
      query: ActivateMutation,
      variables: {
        id: `gid://shopify/Customer/${id}`,
        input: { id, password, activationToken },
      },
    });

    if (data?.customerActivate?.customerAccessToken?.accessToken) {
      const accessToken = data.customerActivate.customerAccessToken.accessToken;
      await session.setAccessToken(accessToken);
      return new Request("/account");
    } else {
      await session.setError(Errors.Failed);
      return new Request("/");
    }
  }
);
