import dayjs from "dayjs";
import { FC } from "react";
import { SubHeading } from "../../components/SubHeading.client";
import { DocumentType, gql } from "../../gql/index";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { ReactComponent as ArrowRight } from "../../assets/icon/arrow_right.svg";
import { LinkButton } from "../../components/buttons/LinkButton.client";
import clsx from "clsx";
import { Link } from "../../components/Link.client";

const NewsFragment = gql(`
  fragment News on ArticleConnection {
    nodes {
      title
      publishedAt
    }
  } 
`);

interface Props {
  news: DocumentType<typeof NewsFragment>;
}

export const News: FC<Props> = ({ news }) => {
  const isDesktop = useIsDesktop();

  return (
    <div>
      <div className="mb-3">
        <SubHeading title="NEWS" subTitle="お知らせ" />
      </div>
      <div className={clsx("mb-5", isDesktop ? "" : "px-5")}>
        {news.nodes.map((newsItem, i) => (
          <NewsItem key={i} newsItem={newsItem} />
        ))}
      </div>
      <div className="flex justify-center">
        <Link route="news">
          <LinkButton title="全てのお知らせ" />
        </Link>
      </div>
    </div>
  );
};

interface NewsItemProps {
  newsItem: DocumentType<typeof NewsFragment>["nodes"][number];
}

export const NewsItem: FC<NewsItemProps> = ({ newsItem }) => {
  const isDesktop = useIsDesktop();
  const date = dayjs(new Date(newsItem.publishedAt));

  return (
    <div className="border-b border-solid border-lightGray pt-6 first:pt-0 pb-6">
      <Link route="news">
        <div
          className={clsx(
            "grid grid-cols-12",
            isDesktop ? "grid-cols-12" : "grid-cols-10"
          )}
        >
          <div
            className={clsx(
              "font-outfit self-center border-r-2 border-solid border-brand",
              isDesktop ? "col-span-2 ml-3" : "col-span-3"
            )}
          >
            <p>{date.format("YYYY")}</p>
            <p className="text-xl">{date.format("MMM. DD")}</p>
          </div>
          <div
            className={clsx(
              "self-start ml-4",
              isDesktop ? "col-span-9" : "col-span-7"
            )}
          >
            <p>{newsItem.title}</p>
          </div>
          {isDesktop && (
            <div className="col-span-1 self-end mb-3">
              <ArrowRight />
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};
