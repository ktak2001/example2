import { FC, ReactNode } from "react";
import { Link as HydrogenLink } from "@shopify/hydrogen";
import { Route } from "../constants/Route";

type Props = Route & {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

export const Link: FC<Props> = ({ className, onClick, children, ...route }) => (
  <HydrogenLink
    to={generatePath(route)}
    className={className}
    onClick={onClick}
    children={children}
  />
);

const generatePath = (route: Route) => {
  switch (route.route) {
    case "activate":
      return `/account/activate/${route.id}/${route.activationToken}`;
    case "editAddress":
      return `/account/address/${route.addressId}/edit`;
    case "defaultAddress":
      return `/account/address/default`;
    case "address":
      return `/account/address`;
    case "newAddress":
      return `/account/address/new`;
    case "favorites":
      return `/account/favorites`;
    case "orders":
      return `/account/orders`;
    case "order":
      return `/account/order/${route.id}`;
    case "recover":
      return `/account/recover`;
    case "reset":
      return `/account/reset/${route.id}/${route.resetToken}`;
    case "account":
      return `/account`;
    case "accountInfo":
      return `/account/info`;
    case "categories":
      return `/categories`;
    case "category":
      return `/categories/${route.handle}`;
    case "features":
      return `/features`;
    case "feature":
      return `/features/${route.handle}`;
    case "guides":
      return `/guides`;
    case "shipping":
      return `/guides/shipping`;
    case "payment":
      return `/guides/payment`;
    case "refunds":
      return `/guides/refunds`;
    case "ordermade":
      return `/guides/ordermade`;
    case "howto":
      return `/guides/howto`;
    case "questions":
      return `/guides/questions`;
    case "products":
      return `/products`;
    case "product":
      return `/products/${route.handle}`;
    case "about":
      return `/about`;
    case "cart":
      return `/cart`;
    case "contact":
      return `/contact`;
    case "home":
      return `/`;
    case "login":
      return `/login`;
    case "logout":
      return `/logout`;
    case "ranking":
      return `/ranking`;
    case "recommends":
      return `/recommends`;
    case "register":
      return `/register`;
    case "news":
      return `/news`;
    case "search":
      return `/search?q=${encodeURIComponent(route.query)}`;
    case "withdraw":
      return `/withdraw`;
    case "url":
      return route.url;
  }
};
