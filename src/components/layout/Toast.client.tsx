import { FC, useState } from "react";
import { ReactComponent as Close } from "../../assets/icon/close.svg";

interface Props {
  text: string;
}

export const Toast: FC<Props> = ({ text }) => {
  const [isShown, setIsShown] = useState(true);
  const dismiss = () => setIsShown(false);

  return isShown ? (
    <div className="mx-full max-w-[600px] mx-auto mt-4 px-4">
      <div className="flex p-4 bg-red-100 border border-red-200 text-sm text-red-500 rounded-md shadow-md">
        <p>{text}</p>
        <Close onClick={dismiss} className="ml-auto cursor-pointer" />
      </div>
    </div>
  ) : null;
};
