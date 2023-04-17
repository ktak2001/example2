import clsx from "clsx";
import { FC } from "react";
import {
  RankingFragmentDoc,
  RecommendFragmentDoc,
  NewItemsFragmentDoc,
  NewsFragmentDoc,
} from "../../gql/graphql";
import { DocumentType } from "../../gql/index";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { Features } from "./Features.client";
import { CategoryList } from "../category/CategoryList.client";
import { Keywords } from "./Keywords.client";
import { MainCarousel } from "./MainCarousel.client";
import { NewItems } from "./NewItems.client";
import { Pickup } from "./Pickup.client";
import { Ranking } from "./Ranking.client";
import { Recommend } from "./Recommend.client";
import { About } from "./About.client";
import { News } from "./News.client";
import { Service } from "./Service.client";
import { Link } from "../../components/Link.client";
import { LinkButton } from "../../components/buttons/LinkButton.client";
import { SubHeading } from "../../components/SubHeading.client";

interface Props {
  recommend: DocumentType<typeof RecommendFragmentDoc>;
  ranking: DocumentType<typeof RankingFragmentDoc>;
  newItems: DocumentType<typeof NewItemsFragmentDoc>;
  news: DocumentType<typeof NewsFragmentDoc>;
}

export const Home: FC<Props> = ({ recommend, ranking, newItems, news }) => {
  const isDesktop = useIsDesktop();

  return (
    <>
      <div className="mt-4 mb-6">
        <MainCarousel />
      </div>
      <div className={clsx(isDesktop ? "mb-16" : "mb-10")}>
        <Keywords />
      </div>
      <div className={clsx(isDesktop ? "mb-24" : "mb-16")}>
        <About />
      </div>
      <div className={clsx(isDesktop ? "mb-24" : "mb-16")}>
        <Recommend recommend={recommend} />{" "}
      </div>
      <div className={clsx(isDesktop ? "mb-24" : "mb-16")}>
        <Pickup />
      </div>
      <div className={clsx(isDesktop ? "mb-24" : "mb-16")}>
        <Ranking ranking={ranking} />
      </div>
      <div className={clsx(isDesktop ? "mb-24" : "mb-20")}>
        <NewItems newItems={newItems} />
      </div>
      <div className={clsx(isDesktop ? "mb-24" : "mb-20")}>
        <div className={isDesktop ? "wrapper" : "px-5"}>
          <div className="mb-3">
            <SubHeading title="CATEGORY" subTitle="カテゴリー" />
          </div>
          <CategoryList />
          <div className={isDesktop ? "flex justify-center" : ""}>
            <Link route="categories">
              <LinkButton title="全てのカテゴリー" subTitle="ALL" />
            </Link>
          </div>
        </div>
      </div>
      <div className={clsx(isDesktop ? "mb-24" : "mb-20")}>
        <Features />
      </div>
      <div
        className={clsx(
          isDesktop ? "wrapper grid grid-cols-2 gap-14 mb-20" : "mb-14"
        )}
      >
        <div className={clsx(isDesktop ? "" : "mb-14")}>
          <News news={news} />
        </div>
        <div>
          <Service />
        </div>
      </div>
    </>
  );
};
