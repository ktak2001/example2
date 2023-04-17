import { FC } from "react";
import { Image, Money as HydorgenMoney } from "@shopify/hydrogen";
import { DocumentType, gql } from "../../gql/index";
import { Heading } from "../../components/Heading.client";
import { Responsive } from "../../components/Responsive.client";
import { AccountMenu } from "../account/AccountMenu.client";
import { SubHeading } from "../../components/SubHeading.client";
import { AddressText } from "../address/AddressText";
import { ZipCodeText } from "../address/ZipCodeText";
import { PhoneNumberText } from "../address/PhoneNumberText";
import { formatDate } from "../../utils/date";
import { CurrencyCode } from "@shopify/hydrogen/storefront-api-types";
import clsx from "clsx";

export const MoneyFragment = gql(`
  fragment Money on MoneyV2 {
    amount
    currencyCode
  }
`);

export const AddressFulFragment = gql(`
  fragment AddressFull on MailingAddress {
    address1
    address2
    city
    country
    firstName
    lastName
    phone
    province
    zip
  }
`);

export const ImageFragment = gql(`
  fragment Image on Image {
    altText
    src: url(transform: {crop: CENTER, maxHeight: 96, maxWidth: 96, scale: 2})
  }
`);

export const OrderDetailFragment = gql(`
  fragment OrderDetail on Order {
    id
    name
    orderNumber
    processedAt
    fulfillmentStatus
    totalTaxV2 {
      ...Money
    }
    totalPriceV2 {
      ...Money
    }
    shippingAddress {
      ...AddressFull
    }
    totalShippingPriceV2 {
      ...Money
    }
    lineItems(first: 100) {
      nodes {
        title
        quantity
        originalTotalPrice {
          ...Money
        }
        discountedTotalPrice {
          ...Money
        }
        variant {
          image {
            altText
            src: url(transform: {crop: CENTER, maxHeight: 96, maxWidth: 96, scale: 2})
          }
          priceV2 {
            ...Money
          }
        }
      }
    }
  }
`);

interface Props {
  order: DocumentType<typeof OrderDetailFragment>;
  customerAddress: DocumentType<typeof AddressFulFragment>;
}

export const OrderDetail: FC<Props> = (props) => (
  <div>
    <Responsive
      desktop={DesktopOrderDetail}
      mobile={MobileOrderDetail}
      props={props}
    />
    <div className="mb-10">
      <AccountMenu selected="orders" />
    </div>
  </div>
);

