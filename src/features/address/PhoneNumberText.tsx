import { FC, HTMLAttributes } from "react";
import { MailingAddress } from "../../gql/graphql";

interface Props extends HTMLAttributes<HTMLParagraphElement> {
  address: Pick<MailingAddress, "phone">;
}

export const PhoneNumberText: FC<Props> = ({ address, ...props }) => (
  <p {...props}>TEL：{getPhoneNumberText(address)}</p>
);

const getPhoneNumberText = ({ phone }: Pick<MailingAddress, "phone">) =>
  phone
    ? `${phone.substring(0, 3)}-${phone.substring(3, 7)}-${phone.substring(
        7,
        phone.length
      )}`
    : "";
