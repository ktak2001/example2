import { FC } from "react";
import { Heading } from "../../components/Heading.client";
import { SubHeading } from "../../components/SubHeading.client";
import { Responsive } from "../../components/Responsive.client";
import { AccountMenu } from "../account/AccountMenu.client";
import { AddressEditForm } from "./AddressEditForm.client";

export const NewAddress: FC = () => (
  <div>
    <Responsive desktop={DesktopNewAddress} mobile={MobileNewAddress} />
    <div className="mb-10">
      <AccountMenu selected="addresses" />
    </div>
  </div>
);

const DesktopNewAddress: FC = () => (
  <div className="flex flex-col">
    <div className="mt-10 mb-3">
      <Heading title="マイページ" subTitle="MY PAGE" />
    </div>
    <div className="bg-attention pt-10 pb-14 mb-12 flex justify-center">
      <div className="flex justify-center">
        <div className="flex flex-col">
          <div className="mb-2">
            <SubHeading title="ADDRESS" subTitle="アドレス帳新規登録" />
          </div>
          <div className="bg-white py-10">
            <div className="flex justify-center wrapper">
              <AddressEditForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MobileNewAddress: FC = () => (
  <>
    <div className="mt-10 mb-4">
      <Heading title="マイページ" subTitle="MY PAGE" />
    </div>
    <div className="bg-attention pt-7 pb-14 px-5 mb-14">
      <div className="mb-3">
        <SubHeading title="ADDRESS" subTitle="アドレス帳新規登録" />
      </div>
      <div className="bg-white px-5 pt-7 pb-11">
        <AddressEditForm />
      </div>
    </div>
  </>
);
