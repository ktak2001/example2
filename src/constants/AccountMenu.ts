import { Route } from "./Route";

export interface AccountMenuItem {
  key: string;
  title: string;
  route: Route;
}

export const AccountMenuItems: AccountMenuItem[] = [
  {
    key: "home",
    title: "マイページ\nHOME",
    route: {
      route: "account",
    },
  },
  {
    key: "loginInfo",
    title: "ログイン\n情報",
    route: {
      route: "accountInfo",
    },
  },
  {
    key: "myAddress",
    title: "登録\n住所",
    route: {
      route: "defaultAddress",
    },
  },
  {
    key: "addresses",
    title: "アドレス\n帳",
    route: {
      route: "address",
    },
  },
  {
    key: "orders",
    title: "ご注文\n履歴",
    route: {
      route: "orders",
    },
  },
  {
    key: "favorites",
    title: "お気に\n入り",
    route: {
      route: "favorites",
    },
  },
];
