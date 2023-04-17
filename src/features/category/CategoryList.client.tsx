import { Responsive } from "../../components/Responsive.client";
import Rectangle1 from "../../assets/category/rectangle1.png";
import Rectangle2 from "../../assets/category/rectangle2.png";
import Square1 from "../../assets/category/square1.png";
import Square2 from "../../assets/category/square2.png";
import Square3 from "../../assets/category/square3.png";
import Square4 from "../../assets/category/square4.png";
import Square5 from "../../assets/category/square5.png";
import { Link } from "../../components/Link.client";

export const CategoryList = () => (
  <Responsive desktop={DesktopCategoryList} mobile={MobileCategoryList} />
);

const DesktopCategoryList = () => (
  <>
    <div className="flex justify-center gap-7 mb-7">
      <Link route="category" handle="">
        <div>
          <img src={Square1} alt="カテゴリ1" />
        </div>
      </Link>
      <Link route="category" handle="">
        <div>
          <img src={Square2} alt="カテゴリ2" />
        </div>
      </Link>
      <Link route="category" handle="">
        <div>
          <img src={Square3} alt="カテゴリ3" />
        </div>
      </Link>
      <Link route="category" handle="">
        <div>
          <img src={Square4} alt="カテゴリ4" />
        </div>
      </Link>
      <Link route="category" handle="">
        <div>
          <img src={Square5} alt="カテゴリ5" />
        </div>
      </Link>
    </div>
    <div className="flex justify-center gap-10 mb-7">
      <Link route="category" handle="">
        <div>
          <img src={Rectangle1} alt="カテゴリ6" />
        </div>
      </Link>
      <Link route="category" handle="">
        <div>
          <img src={Rectangle2} alt="カテゴリ7" />
        </div>
      </Link>
    </div>
  </>
);

const MobileCategoryList = () => (
  <>
    <div className="grid grid-cols-4 place-items-center gap-2 mb-7">
      <Link route="category" handle="" className="col-span-2">
        <div>
          <img src={Square1} alt="カテゴリ1" />
        </div>
      </Link>
      <Link route="category" handle="" className="col-span-2">
        <div>
          <img src={Square2} alt="カテゴリ2" />
        </div>
      </Link>
      <Link route="category" handle="" className="col-span-2">
        <div>
          <img src={Square3} alt="カテゴリ3" />
        </div>
      </Link>
      <Link route="category" handle="" className="col-span-2">
        <div>
          <img src={Square4} alt="カテゴリ4" />
        </div>
      </Link>
      <div className="col-span-1"></div>
      <Link route="category" handle="" className="col-span-2">
        <div>
          <img src={Square5} alt="カテゴリ5" />
        </div>
      </Link>
    </div>
    <div className="flex flex-col gap-2 mb-7">
      <Link route="category" handle="">
        <div>
          <img src={Rectangle1} alt="カテゴリ6" />
        </div>
      </Link>
      <Link route="category" handle="">
        <div>
          <img src={Rectangle2} alt="カテゴリ7" />
        </div>
      </Link>
    </div>
  </>
);
