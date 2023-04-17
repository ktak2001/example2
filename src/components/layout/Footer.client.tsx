import { FC } from "react";
import { Link } from "../../components/Link.client";
import { Responsive } from "../Responsive.client";
import { Menu } from "../../constants/Menu";
import { Collapse } from "../Collapse.client";
import { LinkButton } from "../buttons/LinkButton.client";
import { ReactComponent as Logo } from "../../assets/logo/cocopet.svg";
import { ReactComponent as Logo2 } from "../../assets/logo/cocopet2.svg";
import { ReactComponent as Mail } from "../../assets/icon/mail.svg";
import { ReactComponent as Tel } from "../../assets/icon/tel.svg";
import { ReactComponent as Instagram } from "../../assets/icon/instagram.svg";
import { ReactComponent as Twitter } from "../../assets/icon/twitter.svg";
import { ReactComponent as Line } from "../../assets/icon/line.svg";

export const Footer: FC = () => (
  <Responsive desktop={DesktopFooter} mobile={MobileFooter} />
);

const DesktopFooter: FC = () => (
  <footer>
    <div className="bg-brand py-8">
      <div className="wrapper text-white">
        <p className="text-center text-lg font-semibold">
          <span className="text-3xl">CONTACT</span>お問合わせ
        </p>
        <div className="flex flex-row justify-center mt-4">
          <div className="flex flex-col items-center mr-12">
            <div className="flex flex-col items-center border border-white px-20 py-2">
              <p>メールでのお問い合わせ</p>
              <div className="flex flex-row items-center">
                <Mail className="fill-white mr-2" />
                <p className="text-2xl font-semibold">CONTACT FORM</p>
              </div>
            </div>
            <p className="text-sm mt-2">info@dummy.com</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center border border-white px-20 py-2">
              <p>お電話でのお問い合わせ</p>
              <div className="flex flex-row items-center">
                <Tel className="fill-white mr-2" />
                <p className="text-2xl font-semibold">03-1234-5678</p>
              </div>
            </div>
            <p className="text-sm mt-2">受付時間：平日9:00-18:00</p>
          </div>
        </div>
      </div>
    </div>
    <div className="py-8">
      <div className="wrapper flex flex-row items-center justify-center">
        <p className="text-2xl mr-4">FOLLOW US</p>
        <Link route="url" url="https://instagram.com" className="mr-4">
          <Instagram width={30} />
        </Link>
        <Link route="url" url="https://twitter.com" className="mr-4">
          <Twitter width={30} />
        </Link>
        <Link route="url" url="https://line.com">
          <Line width={30} />
        </Link>
      </div>
    </div>
    <div className="bg-background py-12">
      <div className="wrapper grid grid-cols-4 gap-4 flex-col">
        {Menu.map((section, i) => (
          <div key={i}>
            {section.map((menu, j) => (
              <div key={j}>
                <p className="border-b border-black font-semibold pb-1">
                  <span className="text-xs mr-2">{menu.subTitle}</span>
                  {menu.title}
                </p>
                <ul className="my-4">
                  {menu.items.map((item, k) => (
                    <li key={k} className="mb-2">
                      <Link {...item.route} className="text-sm">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
        <div>
          <div className="border-b border-black flex flex-col items-center pt-4 pb-8">
            <Logo />
            <Link route="contact">
              <LinkButton title="お問合せ" className="mt-4" />
            </Link>
            <div className="flex flex-row mt-2">
              <Mail className="mr-2" />
              <p>info@dummy.com</p>
            </div>
            <div className="flex flex-row mt-2">
              <Tel className="mr-2" />
              <p className="text-xl">03-1234-5678</p>
            </div>
            <p className="text-sm">受付時間：平日9:00-18:00</p>
          </div>
          <div className="flex flex-col items-center pt-8 pb-4">
            <p className="font-semibold">ペットの葬儀はこちら</p>
            <Logo2 className="mt-2" />
            <Link route="url" url="https://cocopet.jp">
              <LinkButton title="ペットの火葬と葬儀" className="mt-4" />
            </Link>
            <div className="flex flex-row mt-2">
              <Tel className="mr-2" />
              <p className="text-xl">03-1234-5678</p>
            </div>
            <p className="text-sm">受付時間：24時間365日対応</p>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-brand py-2">
      <div className="wrapper">
        <p className="text-white text-sm text-center">Copyright Ⓒ COCO PET</p>
      </div>
    </div>
  </footer>
);

const MobileFooter: FC = () => (
  <footer>
    <div className="bg-brand py-8">
      <div className="text-white">
        <p className="text-center text-lg font-semibold">
          <span className="text-3xl">CONTACT</span>お問合わせ
        </p>
        <div className="mt-4 px-4">
          <div className="">
            <div className="flex flex-col items-center border border-white px-20 py-2">
              <p className="text-sm">メールでのお問い合わせ</p>
              <div className="flex flex-row items-center">
                <Mail className="fill-white mr-2" />
                <p className="text-lg">CONTACT FORM</p>
              </div>
            </div>
            <p className="text-sm text-center mt-2">info@dummy.com</p>
          </div>
          <div className="mt-6">
            <div className="flex flex-col items-center border border-white px-20 py-2">
              <p className="text-sm">お電話でのお問い合わせ</p>
              <div className="flex flex-row items-center">
                <Tel className="fill-white mr-2" />
                <p className="text-lg">03-1234-5678</p>
              </div>
            </div>
            <p className="text-sm text-center mt-2">受付時間：平日9:00-18:00</p>
          </div>
        </div>
      </div>
    </div>
    <div className="py-8">
      <p className="text-lg text-center">FOLLOW US</p>
      <div className="flex flex-row justify-center mt-2">
        <Link route="url" url="https://instagram.com" className="mr-4">
          <Instagram width={30} />
        </Link>
        <Link route="url" url="https://twitter.com" className="mr-4">
          <Twitter width={30} />
        </Link>
        <Link route="url" url="https://line.com">
          <Line width={30} />
        </Link>
      </div>
    </div>
    <div>
      {Menu.map((section) =>
        section.map((menu, i) => (
          <div key={i}>
            <Collapse
              header={
                <p className="text-left font-semibold text-sm">
                  <span className="text-xs mr-2">{menu.subTitle}</span>
                  {menu.title}
                </p>
              }
            >
              <ul className="px-4 mb-4">
                {menu.items.map((item, j) => (
                  <li key={j} className="my-2">
                    <Link {...item.route} className="text-sm">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Collapse>
          </div>
        ))
      )}
    </div>
    <div className="px-4">
      <div className="border-b border-black flex flex-col items-center py-8">
        <Logo />
        <Link route="contact">
          <LinkButton title="お問合せ" className="mt-4" />
        </Link>
        <div className="flex flex-row mt-2">
          <Mail className="mr-2" />
          <p>info@dummy.com</p>
        </div>
        <div className="flex flex-row mt-2">
          <Tel className="mr-2" />
          <p className="text-xl">03-1234-5678</p>
        </div>
        <p className="text-sm">受付時間：平日9:00-18:00</p>
      </div>
      <div className="flex flex-col items-center py-8">
        <p className="font-semibold">ペットの葬儀はこちら</p>
        <Logo2 className="mt-2" />
        <Link route="url" url="https://cocopet.jp">
          <LinkButton title="ペットの火葬と葬儀" className="mt-4" />
        </Link>
        <div className="flex flex-row mt-2">
          <Tel className="mr-2" />
          <p className="text-xl">03-1234-5678</p>
        </div>
        <p className="text-sm">受付時間：24時間365日対応</p>
      </div>
    </div>
    <div className="bg-brand py-2">
      <p className="text-white text-sm text-center">Copyright Ⓒ COCO PET</p>
    </div>
  </footer>
);
