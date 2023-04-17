import { FC } from "react";
import { Heading } from "../../components/Heading.client";
import { Guides } from "../../constants/Guides";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { ReactComponent as Shipping } from "../../assets/icon/shipping.svg";
import { ReactComponent as Card } from "../../assets/icon/card.svg";
import { ReactComponent as Order } from "../../assets/icon/order.svg";
import { ReactComponent as Guide } from "../../assets/icon/guide.svg";
import { ReactComponent as FAQ } from "../../assets/icon/faq.svg";
import { ReactComponent as ArrowRight } from "../../assets/icon/arrow_right.svg";
import { Link } from "../../components/Link.client";
import clsx from "clsx";
import { GuideMenu } from "./GuideMenu.client";

export const GuideTop: FC = () => {
  const isDesktop = useIsDesktop();

  return (
    <>
      <div className="mb-5">
        <Heading title="ご利用ガイド" subTitle="ご利用ガイド" />
      </div>
      <div className={clsx("pb-8", isDesktop ? "wrapper px-48" : "px-5")}>
        <p className="text-sm">
          テキストDUMMY
          今日あたりもう着くころなんだか鼻がになりました。けどここ海じゃないんですそうそうここはコロラドの高原じゃなかったろうか。向こうの青い森の中の三角標はちょうどさそりの形になった。
        </p>
      </div>
      <div
        className={clsx(
          "flex flex-wrap gap-10 justify-center mb-28",
          isDesktop ? "wrapper" : ""
        )}
      >
        {Guides.map((item, i) => (
          <GuideItem key={i} item={item} />
        ))}
      </div>
      <GuideMenu />
    </>
  );
};

interface GuideItemProps {
  item: typeof Guides[number];
}

const GuideItem: FC<GuideItemProps> = ({ item }) => (
  <div className="w-64 h-48 border border-solid border-dark relative">
    <Link {...item.route}>
      <div className="flex flex-col justify-center items-center pt-6 px-6 text-center w-full">
        <div className="mb-4 h-11 flex justify-center items-center">
          <GuideItemIcon name={item.name} />
        </div>
        <div className="text-lg font-bold mb-3">
          <p>{item.title}</p>
        </div>
        <div className="text-sm">
          <p>{item.description}</p>
        </div>
      </div>
      <div className="absolute -bottom-3 w-full flex justify-center">
        <div className="flex justify-center items-end gap-3 px-5 py-1 bg-dark text-white">
          <p className="font-outfit text-[10px] tracking-[1px]">MORE READ</p>
          <div className="mb-1">
            <ArrowRight fill="white" width={13} height={5} />
          </div>
        </div>
      </div>
    </Link>
  </div>
);

const GuideItemIcon: FC<{ name: string }> = ({ name }) => {
  switch (name) {
    case "shipping":
      return <Shipping />;
    case "payment":
      return <Card />;
    case "refunds":
    case "madeOrder":
      return <Order />;
    case "howto":
      return <Guide width={35} height={35} />;
    case "questions":
      return <FAQ />;
    default:
      return <></>;
  }
};
