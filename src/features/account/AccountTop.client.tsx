import { FC } from "react";
import { AccountDetail } from "./AccountDetail.client";
import { DocumentType, gql } from "../../gql/index";
import { AccountMenu } from "./AccountMenu.client";
import { AccountQuery } from "../../routes/account/index.server";
import { Responsive } from "../../components/Responsive.client";
import { Heading } from "../../components/Heading.client";
import { SubHeading } from "../../components/SubHeading.client";
import { AddressDetail } from "../address/AddressDetail.client";

export const AccountDetailFragment = gql(`
  fragment AccountDetail on Customer {
    firstName
    lastName
    email
    defaultAddress {
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

export const AccountTop: FC<DocumentType<typeof AccountQuery>> = (props) => (
  <div>
    <Responsive desktop={DesktopAccount} mobile={MobileAccount} props={props} />
    <div className="mb-10">
      <AccountMenu selected="home" />
    </div>
  </div>
);

const DesktopAccount: FC<DocumentType<typeof AccountQuery>> = ({
  customer,
}) => (
  <div className="flex flex-col">
    <div className="mt-10 mb-3">
      <Heading title="マイページ" subTitle="MY PAGE" />
    </div>
    <div className="bg-attention pt-12 pb-10 mb-12">
      <div className="flex justify-center">
        <div className="flex flex-col">
          <div className="mb-10">
            <AccountDetail customer={customer!} />
          </div>
          <div className="mb-2">
            <SubHeading title="MY ADDRESS" subTitle="登録住所" />
          </div>
          {customer?.defaultAddress && (
            <div>
              <AddressDetail address={customer.defaultAddress} isDefault />
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

const MobileAccount: FC<DocumentType<typeof AccountQuery>> = ({ customer }) => (
  <>
    <div className="mt-10 mb-4">
      <Heading title="マイページ" subTitle="MY PAGE" />
    </div>
    <div className="bg-attention pt-10 pb-12 px-5 mb-14">
      <div className="mb-11">
        <AccountDetail customer={customer!} />
      </div>
      <div className="mb-3">
        <SubHeading title="MY ADDRESS" subTitle="登録住所" />
      </div>
      <div>
        <AddressDetail address={customer!.defaultAddress!} isDefault />
      </div>
    </div>
  </>
);
