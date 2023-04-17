import { FC, ReactNode } from "react";
// @ts-expect-error @headlessui/react incompatibility with node16 resolution
import { Disclosure } from "@headlessui/react";
import clsx from "clsx";
import { ReactComponent as Cursor } from "../assets/icon/cursor_down.svg";

interface Props {
  header: ReactNode;
  children: ReactNode;
}

export const Collapse: FC<Props> = ({ header, children }) => (
  <Disclosure>
    {({ open }) => (
      <>
        <Disclosure.Button className="block w-full">
          <div
            className={clsx(
              "flex items-center justify-between border-b border-lightGray px-4 py-3",
              open ? "bg-background" : " bg-white"
            )}
          >
            {header}
            <Cursor className={open ? "rotate-180 transform" : ""} />
          </div>
        </Disclosure.Button>
        <Disclosure.Panel>{children}</Disclosure.Panel>
      </>
    )}
  </Disclosure>
);
