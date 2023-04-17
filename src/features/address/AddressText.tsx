import { FC, HTMLAttributes } from "react";
import { MailingAddress } from "../../gql/graphql";
import { getPrefectureName, Prefecture } from "../../constants/Prefecture";

interface Props extends HTMLAttributes<HTMLParagraphElement> {
  address: Pick<MailingAddress, "province" | "city" | "address1" | "address2">;
}

export const AddressText: FC<Props> = ({ address, ...props }) => (
  <p {...props}>{getFullAddressText(address)}</p>
);

const getFullAddressText = ({
  province,
  city,
  address1,
  address2,
}: Pick<MailingAddress, "province" | "city" | "address1" | "address2">) =>
  `${getPrefectureName(province as Prefecture) ?? ""}${city ?? ""}${
    address1 ?? ""
  }${address2 ? ` ${address2}` : ""}`;
