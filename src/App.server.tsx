import renderHydrogen from "@shopify/hydrogen/entry-server";
import {
  type HydrogenRouteProps,
  Router,
  FileRoutes,
  ShopifyProvider,
  CartProvider,
} from "@shopify/hydrogen";
import { Suspense } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

const App = ({ routes }: HydrogenRouteProps) => (
  <Suspense fallback={null}>
    <ShopifyProvider>
      <CartProvider>
        <Router>
          <FileRoutes routes={routes} />
        </Router>
      </CartProvider>
    </ShopifyProvider>
  </Suspense>
);

export default renderHydrogen(App);
