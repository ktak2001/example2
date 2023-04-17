import { resolver } from "../resolver";
import { Errors } from "../Errors";
import { gql } from "../../gql/index";

const RegisterMutation = gql(`
  mutation Register($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
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
  firstName: string;
  lastName: string;
}

export const register = resolver<{}, FormData>(
  { method: "POST" },
  async ({ formData, session, queryShop }) => {
    const { email, password, firstName, lastName } = formData;

    const { data } = await queryShop({
      query: RegisterMutation,
      variables: {
        input: { email, password, firstName, lastName },
      },
    });

    if (data?.customerCreate?.customer?.id) {
      return new Request("/login");
    } else {
      await session.setError(Errors.Failed);
      return new Request("/register");
    }
  }
);
