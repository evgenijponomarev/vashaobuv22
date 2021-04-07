import PropTypes from 'prop-types';

const stores = PropTypes.arrayOf(PropTypes.shape({
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
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

const pagination = PropTypes.shape({
  pageNum: PropTypes.number.isRequired,
  pagesCount: PropTypes.number.isRequired,
});

const filter = PropTypes.arrayOf(PropTypes.string);

const filters = PropTypes.shape({
  auditory: filter,
  type: filter,
});

export default {
  ...PropTypes,
  stores,
  product,
  products,
  pagination,
  filters,
};
