import clsx from "clsx";
import { FC } from "react";
import { Link } from "../../components/Link.client";
import { LinkButton } from "../../components/buttons/LinkButton.client";
import { Responsive } from "../../components/Responsive.client";
import { SubHeading } from "../../components/SubHeading.client";
import { DocumentType, gql } from "../../gql/index";
import { ProductCard } from "../product/ProductCard.client";

const RankingFragment = gql(`
  fragment Ranking on Collection {
    handle
    products(first: 5) {
      nodes {
        ...ProductCard
      }
    }
  }
`);

interface Props {
  ranking: DocumentType<typeof RankingFragment>;
  showAllLink?: boolean;
}

export const Ranking: FC<Props> = (props) => (
  <div className="bg-thinGray">
    <Responsive desktop={DesktopRanking} mobile={MobileRanking} props={props} />
  </div>
);

const DesktopRanking: FC<Props> = ({ ranking, showAllLink = true }) => (
  <div className="wrapper pt-16 pb-20">
    <div className="mb-4">
      <SubHeading title="RANKING" subTitle="総合ランキング" />
    </div>
    <div
      className={clsx("flex justify-center gap-10", showAllLink ? "mb-7" : "")}
    >
      {ranking.products.nodes.map((product, i) => (
        <ProductCard
          key={product.id}
          rank={i + 1}
          imageSize={{ width: 208, heigth: 208 }}
          product={product}
        />
      ))}
    </div>
    {showAllLink && (
      <div className="flex justify-center">
        <Link route="ranking">
          <LinkButton title="全てのランキング" subTitle="ALL" />
        </Link>
      </div>
    )}
  </div>
);

const MobileRanking: FC<Props> = ({ ranking, showAllLink = true }) => (
  <div className="pt-10 pb-16">
    <div className="mb-4">
      <SubHeading title="RANKING" subTitle="総合ランキング" />
    </div>
    <div
      className={clsx(
        "flex gap-10 overflow-x-scroll",
        showAllLink ? "mb-10" : ""
      )}
    >
      {ranking.products.nodes.map((product, i) => (
        <ProductCard
          key={product.id}
          rank={i + 1}
          imageSize={{ width: 208, heigth: 208 }}
          product={product}
          className="basis-[208px] min-w-[208px] first:ml-5 last:mr-5"
        />
      ))}
    </div>
    {showAllLink && (
      <div className="px-5">
        <Link route="ranking">
          <LinkButton title="全てのランキング" subTitle="ALL" />
        </Link>
      </div>
    )}
  </div>
);
