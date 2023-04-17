import Coupon from "../../assets/banner/coupon.png";
import { ReactComponent as Logo } from "../../assets/logo/cocopet.svg";
import { Link } from "../../components/Link.client";
import { LinkButton } from "../../components/buttons/LinkButton.client";
import { Responsive } from "../../components/Responsive.client";

export const About = () => (
  <Responsive desktop={DesktopAbout} mobile={MobileAbout} />
);

const DesktopAbout = () => (
  <div className="wrapper flex justify-center">
    <div className="flex flex-col gap-9">
      <div className="flex items-center gap-10">
        <div>
          <img src={Coupon} width={584} alt="クーポン" />
        </div>
        <div>
          <h1>
            <Logo className="mb-3" />
            <p className="text-lg font-semibold">
              ペットのご葬儀とメモリアルグッズのココペット
            </p>
          </h1>
          <p className="text-sm mb-7">
            今日あたりもう着くころなんだか鼻がなりました。けどここ海じゃないんですそうそうここはコロラドの高原じゃなかったろうか。
            <br />
            <br />
            向こうの青い森の中の三角標はちょうどさそりの形にならんで、野原いっぱいに光って。
          </p>
          <div className="flex gap-5">
            <Link route="products">
              <LinkButton title="全ての商品" subTitle="ALL" className="px-7" />
            </Link>
            <Link route="register">
              <LinkButton title="会員登録はこちら" className="px-7" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MobileAbout = () => (
  <div className="px-5">
    <div className="mb-5">
      <img src={Coupon} alt="クーポン" />
    </div>
    <div className="mb-14">
      <h1>
        <Logo className="mb-3" />
        <p className="text-lg font-semibold">
          ペットのご葬儀とメモリアルグッズのココペット
        </p>
      </h1>
      <p className="text-sm mb-7">
        今日あたりもう着くころなんだか鼻がなりました。けどここ海じゃないんですそうそうここはコロラドの高原じゃなかったろうか。
        <br />
        <br />
        向こうの青い森の中の三角標はちょうどさそりの形にならんで、野原いっぱいに光って。
      </p>
      <Link route="products">
        <LinkButton title="全ての商品" subTitle="ALL" className="w-full mb-5" />
      </Link>
      <Link route="register">
        <LinkButton title="会員登録はこちら" className="w-full" />
      </Link>
    </div>
  </div>
);
