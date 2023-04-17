import { SubHeading } from "../../components/SubHeading.client";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import Feature01 from "../../assets/banner/feature01.png";
import Feature02 from "../../assets/banner/feature02.png";
import Feature03 from "../../assets/banner/feature03.png";
import { Link } from "../../components/Link.client";
import { ReactComponent as ArrowRight } from "../../assets/icon/arrow_right.svg";
import { Responsive } from "../../components/Responsive.client";

export const Features = () => {
  const isDesktop = useIsDesktop();

  return (
    <div className="bg-attention">
      <div className={isDesktop ? "wrapper py-16" : "pt-14 pb-16 px-5"}>
        <div className={isDesktop ? "mb-1" : "mb-4"}>
          <SubHeading title="FEATURE" subTitle="おすすめ特集" />
        </div>
        <div className="mb-4">
          <p className="text-center text-sm">
            ペットのご供養やご葬儀、ペットに関するお役立ち情報をお届け。
          </p>
        </div>
        <div
          className={
            isDesktop
              ? "flex justify-center gap-10 mb-9"
              : "flex flex-col gap-10 mb-10"
          }
        >
          <div>
            <div className="mb-3">
              <img src={Feature01} alt="特集1" />
            </div>
            <div className="">
              <p className="text-xs font-outfit mb-1">COORDINATE No.12</p>
              <p className="font-bold mb-4">クリスマスを一緒に過ごそう</p>
              <p className="text-sm">
                テキストDUMMY
                今日あたりもう着くころなんだか鼻がなりました。けどここ海じゃないんですそうそうここは
              </p>
            </div>
          </div>
          <div>
            <div className="mb-3">
              <img src={Feature02} alt="特集2" />
            </div>
            <div className="">
              <p className="text-xs font-outfit mb-1">COORDINATE No.12</p>
              <p className="font-bold mb-4">クリスマスを一緒に過ごそう</p>
              <p className="text-sm">
                テキストDUMMY
                今日あたりもう着くころなんだか鼻がなりました。けどここ海じゃないんですそうそうここは
              </p>
            </div>
          </div>
          <div>
            <div className="mb-3">
              <img src={Feature03} alt="特集3" />
            </div>
            <div className="">
              <p className="text-xs font-outfit mb-1">COORDINATE No.12</p>
              <p className="font-bold mb-4">クリスマスを一緒に過ごそう</p>
              <p className="text-sm">
                テキストDUMMY
                今日あたりもう着くころなんだか鼻がなりました。けどここ海じゃないんですそうそうここは
              </p>
            </div>
          </div>
        </div>
        <div className={isDesktop ? "flex justify-center" : ""}>
          <Responsive desktop={DesktopLink} mobile={MobileLink} />
        </div>
      </div>
    </div>
  );
};

const DesktopLink = () => (
  <Link route="features">
    <div className="px-24 py-3 bg-white border border-solid border-dark">
      <div className="flex justify-center items-center gap-2">
        <p className="text-xs leading-[16px] tracking-[0.65px] font-semibold">
          ALL
        </p>
        <p className="leading-[20px]">全ての特集</p>
        <ArrowRight />
      </div>
    </div>
  </Link>
);

const MobileLink = () => (
  <Link route="features">
    <div className="bg-white border border-solid border-dark">
      <div className="px-9 py-3">
        <div className="flex justify-center items-center gap-2">
          <p className="text-xs leading-[16px] tracking-[0.65px] font-semibold">
            ALL
          </p>
          <p className="leading-[20px]">全ての特集</p>
          <ArrowRight />
        </div>
      </div>
    </div>
  </Link>
);
