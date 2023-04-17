import { FC } from "react";
import { Heading } from "../../components/Heading.client";
import { SubHeading } from "../../components/SubHeading.client";
import { Responsive } from "../../components/Responsive.client";
import { AccountMenu } from "../account/AccountMenu.client";
import { AddressEditForm } from "./AddressEditForm.client";
import { DocumentType, gql } from "../../gql/index";

const AddressFragment = gql(`
  fragment Address on MailingAddress {
    id
    formatted
    firstName
    lastName
    zip
    country
    province
    city
    address1
    address2
    phone
  }
`);

interface Props {
  address: DocumentType<typeof AddressFragment>;
}

export const EditAddress: FC<Props> = (props) => (
  <div>
    <Responsive
      desktop={DesktopEditAddress}
      mobile={MobileEditAddress}
      props={props}
    />
    <div className="mb-10">
      <AccountMenu selected="addresses" />
    </div>
  </div>
);

const DesktopEditAddress: FC<Props> = ({ address }) => (
  <div className="flex flex-col">
    <div className="mt-10 mb-3">
      <Heading title="マイページ" subTitle="MY PAGE" />
    </div>
    <div className="bg-attention pt-10 pb-14 mb-12 flex justify-center">
      <div className="flex justify-center">
        <div className="flex flex-col">
          <div className="mb-2">
            <SubHeading title="ADDRESS" subTitle="アドレス帳登録住所編集" />
          </div>
          <div className="bg-white py-10">
            <div className="flex justify-center wrapper">
              <AddressEditForm address={address} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MobileEditAddress: FC<Props> = ({ address }) => (
  <>
    <div className="mt-10 mb-4">
      <Heading title="マイページ" subTitle="MY PAGE" />
    </div>
    <div className="bg-attention pt-7 pb-14 px-5 mb-14">
      <div className="mb-3">
        <SubHeading title="ADDRESS" subTitle="アドレス帳登録住所変更" />
      </div>
      <div className="bg-white px-5 pt-7 pb-11">
        <AddressEditForm address={address} />
      </div>
    </div>
  </>
);
