import { Image, Money } from "@shopify/hydrogen";
import { FC } from "react";
import clsx from "clsx";
import { DocumentType, gql } from "../../gql/index";
import { Link } from "../../components/Link.client";
import { ReactComponent as Ranking } from "../../assets/icon/ranking.svg";

const PriceFragment = gql(`
  fragment Price on MoneyV2 {
    amount
    currencyCode
  }
`);

const ProductCardFragment = gql(`
  fragment ProductCard on Product {
    id
    title
    handle
    featuredImage {
      altText
      url
    }
    tags
    availableForSale
    priceRange {
      minVariantPrice {
        ...Price
      }
    }
    collections(
      first: 10
    ) {
      nodes {
        title
      }
    }
  }
`);

interface Props {
  rank?: number;
  imageSize: {
    width: number;
    heigth: number;
  };
  product: DocumentType<typeof ProductCardFragment>;
  showTags?: boolean;
  className?: string;
  textFieldClassName?: string;
}

export const ProductCard: FC<Props> = ({
  rank,
  imageSize,
  product,
  showTags = false,
  className,
  textFieldClassName,
}) => (
  <Link route="product" handle={product.handle} className={className ?? ""}>
    <div className={clsx("relative", showTags ? "mb-4" : "mb-2")}>
      {product.featuredImage && (
        <Image
          className="mb-2"
          src={product.featuredImage.url}
          alt={product.featuredImage.url}
          width={imageSize.width}
          height={imageSize.width}
        />
      )}
      {!!rank && (
        <div className="absolute -top-1 left-2">
          <RankIcon rank={rank} />
        </div>
      )}
    </div>
    <div className={textFieldClassName ?? ""}>
      {showTags && (
        <div className="flex gap-2 flex-wrap mb-2">
          {product.tags.map((tag, i) => (
            <Tag title={tag} key={i} />
          ))}
        </div>
      )}
      <div className="mb-4">
        <p className="text-sm">{product.title}</p>
      </div>
      <div>
        <Price
          availableForSale={product.availableForSale}
          price={product.priceRange.minVariantPrice}
        />
      </div>
    </div>
  </Link>
);

interface PriceProps {
  availableForSale: boolean;
  price: DocumentType<typeof PriceFragment>;
}

const Price: FC<PriceProps> = ({ availableForSale, price }) => (
  <>
    {availableForSale ? (
      <div className="text-red">
        <p className="text-xs font-bold">期間限定価格</p>
        <div className="flex items-end gap-3">
          <div className="text-lg font-semibold">
            <Money data={price} />
          </div>
          <p className="text-xs">税込</p>
        </div>
      </div>
    ) : (
      <div className="flex items-end gap-3">
        <div className="text-lg font-semibold">
          <Money data={price} />
        </div>
        <p className="text-xs">税込</p>
      </div>
    )}
  </>
);

interface RankIconProps {
  rank: number;
}

const RankIcon: FC<RankIconProps> = ({ rank }) => (
  <div className="relative">
    <Ranking width={38} height={44} className="fill-gold" />
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-[26px] text-white">
      {rank}
    </div>
  </div>
);

const Tag: FC<{ title: string }> = ({ title }) => (
  <>
    {title === "new" ? (
      <div className="bg-accent flex justify-center px-2 py-1 rounded-[1px]">
        <p className="text-white text-sm">NEW!</p>
      </div>
    ) : (
      <div className="flex justify-center px-2 py-1 border border-solid border-lightGray rounded-[1px]">
        <p className="text-sm">{title}</p>
      </div>
    )}
  </>
);
