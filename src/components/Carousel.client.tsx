import { FC, ReactNode, useEffect, useState } from "react";
import Slider, { Settings } from "@ant-design/react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

interface Props {
  children: ReactNode;
}

export const Carousel: FC<Props> = ({ children }) => {
  const [innerWidth, setInnerWidth] = useState(0);

  const settings: Settings = {
    autoplay: true,
    arrows: false,
    autoplaySpeed: 4000,
    swipeToSlide: true,
    draggable: true,
    infinite: true,
    lazyLoad: "progressive",
    speed: 500,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: `${(innerWidth - 860) / 2}px`,
    responsive: [
      {
        breakpoint: 890,
        settings: {
          centerPadding: `${(innerWidth - 490) / 2}px`,
        },
      },
      {
        breakpoint: 520,
        settings: {
          centerPadding: "0px",
        },
      },
    ],
  };

  useEffect(() => {
    const updateSize = (): void => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return <Slider {...settings}>{children}</Slider>;
};
