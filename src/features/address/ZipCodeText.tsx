import { FC, HTMLAttributes } from "react";
import { MailingAddress } from "../../gql/graphql";

interface Props extends HTMLAttributes<HTMLParagraphElement> {
  address: Pick<MailingAddress, "zip">;
}

export const ZipCodeText: FC<Props> = ({ address, ...props }) => (
  <p {...props}>{getZipCodeText(address)}</p>
);

const getZipCodeText = ({ zip }: Pick<MailingAddress, "zip">) =>
  zip ? `〒 ${zip.substring(0, 3)}-${zip.substring(4, zip.length)}` : "";
