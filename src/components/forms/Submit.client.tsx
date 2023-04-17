import { FC } from "react";
import { clsx } from "clsx";
import { ReactComponent as ArrowRight } from "../../assets/icon/arrow_right.svg";
import { useIsDesktop } from "../../hooks/useIsDesktop";

interface Props {
  title: string;
  subTitle: string;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
  size?: "small" | "default";
}

export const Submit: FC<Props> = ({ size = "default", ...props }) => {
  const isDesktop = useIsDesktop();

  return isDesktop ? (
    <DesktopSubmit {...props} />
  ) : size === "default" ? (
    <MobileDefaultSubmit {...props} />
  ) : (
    <MobileSmallSubmit {...props} />
  );
};

const DesktopSubmit: FC<Omit<Props, "size">> = ({
  title,
  subTitle,
  disabled,
  className,
  buttonClassName,
}) => (
  <div className={className}>
    <button
      type="submit"
      disabled={disabled}
      className={clsx(
        "px-24 py-3",
        disabled ? "bg-dark/80" : "bg-dark",
        buttonClassName ?? ""
      )}
    >
      <div className="flex justify-center items-center gap-2">
        <p className="text-white text-[13px] leading-[16px] tracking-[0.65px] font-semibold">
          {subTitle}
        </p>
        <p className="text-white leading-[20px]">{title}</p>
        <ArrowRight className="fill-white" />
      </div>
    </button>
  </div>
);

const MobileDefaultSubmit: FC<Omit<Props, "size">> = ({
  title,
  subTitle,
  disabled,
  className,
  buttonClassName,
}) => (
  <div className={className}>
    <button
      type="submit"
      disabled={disabled}
      className={clsx(
        "px-9 py-3",
        disabled ? "bg-dark/80" : "bg-dark",
        buttonClassName ?? ""
      )}
    >
      <div className="flex justify-center items-center gap-2">
        <p className="text-white text-[13px] leading-[16px] tracking-[0.65px] font-semibold">
          {subTitle}
        </p>
        <p className="text-white leading-[20px]">{title}</p>
        <ArrowRight className="fill-white" />
      </div>
    </button>
  </div>
);

const MobileSmallSubmit: FC<Omit<Props, "size">> = ({
  title,
  subTitle,
  disabled,
  className,
  buttonClassName,
}) => (
  <div className={className}>
    <button
      type="submit"
      disabled={disabled}
      className={clsx(
        "px-9 py-3",
        disabled ? "bg-dark/80" : "bg-dark",
        buttonClassName ?? ""
      )}
    >
      <div className="flex justify-center">
        <div className="flex flex-col items-center">
          <p className="text-white text-[13px] leading-[16px] tracking-[0.65px] font-semibold">
            {subTitle}
          </p>
          <p className="text-white leading-[20px] mb-1">{title}</p>
          <ArrowRight className="fill-white" />
        </div>
      </div>
    </button>
  </div>
);
