import { FC, useState } from "react";
import { useCart } from "@shopify/hydrogen";
import { Responsive } from "../Responsive.client";
import { SideMenu } from "./SideMenu.client";
import { Link } from "../Link.client";
import { ReactComponent as Logo } from "../../assets/logo/cocopet.svg";
import { ReactComponent as Mail } from "../../assets/icon/mail.svg";
import { ReactComponent as Search } from "../../assets/icon/search.svg";
import { ReactComponent as Member } from "../../assets/icon/member.svg";
import { ReactComponent as Cart } from "../../assets/icon/cart.svg";
import { ReactComponent as Tel } from "../../assets/icon/tel.svg";
import { ReactComponent as Category } from "../../assets/icon/category.svg";
import { ReactComponent as Scene } from "../../assets/icon/scene.svg";
import { ReactComponent as PhotoGoods } from "../../assets/icon/photogoods.svg";
import { ReactComponent as Menu } from "../../assets/icon/menu.svg";
import { SearchModal } from "../../features/search/SearchModal.client";

interface Props {
  totalQuantity: number;
}

export const Header: FC = () => {
  const { totalQuantity } = useCart();

  const props = {
    totalQuantity,
  };

  return (
    <Responsive desktop={DesktopHeader} mobile={MobileHeader} props={props} />
  );
};

const DesktopHeader: FC<Props> = ({ totalQuantity }) => {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <div className="pb-[178px]">
      <header className="bg-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] fixed w-full z-50">
        <div className="bg-brand py-1">
          <div className="wrapper flex justify-between text-white text-sm font-semibold">
            <p>ペットのメモリアルグッズ COCO PET</p>
            <p>新規会員登録で10%OFFクーポン</p>
            <Link route="url" url="https://cocopet.jp/">
              ペット葬儀のCOCO PETはこちら
            </Link>
          </div>
        </div>
        <div className="mt-2">
          <div className="wrapper flex justify-between">
            <div>
              <ul className="flex gap-x-6 text-sm mb-2 font-semibold">
                <li>
                  <Link route="about">COCO PETとは</Link>
                </li>
                <li>
                  <Link route="news">お知らせ</Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-row  items-center gap-x-6">
              <div className="flex flex-row items-center gap-x-2">
                <div className="text-[12px] text-right">
                  <p>お問合せ</p>
                  <p>平日9:00-18:00</p>
                </div>
                <Tel />
                <p className="text-2xl font-semibold">03-1234-5678</p>
              </div>
              <ul className="flex flex-row gap-x-6">
                <li>
                  <Link route="contact">
                    <Mail />
                  </Link>
                </li>
                <li>
                  <button onClick={() => setOpenSearch(true)}>
                    <Search />
                  </button>
                </li>
                <li>
                  <Link route="account">
                    <Member />
                  </Link>
                </li>
                <li>
                  <Link route="cart">
                    <Cart />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="wrapper flex justify-center mb-4">
          <Link route="home">
            <Logo />
          </Link>
        </div>
        <nav className="py-2 border-t border-lightGray">
          <div className="wrapper font-semibold">
            <ul className="flex justify-center gap-x-12">
              <li>
                <Link route="categories">カテゴリーから探す</Link>
              </li>
              <li>
                <Link route="categories">シーンから探す</Link>
              </li>
              <li>
                <Link route="categories">写真・名入れグッズ</Link>
              </li>
              <li>
                <Link route="features">特集</Link>
              </li>
              <li>
                <Link route="ranking">ランキング</Link>
              </li>
              <li>
                <Link route="guides">ご利用ガイド</Link>
              </li>
            </ul>
          </div>
        </nav>
        <SearchModal open={openSearch} onClose={() => setOpenSearch(false)} />
      </header>
    </div>
  );
};

const MobileHeader: FC<Props> = ({ totalQuantity }) => {
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <div className="pb-[141px]">
      <header className="bg-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] fixed w-full z-50">
        <div className="bg-brand py-1">
          <p className="text-white text-sm text-center">新規会員登録で10%OFF</p>
        </div>
        <div className="flex items-center justify-between px-4 py-1">
          <div className="w-24">
            <div>
              <button onClick={() => setOpenSearch(true)}>
                <Search />
              </button>
            </div>
            <div />
          </div>
          <div className=" flex flex-col items-center">
            <Link route="home">
              <Logo width={140} />
            </Link>
          </div>
          <div className="flex flex-row items-center gap-x-4 w-24 justify-end">
            <div>
              <Link route="account">
                <Member />
              </Link>
            </div>
            <div>
              <Link route="cart">
                <Cart />
              </Link>
            </div>
          </div>
        </div>
        <nav className="py-2 border-t border-lightGray">
          <div className="font-semibold text-xs">
            <ul className="flex justify-center gap-x-12">
              <li>
                <Link route="categories" className="flex flex-col items-center">
                  <Category width={20} />
                  <p className="mt-1">カテゴリー</p>
                </Link>
              </li>
              <li>
                <Link route="categories" className="flex flex-col items-center">
                  <Scene width={20} />
                  <p className="mt-1">シーン</p>
                </Link>
              </li>
              <li>
                <Link route="categories" className="flex flex-col items-center">
                  <PhotoGoods width={20} />
                  <p className="mt-1">写真・名入れ</p>
                </Link>
              </li>
              <li>
                <div
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => setOpen(true)}
                >
                  <Menu width={20} />
                  <a className="mt-1">メニュー</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <SideMenu open={open} onClose={() => setOpen(false)} />
        <SearchModal open={openSearch} onClose={() => setOpenSearch(false)} />
      </header>
    </div>
  );
};
