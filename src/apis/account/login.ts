import { resolver } from "../resolver";
import { Errors } from "../Errors";
import { gql } from "../../gql/index";

const LoginMutation = gql(`
  mutation Login($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerUserErrors {
        code
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`);

interface FormData {
  email: string;
  password: string;
}

export const login = resolver<{}, FormData>(
  { method: "POST" },
  async ({ formData, session, queryShop }) => {
    const { email, password } = formData;

    const { data } = await queryShop({
      query: LoginMutation,
      variables: {
        input: {
          email,
          password,
        },
      },
    });

    if (data?.customerAccessTokenCreate?.customerAccessToken?.accessToken) {
      const accessToken =
        data.customerAccessTokenCreate.customerAccessToken.accessToken;
      await session.setAccessToken(accessToken);
      return new Request("/account");
    } else {
      await session.setError(Errors.Failed);
      return new Request("/login");
    }
  }
);
