import { resolver } from "../resolver";
import { Errors } from "../Errors";
import { gql } from "../../gql/index";

const RecoverMutation = gql(`
  mutation Recover($email: String!) {
    customerRecover(email: $email) {
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
}

export const recover = resolver<{}, FormData>(
  { method: "POST" },
  async ({ formData, session, queryShop }) => {
    const { email } = formData;

    const { data } = await queryShop({
      query: RecoverMutation,
      variables: { email },
    });

    if (
      data?.customerRecover?.customerUserErrors &&
      data.customerRecover.customerUserErrors.length > 0
    ) {
      await session.setError(Errors.Failed);
      return new Request("/account/recover");
    } else {
      return new Request("/");
    }
  }
);
