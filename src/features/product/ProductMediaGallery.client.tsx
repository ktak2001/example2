import { FC } from "react";
import { gql, DocumentType } from "../../gql/index";
import { MediaImage } from "../../gql/graphql";
import { Gallery } from "../../components/Gallery";

const ProductMediaFragment = gql(`
  fragment ProductMedia on Product {
    media(first: 10) {
      nodes {
        mediaContentType
        alt
        previewImage {
          url
        }
        ... on MediaImage {
          id
          image {
            url
            width
            height
          }
        }
      }
    }
  }
`);

interface Props {
  product: DocumentType<typeof ProductMediaFragment>;
}

export const ProductMediaGallery: FC<Props> = ({ product }) => (
  <section>
    <Gallery
      images={product.media.nodes
        .filter((media) => media.mediaContentType === "IMAGE")
        .map((media) => ({
          original: (media as MediaImage).image!.url as string,
          thumbnail: media.previewImage!.url as string,
        }))}
    />
  </section>
);
