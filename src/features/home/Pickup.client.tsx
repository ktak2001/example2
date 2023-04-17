import { Link } from "../../components/Link.client";
import clsx from "clsx";
import { SubHeading } from "../../components/SubHeading.client";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import Top1 from "../../assets/banner/top01.png";
import Top2 from "../../assets/banner/top02.png";
import Top3 from "../../assets/banner/top03.png";

export const Pickup = () => {
  const isDesktop = useIsDesktop();

  return (
    <>
      <div className="mb-3">
        <SubHeading title="PICK UP" subTitle="ピックアップ" />
      </div>
      <div
        className={clsx(
          "flex justify-center gap-8",
          isDesktop ? "wrapper" : "flex-col px-5"
        )}
      >
        <Link route="feature" handle="">
          <img src={Top1} alt="トップイメージ1" />
        </Link>
        <Link route="feature" handle="">
          <img src={Top2} alt="トップイメージ2" />
        </Link>
        <Link route="feature" handle="">
          <img src={Top3} alt="トップイメージ3" />
        </Link>
      </div>
    </>
  );
};
