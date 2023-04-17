import { gql } from "../../gql/index";
import { Errors } from "../Errors";
import { resolver } from "../resolver";

const UpdateUserMutation = gql(`
  mutation UpdateUser($input: CustomerUpdateInput!, $customerAccessToken: String!) {
    customerUpdate(customer: $input, customerAccessToken: $customerAccessToken) {
      customerAccessToken {
        accessToken
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
  email: string;
  password: string;
}

export const updateUser = resolver<{}, FormData>(
  { method: "POST", authenticate: true },
  async ({ formData, session, queryShop }) => {
    const { email, password } = formData;
    const customerAccessToken = await session.getAccessToken();

    const { data } = await queryShop({
      query: UpdateUserMutation,
      variables: {
        input: {
          email,
          password,
        },
        customerAccessToken,
      },
    });

    if (
      data.customerUpdate?.customerUserErrors &&
      data.customerUpdate.customerUserErrors.length > 0
    ) {
      await session.setError(Errors.Failed);
      return new Request("/account/info");
    } else {
      const accessToken = data.customerUpdate?.customerAccessToken?.accessToken;

      if (!accessToken) {
        await session.setError(Errors.Failed);
        return new Request("/account/info");
      }

      await session.setAccessToken(accessToken);
      return new Request("/account");
    }
  }
);
