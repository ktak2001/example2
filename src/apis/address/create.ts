import { resolver } from "../resolver";
import { Errors } from "../Errors";
import { gql } from "../../gql/index";

const CreateAddressMutation = gql(`
  mutation CreateAddress(
    $address: MailingAddressInput!
    $customerAccessToken: String!
  ) {
    customerAddressCreate(
      address: $address
      customerAccessToken: $customerAccessToken
    ) {
      customerAddress {
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

const UpdateDefaultAddressMutation = gql(`
  mutation UpdateDefaultAddress(
    $addressId: ID!
    $customerAccessToken: String!
  ) {
    customerDefaultAddressUpdate(
      addressId: $addressId
      customerAccessToken: $customerAccessToken
    ) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`);

interface FormData {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  province: string;
  city: string;
  zip: string;
  phone: string;
  isDefaultAddress: string;
}

export const createAddress = resolver<{}, FormData>(
  { method: "POST", authenticate: true },
  async ({ formData, session, queryShop }) => {
    const customerAccessToken = await session.getAccessToken();

    const address: any = {
      country: "jp",
    };

    if (formData.firstName) address.firstName = formData.firstName;
    if (formData.lastName) address.lastName = formData.lastName;
    if (formData.address1) address.address1 = formData.address1;
    if (formData.address2) address.address2 = formData.address2;
    if (formData.province) address.province = formData.province;
    if (formData.city) address.city = formData.city;
    if (formData.zip) address.zip = formData.zip;
    if (formData.phone) address.phone = formData.phone;

    let addressId = "";

    const { data } = await queryShop({
      query: CreateAddressMutation,
      variables: {
        address,
        customerAccessToken,
      },
    });

    if (data?.customerAddressCreate?.customerAddress?.id) {
      addressId = data.customerAddressCreate.customerAddress.id;
    } else {
      await session.setError(Errors.Failed);
      return new Request("/account/address/new");
    }

    if (formData.isDefaultAddress) {
      const { data } = await queryShop({
        query: UpdateDefaultAddressMutation,
        variables: {
          addressId,
          customerAccessToken,
        },
      });

      if (
        data?.customerDefaultAddressUpdate?.customerUserErrors &&
        data.customerDefaultAddressUpdate.customerUserErrors.length > 0
      ) {
        await session.setError(Errors.Failed);
        return new Request("/account/address/new");
      }
    }

    return new Request("/account/address");
  }
);
