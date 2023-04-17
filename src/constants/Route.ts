export type Route =
  | {
      route: "activate";
      id: string;
      activationToken: string;
    }
  | {
      route: "editAddress";
      addressId: string;
    }
  | {
      route: "defaultAddress";
    }
  | {
      route: "address";
    }
  | {
      route: "newAddress";
    }
  | {
      route: "favorites";
    }
  | {
      route: "orders";
    }
  | {
      route: "order";
      id: string;
    }
  | {
      route: "recover";
    }
  | {
      route: "reset";
      id: string;
      resetToken: string;
    }
  | {
      route: "account";
    }
  | {
      route: "accountInfo";
    }
  | {
      route: "categories";
    }
  | {
      route: "category";
      handle: string;
    }
  | {
      route: "guides";
    }
  | {
      route: "shipping";
    }
  | {
      route: "payment";
    }
  | {
      route: "refunds";
    }
  | {
      route: "ordermade";
    }
  | {
      route: "howto";
    }
  | {
      route: "questions";
    }
  | {
      route: "features";
    }
  | {
      route: "feature";
      handle: string;
    }
  | {
      route: "products";
    }
  | {
      route: "product";
      handle: string;
    }
  | {
      route: "about";
    }
  | {
      route: "cart";
    }
  | {
      route: "contact";
    }
  | {
      route: "home";
    }
  | {
      route: "login";
    }
  | {
      route: "logout";
    }
  | {
      route: "ranking";
    }
  | {
      route: "recommends";
    }
  | {
      route: "register";
    }
  | {
      route: "news";
    }
  | {
      route: "search";
      query: string;
    }
  | {
      route: "withdraw";
    }
  | {
      route: "url";
      url: string;
    };