const DesktopOrderDetail: FC<Props> = ({ order, customerAddress }) => (
  <div className="flex flex-col">
    <div className="mt-10 mb-3">
      <Heading title="マイページ" subTitle="MY PAGE" />
    </div>
    <div className="bg-attention pt-10 pb-14 mb-12">
      <div className="flex justify-center">
        <div className="flex flex-col">
          <div className="mb-2">
            <SubHeading title="ORDER DETAIL" subTitle="ご注文詳細" />
          </div>
          <div className="wrapper pt-8 px-11 pb-10 mb-10 bg-white">
            <div className="mx-4 mb-4 flex gap-3 items-center">
              <p className="text-link font-outfit text-lg font-semibold">
                # {order.orderNumber}
              </p>
              <p>{formatDate(order.processedAt, "YYYY.M.D")}</p>
            </div>
            <div>
              <table className="w-full">
                <thead>
                  <tr className="font-bold border-b border-solid border-lightGray">
                    <th className="pb-2 text-left pl-7">商品名</th>
                    <th className="pb-2">価格</th>
                    <th className="pb-2">数量</th>
                    <th className="pb-2 text-right pr-6">合計金額</th>
                  </tr>
                </thead>
                <tbody>
                  {order.lineItems.nodes.map((item) => (
                    <DesktopOrderDetailItem key={item.title} lineItem={item} />
                  ))}
                  <tr className="border-b border-solid border-lightGray">
                    <td className="pl-6 py-5"></td>
                    <td className="py-5"></td>
                    <td className="py-5">
                      <div className="flex flex-col gap-3 text-right">
                        <p className="font-bold">小計</p>
                        <p className="font-bold">送料</p>
                      </div>
                    </td>
                    <td className="pr-6 py-5">
                      <div className="flex flex-col gap-3 text-right">
                        <Money
                          amount={
                            order.totalPriceV2.amount -
                            order.totalShippingPriceV2.amount
                          }
                          currencyCode={order.totalPriceV2.currencyCode}
                        />
                        <Money
                          amount={order.totalShippingPriceV2.amount}
                          currencyCode={order.totalShippingPriceV2.currencyCode}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="pl-6 pt-8"></td>
                    <td className="pt-8"></td>
                    <td className="pt-8 align-top text-right">
                      <p className="font-bold">合計</p>
                    </td>
                    <td className="pr-6 pt-8">
                      <div className="flex flex-col gap-3 text-right">
                        <Money
                          amount={order.totalPriceV2.amount}
                          currencyCode={order.totalPriceV2.currencyCode}
                        />
                        <div className="flex justify-end gap-2">
                          <p className="text-sm flex">
                            <HydorgenMoney data={order.totalTaxV2!} />
                            の税金を含む
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="wrapper grid grid-cols-2 gap-10">
            <Address title="配送先住所" address={order.shippingAddress!} />
            <Address title="請求先住所" address={customerAddress} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MobileOrderDetail: FC<Props> = ({ order, customerAddress }) => (
  <div className="flex flex-col mb-14">
    <div className="mt-10 mb-3">
      <Heading title="マイページ" subTitle="MY PAGE" />
    </div>
    <div className="bg-attention pt-7 px-5 pb-14">
      <div className="mb-3">
        <SubHeading title="ORDER DETAIL" subTitle="ご注文詳細" />
      </div>
      <div className="bg-white px-6 py-7 mb-5">
        {order.lineItems.nodes.map((item) => (
          <MobileOrderDetailItem key={item.title} lineItem={item} />
        ))}
        <div className="px-3 py-5 border-b border-solid border-lightGray flex flex-col gap-5">
          <div className="flex justify-between">
            <p className="font-bold">小計</p>
            <Money
              amount={
                order.totalPriceV2.amount - order.totalShippingPriceV2.amount
              }
              currencyCode={order.totalPriceV2.currencyCode}
            />
          </div>
          <div className="flex justify-between">
            <p className="font-bold">送料</p>
            <Money
              amount={order.totalShippingPriceV2.amount}
              currencyCode={order.totalShippingPriceV2.currencyCode}
            />
          </div>
        </div>
        <div className="px-3 pt-5 flex flex-col gap-5">
          <div className="flex justify-between">
            <p className="font-bold">合計</p>
            <Money
              amount={order.totalPriceV2.amount}
              currencyCode={order.totalPriceV2.currencyCode}
            />
          </div>
          <div className="flex justify-end">
            <p className="text-sm flex">
              <HydorgenMoney data={order.totalTaxV2!} />
              の税金を含む
            </p>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <Address title="配送先住所" address={order.shippingAddress!} />
      </div>
      <div>
        <Address title="請求先住所" address={customerAddress} />
      </div>
    </div>
  </div>
);

interface OrderDetailItemProps {
  lineItem: DocumentType<
    typeof OrderDetailFragment
  >["lineItems"]["nodes"][number];
}

const DesktopOrderDetailItem: FC<OrderDetailItemProps> = ({ lineItem }) => (
  <tr className="border-b border-solid border-lightGray">
    <td className="pl-6 py-5">
      <div className="flex gap-3">
        <div>
          <Image
            src={lineItem.variant?.image?.src ?? ""}
            width={60}
            height={60}
            alt={lineItem.variant?.image?.altText ?? "商品画像"}
            loaderOptions={{
              scale: 2,
              crop: "center",
            }}
          />
        </div>
        <div>
          <p>{lineItem.title}</p>
        </div>
      </div>
    </td>
    <td className="py-5">
      <Money
        position="center"
        amount={lineItem.discountedTotalPrice.amount / lineItem.quantity}
        currencyCode={lineItem.discountedTotalPrice.currencyCode}
      />
    </td>
    <td className="text-center px-5">{lineItem.quantity}</td>
    <td className="pr-6 py-5">
      <Money
        amount={lineItem.discountedTotalPrice.amount}
        currencyCode={lineItem.discountedTotalPrice.currencyCode}
      />
    </td>
  </tr>
);

const MobileOrderDetailItem: FC<OrderDetailItemProps> = ({ lineItem }) => (
  <div className="pt-7 first:pt-0 px-3 pb-5 border-b border-solid border-lightGray">
    <div className="mb-5">
      <Image
        src={lineItem.variant?.image?.src ?? ""}
        width={60}
        height={60}
        alt={lineItem.variant?.image?.altText ?? "商品画像"}
        loaderOptions={{
          scale: 2,
          crop: "center",
        }}
      />
    </div>
    <div className="mb-5">
      <p>{lineItem.title}</p>
    </div>
    <div className="flex justify-between mb-5">
      <p className="font-bold">数量</p>
      <p>{lineItem.quantity}</p>
    </div>
    <div className="flex justify-between">
      <p className="font-bold">合計金額</p>
      <Money
        amount={lineItem.discountedTotalPrice.amount}
        currencyCode={lineItem.discountedTotalPrice.currencyCode}
      />
    </div>
  </div>
);

interface AddressProps {
  title: string;
  address: DocumentType<typeof AddressFulFragment>;
}

const Address: FC<AddressProps> = ({ title, address }) => (
  <div className="bg-white pt-7 px-10 pb-12">
    <div className="mb-8">
      <p className="text-xl font-bold">{title}</p>
    </div>
    <div className="">
      <ZipCodeText address={address} className="mb-1" />
      <AddressText address={address} />
      {!!address.phone && (
        <PhoneNumberText address={address} className="mt-3" />
      )}
    </div>
  </div>
);

interface MoneyProps {
  position?: "center" | "end";
  amount: number;
  currencyCode: CurrencyCode;
}

const Money: FC<MoneyProps> = ({ position = "end", amount, currencyCode }) => (
  <div
    className={clsx(
      "flex items-end gap-2",
      position === "center" ? "justify-center" : "justify-end"
    )}
  >
    <p className="font-semibold">
      <HydorgenMoney data={{ amount: amount.toString(), currencyCode }} />
    </p>
    <p className="text-xs self-end">税込</p>
  </div>
);
