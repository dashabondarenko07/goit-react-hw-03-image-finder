import { Btn } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onClick, children }) => {
  return (
    <Btn type="button" onClick={onClick}>
      {children}
    </Btn>
  );
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};
