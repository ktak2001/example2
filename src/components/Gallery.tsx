import { FC } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

interface Props {
  images: {
    original: string;
    thumbnail: string;
  }[];
}

export const Gallery: FC<Props> = ({ images }) => (
  <ImageGallery
    items={images}
    autoPlay={true}
    showPlayButton={false}
    showFullscreenButton={true}
  />
);
