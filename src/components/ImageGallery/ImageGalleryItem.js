import { Item, Image } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({  src, largeImageURL, onClick }) => {
  return (
    <Item >
      <Image src={src} alt="" onClick={() => onClick(largeImageURL)} />
    </Item>
  );
};
ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
