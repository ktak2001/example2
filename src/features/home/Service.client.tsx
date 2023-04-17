import { SubHeading } from "../../components/SubHeading.client";
import Top04 from "../../assets/banner/top04.png";
import Top05 from "../../assets/banner/top05.png";
import { Link } from "../../components/Link.client";
import { useIsDesktop } from "../../hooks/useIsDesktop";

export const Service = () => {
  const isDesktop = useIsDesktop();

  return (
    <div className={isDesktop ? "" : "px-5"}>
      <div className="mb-3">
        <SubHeading title="SERVICE" subTitle="各種サービスご案内" />
      </div>
      <div className={isDesktop ? "grid grid-cols-2 gap-7" : ""}>
        <div className={isDesktop ? "" : "mb-10"}>
          <div className="mb-4">
            <Link route="url" url="https://cocopet.jp/">
              <img src={Top04} alt="お骨のパウダー加工・粉骨" />
            </Link>
          </div>
          <div>
            <p className="font-bold mb-2">お骨のパウダー加工・粉骨</p>
            <p className="text-sm">
              ペット葬儀も行っているCOCO PETだから、粉骨は自社で大事に行います。
            </p>
          </div>
        </div>
        <div>
          <div className="mb-4">
            <Link route="url" url="https://cocopet.jp/">
              <img src={Top05} alt="ペットの葬儀" />
            </Link>
          </div>
          <div>
            <p className="font-bold mb-2">ペットの葬儀</p>
            <p className="text-sm">
              COCO
              PETの葬儀サイトはこちら。24時間365日、葬儀のご相談ご依頼を受け付けております。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
