import { FC } from "react";
import { gql, DocumentType } from "../../gql/index";
import { Heading } from "../../components/Heading.client";
import { Link } from "../../components/Link.client";
import { AccountMenu } from "../account/AccountMenu.client";
import { SubHeading } from "../../components/SubHeading.client";
import { Responsive } from "../../components/Responsive.client";
import { FinancialStatusText } from "./FinancialStatusText";
import { FulfillmentStatusText } from "./FulfillmentStatusText";
import { formatDate } from "../../utils/date";

const OrderListConnectionFragment = gql(`
  fragment OrderListConnection on OrderConnection {
    nodes {
      id
      orderNumber
      processedAt
      financialStatus
      fulfillmentStatus
      currentTotalPrice {
        amount
        currencyCode
      }
      lineItems(first: 2) {
        edges {
          node {
            variant {
              image {
                url
                altText
                height
                width
              }
            }
            title
          }
        }
      }
    }
  }
`);

type Orders = DocumentType<typeof OrderListConnectionFragment>;
type Order = Orders["nodes"][number];

interface Props {
  orders: Orders;
}

export const OrderList: FC<Props> = (props) => (
  <div>
    <Responsive
      desktop={DesktopOrderList}
      mobile={MobileOrderList}
      props={props}
    />
    <div className="mb-10">
      <AccountMenu selected="orders" />
    </div>
  </div>
);

const DesktopOrderList: FC<Props> = ({ orders }) => (
  <div className="flex flex-col">
    <div className="mt-10 mb-3">
      <Heading title="マイページ" subTitle="MY PAGE" />
    </div>
    <div className="bg-attention pt-10 pb-14 mb-12">
      <div className="flex justify-center">
        <div className="flex flex-col">
          <div className="mb-2">
            <SubHeading title="ORDER LIST" subTitle="ご注文履歴" />
          </div>
          <div className="bg-white flex justify-center px-10 py-10 wrapper">
            <table className="w-full">
              <thead>
                <tr className="border-b border-solid border-lightGray">
                  <th className="font-bold pb-2">注文番号</th>
                  <th className="font-bold pb-2">注文日</th>
                  <th className="font-bold pb-2">お支払い状況</th>
                  <th className="font-bold pb-2">配送状況</th>
                  <th className="font-bold pb-2">合計金額</th>
                </tr>
              </thead>
              <tbody>
                {orders.nodes.map((order) => (
                  <DesktopOrderListItem
                    key={order!.id!.split("/").pop()!.split("?")[0]}
                    order={order}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DesktopOrderListItem: FC<{ order: Order }> = ({ order }) => {
  const legacyOrderId = order!.id!.split("/").pop()!.split("?")[0];

  return (
    <tr className="border-b border-solid border-lightGray text-center">
      <td className="py-5 text-link text-lg font-semibold">
        <Link route="order" id={legacyOrderId}>
          # {order.orderNumber}
        </Link>
      </td>
      <td className="py-5">
        <Link route="order" id={legacyOrderId}>
          {formatDate(order.processedAt, "YYYY.M.D")}
        </Link>
      </td>
      <td className="py-5">
        <Link route="order" id={legacyOrderId}>
          <FinancialStatusText financialStatus={order.financialStatus!} />
        </Link>
      </td>
      <td className="py-5">
        <Link route="order" id={legacyOrderId}>
          <FulfillmentStatusText fulfillmentStatus={order.fulfillmentStatus} />
        </Link>
      </td>
      <td className="py-5">
        <Link route="order" id={legacyOrderId}>
          <div className="flex justify-center gap-2">
            <p className="text-lg font-semibold">
              ¥ {order.currentTotalPrice.amount}
            </p>
            <p className="text-xs self-end">税込</p>
          </div>
        </Link>
      </td>
    </tr>
  );
};

const MobileOrderList: FC<Props> = ({ orders }) => (
  <div className="flex flex-col">
    <div className="mt-10 mb-3">
      <Heading title="マイページ" subTitle="MY PAGE" />
    </div>
    <div className="bg-attention pt-10 pb-14 mb-12 px-5">
      <div className="flex flex-col">
        <div className="mb-2">
          <SubHeading title="ORDER LIST" subTitle="ご注文履歴" />
        </div>
        <div className="bg-white flex justify-center px-9 py-10">
          {orders.nodes.map((order) => (
            <MobileOrderListItem
              key={order!.id!.split("/").pop()!.split("?")[0]}
              order={order}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const MobileOrderListItem: FC<{ order: Order }> = ({ order }) => {
  const legacyOrderId = order!.id!.split("/").pop()!.split("?")[0];

  return (
    <div className="w-full pt-6 first:pt-0 pb-6 border-b border-solid border-lightGray">
      <Link route="order" id={legacyOrderId}>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="font-bold">注文番号</p>
            <p className="text-link text-lg font-semibold">
              # {order.orderNumber}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold">注文日</p>
            <p className="">{formatDate(order.processedAt, "YYYY.M.D")}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold">お支払い状況</p>
            <p className="">
              <FinancialStatusText financialStatus={order.financialStatus!} />
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold">配送状況</p>
            <p className="">
              <FulfillmentStatusText
                fulfillmentStatus={order.fulfillmentStatus}
              />
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold">合計金額</p>
            <div className="flex justify-center gap-2">
              <p className="text-lg font-semibold font-outfit">
                ¥ {order.currentTotalPrice.amount}
              </p>
              <p className="text-xs self-end">税込</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
