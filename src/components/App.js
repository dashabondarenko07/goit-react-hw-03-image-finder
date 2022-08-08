import { Component } from 'react';
import * as API from '../services/api';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { Box } from './App.styled';

export class App extends Component {
  state = {
    search: '',
    images: [],
    isLoading: false,
    page: 1,
    showModal: false,
    largeImageURL: null,
    error: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        const images = await API.getImages(search, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
        }));
        if (images.length === 0) {
          alert(`No results found for '${search}'`);
        }
      } catch (error) {
        this.setState({ error: true });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }
  toggleShowModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: null,
    }));
  };
  getLargeImageURL = largeImageURL => {
    this.setState({ largeImageURL });
  };
  handleSubmit = search => {
    this.setState({ search, page: 1, images: [] });
  };
  handleClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isLoading, largeImageURL, search, error } = this.state;
    return (
      <Box>
        <Searchbar onSubmit={this.handleSubmit} />
        {error && (
          <p>Ouch! Something went wrong: Reload the page and try again once.</p>
        )}
        {images.length > 0 && (
          <ImageGallery images={images} onClick={this.getLargeImageURL} />
        )}
        {images.length !== 0 && (
          <Button onClick={this.handleClick}>Load more</Button>
        )}
        {largeImageURL && (
          <Modal onClick={this.toggleShowModal}>
            <img src={largeImageURL} alt={search} />
          </Modal>
        )}
        {isLoading && <Loader />}
      </Box>
    );
  }
}
