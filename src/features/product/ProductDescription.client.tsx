import { FC } from "react";
import { gql, DocumentType } from "../../gql/index";

const ProductDescriptionFragment = gql(`
  fragment ProductDescription on Product {
    descriptionHtml
  }
`);

interface Props {
  product: DocumentType<typeof ProductDescriptionFragment>;
}

export const ProductDescription: FC<Props> = ({ product }) => (
  <section>
    <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
  </section>
);
