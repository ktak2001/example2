import { Route } from "./Route";

export interface Guide {
  name: string;
  title: string;
  description: string;
  route: Route;
}

export const Guides: Guide[] = [
  {
    name: "shipping",
    title: "配送・送料について",
    description: "ギフト配送についてもこちらからご確認ください。",
    route: {
      route: "shipping",
    },
  },
  {
    name: "payment",
    title: "お支払いについて",
    description: "クレジットカード・銀行振込の他、各種ご用意。",
    route: {
      route: "payment",
    },
  },
  {
    name: "refunds",
    title: "返品・交換について",
    description: "返品・交換についてのご案内。",
    route: {
      route: "refunds",
    },
  },
  {
    name: "madeOrder",
    title: "オーダー商品について",
    description: "名入れやプリント等、カスタマイズ商品のご注文方法。",
    route: {
      route: "ordermade",
    },
  },
  {
    name: "howto",
    title: "肉球・手形の取り方",
    description: "ペットの肉球や手形を上手に保存する方法をご紹介",
    route: {
      route: "howto",
    },
  },
  {
    name: "questions",
    title: "よくある質問",
    description: "お問い合わせの多い質問を掲載。不明点は気軽にお問い合わせを。",
    route: {
      route: "questions",
    },
  },
];
