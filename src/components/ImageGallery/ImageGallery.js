import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, onClick }) => {
  return (
    <Gallery>
      {images.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          src={webformatURL}
          largeImageURL={largeImageURL}
          onClick={onClick}
        />
      ))}
    </Gallery>
  );
};
ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
