import clsx from "clsx";
import { FC } from "react";
import { Link } from "../../components/Link.client";
import { LinkButton } from "../../components/buttons/LinkButton.client";
import { Responsive } from "../../components/Responsive.client";
import { SubHeading } from "../../components/SubHeading.client";
import { DocumentType, gql } from "../../gql/index";
import { ProductCard } from "../product/ProductCard.client";

const NewItemsFragment = gql(`
  fragment NewItems on ProductConnection {
    nodes {
      ...ProductCard
    }
  }
`);

interface Props {
  newItems: DocumentType<typeof NewItemsFragment>;
}

export const NewItems: FC<Props> = (props) => (
  <Responsive desktop={DesktopNewItems} mobile={MobileNewItems} props={props} />
);

const DesktopNewItems: FC<Props> = ({ newItems }) => (
  <div className="wrapper">
    <div className="mb-4">
      <SubHeading title="NEW ITEM" subTitle="新着商品" />
    </div>
    <div className="flex justify-center gap-10 mb-7">
      {newItems.nodes.map((product) => (
        <ProductCard
          key={product.id}
          imageSize={{ width: 272, heigth: 272 }}
          product={product}
          showTags
          className="basis-[272px] min-w-[272px]"
        />
      ))}
    </div>
    <div className="flex justify-center">
      <Link route="products">
        <LinkButton title="全ての商品" subTitle="ALL" />
      </Link>
    </div>
  </div>
);

const MobileNewItems: FC<Props> = ({ newItems }) => (
  <div>
    <div className="mb-4">
      <SubHeading title="NEW ITEM" subTitle="新着商品" />
    </div>
    <div className="grid grid-cols-2 mb-10">
      {newItems.nodes.map((product, i) => (
        <ProductCard
          key={product.id}
          imageSize={{ width: 272, heigth: 272 }}
          product={product}
          showTags
          className={clsx(
            "col-span-1 border-b border-solid border-lightGray pb-8",
            i % 2 === 0 ? "border-r" : "",
            Math.floor(i / 2) === 0 ? "border-t" : ""
          )}
          textFieldClassName="px-5"
        />
      ))}
    </div>
    <div className="px-5">
      <Link route="products">
        <LinkButton title="全ての商品" subTitle="ALL" />
      </Link>
    </div>
  </div>
);
