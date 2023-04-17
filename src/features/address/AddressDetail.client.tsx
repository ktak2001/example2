import { FC } from "react";
import { AddressListConnectionFragmentDoc } from "../../gql/graphql";
import { DocumentType } from "../../gql/index";
import { Responsive } from "../../components/Responsive.client";
import { ReactComponent as ArrowRight } from "../../assets/icon/arrow_right.svg";
import { ReactComponent as Trash } from "../../assets/icon/trash.svg";
import { Link } from "../../components/Link.client";
import { convertToLegacyId } from "../../utils/id";
import { Form } from "@shopify/hydrogen/foundation/Form/Form.client";
import clsx from "clsx";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { AddressText } from "./AddressText";
import { PhoneNumberText } from "./PhoneNumberText";
import { ZipCodeText } from "./ZipCodeText";

interface Props {
  address: DocumentType<
    typeof AddressListConnectionFragmentDoc
  >["nodes"][number];
  isDefault?: boolean;
  isBasic?: boolean;
}

export const AddressDetail: FC<Props> = (props) => (
  <Responsive
    desktop={DesktopAddressDetail}
    mobile={MobileAddressDetail}
    props={props}
  />
);

const DesktopAddressDetail: FC<Props> = ({ address, isDefault, isBasic }) => (
  <div className="flex justify-between bg-white">
    <div className="mx-10 my-7 flex">
      <div className="w-48">
        <p className="font-bold mb-1">{`${address.lastName} ${address.firstName}`}</p>
        {isBasic && <p className="text-sm">基本住所</p>}
      </div>
      <div>
        <ZipCodeText address={address} className="mb-1" />
        <AddressText address={address} className="mb-3" />
        {!!address.phone && <PhoneNumberText address={address} />}
      </div>
    </div>
    <div className={clsx("flex flex-col", isDefault ? "my-7" : "my-3")}>
      <Link
        {...(isDefault
          ? { route: "defaultAddress" }
          : { route: "editAddress", addressId: convertToLegacyId(address.id) })}
      >
        <div className="text-center text-white flex justify-center px-5 py-4 bg-link rounded-l">
          <div>
            <p className="text-xs font-outfit font-semibold tracking-[0.48px]">
              EDIT
            </p>
            <p className="font-sm mb-2">編集</p>
            <div className="flex justify-center">
              <ArrowRight className="fill-white" />
            </div>
          </div>
        </div>
      </Link>
      {!isDefault && (
        <div>
          <AddressDeleteForm addressId={address.id} />
        </div>
      )}
    </div>
  </div>
);

const MobileAddressDetail: FC<Props> = ({ address, isDefault, isBasic }) => (
  <div className="bg-white px-9 pt-10">
    <div className="mb-6">
      <p className="font-bold">{`${address.lastName} ${address.firstName}`}</p>
      {isBasic && <p className="text-sm">基本住所</p>}
    </div>
    <div className="mb-8">
      <ZipCodeText address={address} className="mb-1" />
      <AddressText address={address} />
      {!!address.phone && (
        <PhoneNumberText address={address} className="mt-3" />
      )}
    </div>
    <div className="flex justify-center">
      <Link
        {...(isDefault
          ? { route: "defaultAddress" }
          : { route: "editAddress", addressId: convertToLegacyId(address.id) })}
      >
        <div className="bg-link flex justify-center text-white px-8 py-4 rounded-t">
          <div className="flex justify-center items-center gap-2">
            <p className="text-xs font-outfit font-semibold tracking-[0.48px] self-end leading-none">
              EDIT
            </p>
            <p className="font-sm leading-none">編集</p>
            <div className="flex justify-center">
              <ArrowRight width={20} height={8} className="fill-white" />
            </div>
          </div>
        </div>
      </Link>
      {!isDefault && (
        <div>
          <AddressDeleteForm addressId={address.id} />
        </div>
      )}
    </div>
  </div>
);

interface AddressDeleteFormProps {
  addressId: string;
}

const AddressDeleteForm: FC<AddressDeleteFormProps> = ({ addressId }) => {
  const isDesktop = useIsDesktop();

  return (
    <Form
      action={`/account/address/${encodeURIComponent(addressId)}/delete`}
      method="post"
    >
      {({ loading }) => (
        <div>
          <button
            type="submit"
            disabled={loading}
            className={clsx("", isDesktop ? "px-2 pt-3" : "px-9 py-3")}
          >
            <button
              type="submit"
              className="flex justify-center items-center gap-1"
            >
              <p>削除</p>
              <Trash />
            </button>
          </button>
        </div>
      )}
    </Form>
  );
};
