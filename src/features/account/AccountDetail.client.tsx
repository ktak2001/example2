import { FC } from "react";
import { Responsive } from "../../components/Responsive.client";
import { Link } from "../../components/Link.client";
import { AccountDetailFragment } from "./AccountTop.client";
import { ReactComponent as ArrowRight } from "../../assets/icon/arrow_right.svg";
import { DocumentType } from "../../gql/index";

interface Props {
  customer: Omit<DocumentType<typeof AccountDetailFragment>, "defaultAddress">;
}

export const AccountDetail: FC<Props> = (props) => (
  <Responsive
    desktop={DesktopAccountDetail}
    mobile={MobileAccountDetail}
    props={props}
  />
);

export const DesktopAccountDetail: FC<Props> = ({ customer }) => (
  <div className="bg-link py-7 wrapper flex justify-center text-white">
    <div className="flex justify-center items-end gap-12">
      <div>
        <p className="text-sm mb-1">
          <span className="text-xl font-bold mr-2">
            {customer.lastName} {customer.firstName}
          </span>
          様
        </p>
        <p className="text-sm">{customer.email}</p>
      </div>
      <Link route="accountInfo">
        <div>
          <div className="flex items-center">
            <p className="text-sm font-bold mr-3 mb-1">ログイン情報編集</p>
            <ArrowRight width={16} height={7} className="fill-white mb-2" />
          </div>
          <p className="text-sm">メールアドレス・パスワードの変更</p>
        </div>
      </Link>
    </div>
  </div>
);

export const MobileAccountDetail: FC<Props> = ({ customer }) => (
  <div className="bg-link text-white p-7">
    <div className="mb-10">
      <p className="text-sm mb-1">
        <span className="text-xl font-bold mr-2">
          {customer.lastName} {customer.firstName}
        </span>
        様
      </p>
      <p className="text-sm">{customer.email}</p>
    </div>
    <Link route="accountInfo">
      <div>
        <div className="flex items-center">
          <p className="text-sm font-bold mr-3 mb-1">ログイン情報編集</p>
          <ArrowRight width={16} height={7} className="fill-white mb-2" />
        </div>
        <p className="text-sm">メールアドレス・パスワードの変更</p>
      </div>
    </Link>
  </div>
);
