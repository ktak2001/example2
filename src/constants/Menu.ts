import { Route } from "./Route";

export interface MenuItem {
  title: string;
  subTitle: string;
  items: {
    title: string;
    route: Route;
  }[];
}

export const Menu: MenuItem[][] = [
  [
    {
      title: "商品カテゴリー",
      subTitle: "PRODUCTS",
      items: [
        {
          title: "仏壇・仏具",
          route: {
            route: "category",
            handle: "",
          },
        },
        {
          title: "位牌・骨壺",
          route: {
            route: "category",
            handle: "",
          },
        },
        {
          title: "キャンドル・線香",
          route: {
            route: "category",
            handle: "",
          },
        },
        {
          title: "手元供養",
          route: {
            route: "category",
            handle: "",
          },
        },
        {
          title: "メモリアルグッズ",
          route: {
            route: "category",
            handle: "",
          },
        },
        {
          title: "葬儀アイテム",
          route: {
            route: "category",
            handle: "",
          },
        },
        {
          title: "名入れ商品",
          route: {
            route: "category",
            handle: "",
          },
        },
        {
          title: "写真プリント商品",
          route: {
            route: "category",
            handle: "",
          },
        },
      ],
    },
  ],
  [
    {
      title: "ご利用案内",
      subTitle: "GUIDE",
      items: [
        {
          title: "ご利用ガイド",
          route: {
            route: "guides",
          },
        },
        {
          title: "配送・送料について",
          route: {
            route: "shipping",
          },
        },
        {
          title: "お支払いについて",
          route: {
            route: "payment",
          },
        },
        {
          title: "返品・交換について",
          route: {
            route: "refunds",
          },
        },
        {
          title: "オーダー商品について",
          route: {
            route: "ordermade",
          },
        },
        {
          title: "よくある質問",
          route: {
            route: "questions",
          },
        },
      ],
    },
  ],
  [
    {
      title: "コンテンツ",
      subTitle: "CONTENTE",
      items: [
        {
          title: "特集ページ",
          route: {
            route: "features",
          },
        },
        {
          title: "新着情報",
          route: {
            route: "news",
          },
        },
      ],
    },
    {
      title: "各種情報",
      subTitle: "INFORMATION",
      items: [
        {
          title: "特定商取引法に基づく表記",
          route: {
            route: "url",
            url: "https://cocopet.jp/",
          },
        },
        {
          title: "プライバシーポリシー",
          route: {
            route: "url",
            url: "https://cocopet.jp/",
          },
        },
        {
          title: "ご利用規約",
          route: {
            route: "url",
            url: "https://cocopet.jp/",
          },
        },
        {
          title: "COCO PETについて",
          route: {
            route: "url",
            url: "https://cocopet.jp/",
          },
        },
        {
          title: "運営会社",
          route: {
            route: "url",
            url: "https://cocopet.jp/",
          },
        },
      ],
    },
  ],
];
