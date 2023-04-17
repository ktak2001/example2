import { FC } from "react";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { ReactComponent as ArrowRight } from "../../assets/icon/arrow_right.svg";
import { Guides } from "../../constants/Guides";
import { Link } from "../../components/Link.client";
import clsx from "clsx";

const GUIDE_HOME_ITEM: typeof Guides[number] = {
  name: "home",
  title: "ご利用ガイドHOME",
  description: "",
  route: {
    route: "guides",
  },
};

export const GuideMenu: FC = () => {
  const isDesktop = useIsDesktop();

  return (
    <div className="bg-link pt-5 pb-7">
      <div className="">
        <div className="flex justify-center items-center gap-4 text-white mb-3">
          <p className="text-2xl font-outfit tracking-[1.44px]">GUIDE</p>
          <p className="font-bold">ご利用ガイド</p>
        </div>
        <div
          className={clsx(
            "flex gap-5",
            isDesktop
              ? "justify-center flex-wrap mx-20"
              : "flex-col items-center"
          )}
        >
          <GuideMenuItem item={GUIDE_HOME_ITEM} />
          {Guides.map((item, i) => (
            <GuideMenuItem key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface GuideMenuItem {
  item: typeof Guides[number];
}

const GuideMenuItem: FC<GuideMenuItem> = ({ item }) => (
  <Link {...item.route}>
    <div className="bg-white w-44 py-1 flex justify-center items-center gap-1">
      <p className="font-outfit text-[13px] tracking-[0.39px]">{item.title}</p>
      <div className="mb-1">
        <ArrowRight width={13} height={5} />
      </div>
    </div>
  </Link>
);
