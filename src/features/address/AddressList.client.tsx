import { FC } from "react";
import { gql, DocumentType } from "../../gql/index";
import { AddressDetail } from "./AddressDetail.client";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { Heading } from "../../components/Heading.client";
import { AccountMenu } from "../account/AccountMenu.client";
import { SubHeading } from "../../components/SubHeading.client";
import clsx from "clsx";
import { Link } from "../../components/Link.client";
import { LinkButton } from "../../components/buttons/LinkButton.client";

const DefaultAddressDetailFragment = gql(`
  fragment DefaultAddressDetail on MailingAddress {
    id
  }
`);

const AddressListConnectionFragment = gql(`
  fragment AddressListConnection on MailingAddressConnection {
    nodes {
      id
      formatted
      firstName
      lastName
      address1
      address2
      country
      province
      city
      zip
      phone
    }
  }
`);

interface Props {
  defaultAddress: DocumentType<typeof DefaultAddressDetailFragment>;
  addresses: DocumentType<typeof AddressListConnectionFragment>;
}

export const AddressList: FC<Props> = ({ defaultAddress, addresses }) => {
  const isDesktop = useIsDesktop();

  const fullDefaultAddress = addresses.nodes.find(
    (address) => address.id === defaultAddress.id
  );
  const addressesWithoutDefault = addresses.nodes.filter(
    (address) => address.id !== defaultAddress.id
  );

  return (
    <div className="flex flex-col">
      <div className="mt-10 mb-3">
        <Heading title="マイページ" subTitle="MY PAGE" />
      </div>
      <div
        className={clsx(
          "bg-attention pt-10 pb-14 mb-12",
          isDesktop ? "" : "px-5"
        )}
      >
        <div className="mb-2">
          <SubHeading title="ADDRESS" subTitle="アドレス帳" />
        </div>
        <div
          className={clsx(
            "flex flex-col gap-5",
            isDesktop ? "wrapper mb-7" : "mb-10"
          )}
        >
          {addresses.nodes.length > 0 && (
            <>
              {fullDefaultAddress && (
                <AddressDetail
                  key={fullDefaultAddress.id}
                  address={fullDefaultAddress}
                  isDefault
                  isBasic
                />
              )}
              {addressesWithoutDefault.map((address) => (
                <AddressDetail key={address.id} address={address} />
              ))}
            </>
          )}
        </div>
        <div className="flex justify-center">
          <Link route="newAddress">
            <LinkButton
              title="新規登録"
              subTitle="NEW ADDRESS"
              className="bg-link"
            />
          </Link>
        </div>
      </div>
      <div className="mb-10">
        <AccountMenu selected="addresses" />
      </div>
    </div>
  );
};
