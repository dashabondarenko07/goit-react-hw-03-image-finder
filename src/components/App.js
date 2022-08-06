import { Component } from 'react';
import api from './services/api';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';

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
      // try {
      this.setState({ loading: true });
      const data = await api(search, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        loading: false,
      }));
      // } catch (error) {
      // this.setState({ error: true, loading: false });
      // }
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
  showButton = () => {
    return (
      this.state.images.length !== 0 &&
      this.state.page * 12 <= this.state.images.length
    );
  };

  render() {
    const { images, isLoading, largeImageURL, search } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        {/* {error && (
          <p>
            Ouch! Something went wrong : Reload the page and try again once.
          </p>
        )} */}
        {(images.length !== 0 && (
          <ImageGallery images={images} onClick={this.getLargeImageURL} />
        )) ||
          (search.length !== 0 && (
            <p>
              Ouch! Something went wrong: Reload the page and try again once.
            </p>
          ))}
        {isLoading && <Loader />}
        {this.showButton() && (
          <Button onClick={this.handleClick}>Load more</Button>
        )}
        {largeImageURL && (
          <Modal onClick={this.toggleShowModal}>
            <img src={largeImageURL} alt={search} />
          </Modal>
        )}
      </>
    );
  }
}
