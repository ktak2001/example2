import { FC } from "react";
import { clsx } from "clsx";
import { ReactComponent as ArrowRight } from "../../assets/icon/arrow_right.svg";
import { useIsDesktop } from "../../hooks/useIsDesktop";

interface Props {
  title: string;
  subTitle?: string;
  className?: string;
  size?: "small" | "default";
}

export const LinkButton: FC<Props> = ({ size = "default", ...props }) => {
  const isDesktop = useIsDesktop();

  return isDesktop ? (
    <DesktopLinkButton {...props} />
  ) : size === "default" ? (
    <MobileLinkDefaultButton {...props} />
  ) : (
    <MobileLinkSmallButton {...props} />
  );
};

const DesktopLinkButton: FC<Omit<Props, "size">> = ({
  title,
  subTitle,
  className,
}) => (
  <div className={clsx("px-24 py-3 bg-dark", className)}>
    <div className="flex justify-center items-center gap-2">
      {!!subTitle && (
        <p className="text-white text-xs leading-[16px] tracking-[0.65px] font-semibold">
          {subTitle}
        </p>
      )}
      <p className="text-white leading-[20px]">{title}</p>
      <ArrowRight className="fill-white" />
    </div>
  </div>
);

const MobileLinkDefaultButton: FC<Omit<Props, "size">> = ({
  title,
  subTitle,
  className,
}) => (
  <div className={clsx("bg-dark", className)}>
    <div className="px-9 py-3">
      <div className="flex justify-center items-center gap-2">
        {!!subTitle && (
          <p className="text-white text-xs leading-[16px] tracking-[0.65px] font-semibold">
            {subTitle}
          </p>
        )}
        <p className="text-white leading-[20px]">{title}</p>
        <ArrowRight className="fill-white" />
      </div>
    </div>
  </div>
);

const MobileLinkSmallButton: FC<Omit<Props, "size">> = ({
  title,
  subTitle,
  className,
}) => (
  <div className={clsx("py-4 bg-dark", className)}>
    <div className="flex justify-center">
      <div className="flex flex-col items-center">
        {!!subTitle && (
          <p className="text-white text-xs leading-[16px] tracking-[0.65px] font-semibold">
            {subTitle}
          </p>
        )}
        <p className="text-white leading-[20px] mb-1">{title}</p>
        <ArrowRight className="fill-white" />
      </div>
    </div>
  </div>
);
