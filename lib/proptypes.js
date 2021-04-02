import PropTypes from 'prop-types';

const stores = PropTypes.arrayOf(PropTypes.shape({
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  isCurrent: PropTypes.bool.isRequired,
}));

const product = PropTypes.shape({
  url: PropTypes.string,
  name: PropTypes.string.isRequired,
  articul: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  size_line: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
});

const products = PropTypes.arrayOf(product);

export default {
  ...PropTypes,
  stores,
  product,
  products,
};
