import { FC } from "react";
import { Link } from "../../components/Link.client";
import { Form } from "@shopify/hydrogen/foundation/Form/Form.client";
import { Responsive } from "../../components/Responsive.client";
import { Submit } from "../../components/forms/Submit.client";
import { AccountMenuItems } from "../../constants/AccountMenu";
import { ReactComponent as Member } from "../../assets/icon/member.svg";
import { ReactComponent as Password } from "../../assets/icon/password.svg";
import { ReactComponent as Edit } from "../../assets/icon/edit.svg";
import { ReactComponent as Address } from "../../assets/icon/address.svg";
import { ReactComponent as History } from "../../assets/icon/history.svg";
import { ReactComponent as Like } from "../../assets/icon/like.svg";
import clsx from "clsx";

interface Props {
  selected: typeof AccountMenuItems[number]["key"];
}

export const AccountMenu: FC<Props> = (props) => (
  <Responsive
    desktop={DesktopAccountMenu}
    mobile={MobileAccountMenu}
    props={props}
  />
);

const DesktopAccountMenu: FC<Props> = ({ selected }) => (
  <div>
    <div className="wrapper flex justify-center gap-7 mb-7">
      {AccountMenuItems.map((item, i) => (
        <MenuItem key={i} item={item} isSelected={item.key === selected} />
      ))}
    </div>
    <div className="wrapper mb-24">
      <LogoutForm />
    </div>
    <div className="text-center">
      <p className="text-black text-sm">
        退会をご希望の方は、
        <Link route="withdraw" className="underline">
          こちらから
        </Link>
      </p>
    </div>
  </div>
);

const MobileAccountMenu: FC<Props> = ({ selected }) => (
  <div>
    <div className="flex justify-center mb-14">
      <div className="flex flex-col">
        {Array.from(Array(Math.ceil(AccountMenuItems.length / 2)).keys()).map(
          (num) => (
            <div key={num} className="flex justify-center gap-7 mb-6 last:mb-0">
              {AccountMenuItems.slice(num * 2, (num + 1) * 2).map((item, i) => (
                <MenuItem
                  key={i}
                  item={item}
                  isSelected={item.key === selected}
                />
              ))}
            </div>
          )
        )}
      </div>
    </div>
    <div className="mb-24">
      <LogoutForm />
    </div>
    <div className="text-center">
      <p className="text-black text-sm">
        退会をご希望の方は、
        <Link route="withdraw" className="underline">
          こちらから
        </Link>
      </p>
    </div>
  </div>
);

interface MenuItemProps {
  item: typeof AccountMenuItems[number];
  isSelected: boolean;
}

const MenuItem: FC<MenuItemProps> = ({ item, isSelected }) => (
  <Link {...item.route}>
    <div
      className={clsx(
        "w-32 h-24 flex justify-center items-center rounded",
        isSelected ? "bg-selected" : "bg-accent"
      )}
    >
      <div>
        <div className="flex justify-center mb-2">{renderIcon(item.key)}</div>
        <p className="text-sm text-white font-bold text-center whitespace-pre-wrap">
          {item.title}
        </p>
      </div>
    </div>
  </Link>
);

const LogoutForm: FC = () => (
  <Form action="/logout" method="POST">
    {({ loading }) => (
      <Submit
        title="ログアウト"
        subTitle="LOG OUT"
        disabled={loading}
        className="flex justify-center"
      />
    )}
  </Form>
);

const renderIcon = (path: string) => {
  switch (path) {
    case "home":
      return <Member className="fill-white" />;
    case "loginInfo":
      return <Password className="fill-white" />;
    case "myAddress":
      return <Edit className="fill-white" />;
    case "addresses":
      return <Address className="fill-white" />;
    case "orders":
      return <History className="fill-white" />;
    case "favorites":
      return <Like className="fill-white" />;
  }
};
