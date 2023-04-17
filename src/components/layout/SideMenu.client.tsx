import { FC } from "react";
import { Link } from "../../components/Link.client";
import { Drawer } from "../Drawer.client";
import { Menu } from "../../constants/Menu";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const SideMenu: FC<Props> = ({ open, onClose }) => (
  <Drawer position="right" open={open} onClose={onClose}>
    <div className="px-4">
      {Menu.flat().map((menu, i) => (
        <div className="mb-4" key={i}>
          <p className="font-semibold">
            {menu.title}
            <span className="text-xs ml-1">{menu.subTitle}</span>
          </p>
          <ul>
            {menu.items.map((item, i) => (
              <li key={i}>
                <Link {...item.route} className="text-sm text-gray">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </Drawer>
);
