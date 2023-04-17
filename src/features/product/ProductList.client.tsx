import clsx from "clsx";
import { FC } from "react";
import { Responsive } from "../../components/Responsive.client";
import { ProductCardFragmentDoc } from "../../gql/graphql";
import { DocumentType } from "../../gql/index";
import { ProductCard } from "./ProductCard.client";

interface Props {
  products: DocumentType<typeof ProductCardFragmentDoc>[];
  isRanking?: boolean;
}

export const ProductList: FC<Props> = (props) => (
  <Responsive
    desktop={DesktopProductList}
    mobile={MobileProductList}
    props={props}
  />
);

const DesktopProductList: FC<Props> = ({ products, isRanking }) => (
  <div className="wrapper flex justify-center flex-wrap gap-4">
    {products.map((product, i) => (
      <ProductCard
        key={i}
        product={product}
        imageSize={{ width: 272, heigth: 272 }}
        showTags
        rank={isRanking ? i : undefined}
      />
    ))}
  </div>
);

const MobileProductList: FC<Props> = ({ products, isRanking }) => (
  <div className="grid grid-cols-2">
    {products.map((product, i) => (
      <ProductCard
        key={i}
        imageSize={{ width: 272, heigth: 272 }}
        product={product}
        showTags
        className={clsx(
          "col-span-1 border-b border-solid border-lightGray pb-8 odd:border-r",
          [0, 1].includes(i) ? "border-t" : ""
        )}
        textFieldClassName="px-5"
        rank={isRanking ? i + 1 : undefined}
      />
    ))}
  </div>
);
