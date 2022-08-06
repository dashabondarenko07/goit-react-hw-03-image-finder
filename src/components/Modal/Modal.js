import { Component } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscClick);
  }
  componentWillUnmountt() {
    window.removeEventListener('keydown', this.handleEscClick);
  }

  handleEscClick = e => {
    if (e.code === 'Escape') {
      this.props.onClick();
    }
  };
  handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClick();
    }
  };

  render() {
    return (
      <Overlay onClick={this.handleOverlayClick}>
        <ModalWindow>{this.props.children}</ModalWindow>
      </Overlay>
    );
  }
}
Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
