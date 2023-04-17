// @ts-expect-error @headlessui/react incompatibility with node16 resolution
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { FC, Fragment, ReactNode } from "react";
import { ReactComponent as Close } from "../assets/icon/close.svg";

interface Props {
  position: "top" | "right";
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Drawer: FC<Props> = ({ position, open, onClose, children }) => (
  <Transition appear show={open} as={Fragment}>
    <Dialog as="div" className="relative z-50" onClose={onClose}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 left-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </Transition.Child>
      <div className="fixed inset-0">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={clsx(
              "fixed max-w-full",
              position === "top"
                ? "inset-x-0 top-0"
                : "inset-y-0 right-0 flex pl-10"
            )}
          >
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom={
                position === "top" ? "-translate-y-full" : "translate-x-full"
              }
              enterTo={position === "top" ? "translate-y-0" : "translate-x-0"}
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom={position === "top" ? "translate-y-0" : "translate-x-0"}
              leaveTo={
                position === "top" ? "-translate-y-full" : "translate-x-full"
              }
            >
              <Dialog.Panel
                className={clsx(
                  "transform text-left align-middle shadow-xl transition-all antialiased overflow-y-scroll bg-white",
                  position === "top" ? "w-screen" : "max-w-lg"
                )}
              >
                <header className="mx-4 mt-6 mb-4">
                  <button
                    type="button"
                    className="p-4 -m-4 transition"
                    onClick={onClose}
                  >
                    <Close />
                  </button>
                </header>
                <div>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </div>
    </Dialog>
  </Transition>
);
