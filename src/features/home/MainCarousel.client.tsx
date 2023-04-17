import { Carousel } from "../../components/Carousel.client";
import Main1 from "../../assets/banner/main01.png";
import Main2 from "../../assets/banner/main02.png";
import Main3 from "../../assets/banner/main03.png";

export const MainCarousel = () => (
  <Carousel>
    <div className="px-4">
      <img src={Main1} alt="バナー1" className="rounded-none" />
    </div>
    <div className="px-4">
      <img src={Main2} alt="バナー2" />
    </div>
    <div className="px-4">
      <img src={Main3} alt="バナー3" />
    </div>
  </Carousel>
);
