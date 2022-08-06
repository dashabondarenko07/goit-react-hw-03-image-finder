import { Component } from 'react';
import PropTypes from 'prop-types';

import { RiSearchLine } from 'react-icons/ri';
import {
  SearchbarBox,
  Form,
  Button,
  ButtonLabel,
  Input,
} from './Searchbar.styled.js';

export class Searchbar extends Component {
  state = {
    search: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      search: e.target.elements.search.value,
    });

    this.props.onSubmit(e.target.elements.search.value);
    e.target.reset();
  };
  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div>
        <SearchbarBox>
          <Form onSubmit={this.handleSubmit}>
            <Button type="submit">
              <RiSearchLine></RiSearchLine>
              <ButtonLabel>Search</ButtonLabel>
            </Button>

            <Input
              type="text"
              onChange={this.handleChange}
              value={this.state.search}
              name="search"
              autocomplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </Form>
        </SearchbarBox>
      </div>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
