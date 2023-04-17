import { resolver } from "../resolver";
import { Errors } from "../Errors";
import { gql } from "../../gql/index";

const DeleteAddressMutation = gql(`
  mutation deleteAddress($customerAccessToken: String!, $id: ID!) {
    customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
      customerUserErrors {
        code
        field
        message
      }
      deletedCustomerAddressId
    }
  }
`);

interface Params {
  addressId: string;
}

export const deleteAddress = resolver<Params, {}>(
  { method: "POST", authenticate: true },
  async ({ params, session, queryShop }) => {
    const { addressId } = params;

    const customerAccessToken = await session.getAccessToken();

    const { data } = await queryShop({
      query: DeleteAddressMutation,
      variables: {
        customerAccessToken,
        id: decodeURIComponent(addressId),
      },
    });

    if (
      data?.customerAddressDelete?.customerUserErrors &&
      data.customerAddressDelete.customerUserErrors.length > 0
    ) {
      return new Request("/account/address");
    } else {
      await session.setError(Errors.Failed);
      return new Request("/account/address");
    }
  }
);
