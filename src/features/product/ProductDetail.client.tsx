import { FC } from "react";
import { ProductOptionsProvider } from "@shopify/hydrogen";
import { gql, DocumentType } from "../../gql/index";
import { Responsive } from "../../components/Responsive.client";
import { ProductMediaGallery } from "./ProductMediaGallery.client";
import { ProductForm } from "./ProductForm.client";
import { ProductDescription } from "./ProductDescription.client";
import { ProductRecommend } from "./ProductRecommend.client";

const ProductDetailFragment = gql(`
  fragment ProductDetail on Product {
    ...ProductDescription
    ...ProductForm
    ...ProductMedia
  }
`);

type Product = DocumentType<typeof ProductDetailFragment>;

interface Props {
  product: Product;
}

export const ProductDetail: FC<Props> = (props) => (
  <ProductOptionsProvider data={props.product}>
    <Responsive
      desktop={DesktopProductDetail}
      mobile={DesktopProductDetail}
      props={props}
    />
  </ProductOptionsProvider>
);

const DesktopProductDetail: FC<Props> = ({ product }) => (
  <div className="wrapper flex flex-row my-8">
    <div className="flex-1 mr-16">
      <ProductMediaGallery product={product} />
      <ProductDescription product={product} />
      <ProductRecommend />
    </div>
    <div className="w-[500px]">
      <ProductForm product={product} />
    </div>
  </div>
);
