import { FC } from "react";
import { Responsive } from "../../components/Responsive.client";
import { DocumentType, gql } from "../../gql/index";
import Living from "../../assets/banner/living.png";
import { Link } from "../../components/Link.client";
import { ProductCard } from "../product/ProductCard.client";

const RecommendFragment = gql(`
  fragment Recommend on Collection {
    handle
    description
    products(first: 10) {
      nodes {
        ...ProductCard
      }
    }
  }
`);

interface Props {
  recommend: DocumentType<typeof RecommendFragment>;
}

export const Recommend: FC<Props> = (props) => (
  <Responsive
    desktop={DesktopRecommend}
    mobile={MobileRecommend}
    props={props}
  />
);

const DesktopRecommend: FC<Props> = ({ recommend }) => (
  <div className="w-[max(100%,1208px)] mx-auto bg-thinGray flex items-center gap-14">
    <div className="min-w-[600px]">
      <Link route="recommends">
        <img src={Living} width={600} alt="RECOMMEND" />
      </Link>
    </div>
    <div className="pt-16 pb-20 w-[calc(max(100%,1208px)-656px)]">
      <div className="flex items-end gap-4 mb-3">
        <p className="text-3xl font-outfit tracking-[1.8px]">RECOMMEND</p>
        <p className="font-bold">店長おすすめ</p>
      </div>
      <div className="mb-10">
        <p className="text-sm w-4/5">{recommend.description}</p>
      </div>
      <div className="flex gap-10 overflow-x-scroll">
        {recommend.products.nodes.map((product) => (
          <ProductCard
            key={product.id}
            imageSize={{ width: 200, heigth: 200 }}
            product={product}
            className="basis-[200px] min-w-[200px] last:mr-5"
          />
        ))}
      </div>
    </div>
  </div>
);

const MobileRecommend: FC<Props> = ({ recommend }) => (
  <div className="bg-thinGray pb-16">
    <div className="mb-12">
      <Link route="recommends">
        <img src={Living} width={600} alt="RECOMMEND" />
      </Link>
    </div>
    <div>
      <div className="mb-3 px-5">
        <p className="text-3xl font-outfit tracking-[1.8px]">RECOMMEND</p>
        <p className="font-bold">店長おすすめ</p>
      </div>
      <div className="mb-10 px-5">
        <p className="text-sm">{recommend.description}</p>
      </div>
      <div className="flex gap-10 overflow-x-scroll">
        {recommend.products.nodes.map((product) => (
          <ProductCard
            key={product.id}
            imageSize={{ width: 200, heigth: 200 }}
            product={product}
            className="basis-[200px] min-w-[200px] first:ml-5 last:mr-5"
          />
        ))}
      </div>
    </div>
  </div>
);
