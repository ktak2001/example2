import { FC } from "react";
import { OrderFinancialStatus } from "@shopify/hydrogen/storefront-api-types";

interface Props {
  financialStatus: OrderFinancialStatus;
}

export const FinancialStatusText: FC<Props> = ({ financialStatus }) => (
  <>{getFinancialStatus(financialStatus)}</>
);

const getFinancialStatus = (status: OrderFinancialStatus) =>
  ({
    ["AUTHORIZED"]: "認証済",
    ["PAID"]: "支払い済",
    ["PARTIALLY_PAID"]: "一部支払い済",
    ["PARTIALLY_REFUNDED"]: "一部返金済",
    ["PENDING"]: "保留中",
    ["REFUNDED"]: "返金済",
    ["VOIDED"]: "無効",
  }[status]);
