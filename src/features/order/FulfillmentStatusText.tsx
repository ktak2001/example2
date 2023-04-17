import { FC } from "react";
import { OrderFulfillmentStatus } from "@shopify/hydrogen/storefront-api-types";

interface Props {
  fulfillmentStatus: OrderFulfillmentStatus;
}

export const FulfillmentStatusText: FC<Props> = ({ fulfillmentStatus }) => (
  <>{getFulfillmentStatus(fulfillmentStatus)}</>
);

const getFulfillmentStatus = (status: OrderFulfillmentStatus) =>
  ({
    ["FULFILLED"]: "発送済",
    ["IN_PROGRESS"]: "発送準備中",
    ["ON_HOLD"]: "保留",
    ["OPEN"]: "注文受付済",
    ["PARTIALLY_FULFILLED"]: "一部発送済",
    ["PENDING_FULFILLMENT"]: "保留",
    ["RESTOCKED"]: "再入荷",
    ["SCHEDULED"]: "スケジュール済み",
    ["UNFULFILLED"]: "未発送",
  }[status]);
