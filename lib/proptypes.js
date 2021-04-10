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

const banners = PropTypes.arrayOf(PropTypes.string);

const adminBanners = PropTypes.arrayOf(PropTypes.shape({
  storeCode: PropTypes.string.isRequired,
  bannerLinks: PropTypes.arrayOf(PropTypes.string).isRequired,
}));

const tabList = PropTypes.arrayOf(PropTypes.string);

const tabContentList = PropTypes.arrayOf(PropTypes.shape({
  key: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
}));

export default {
  ...PropTypes,
  stores,
  product,
  products,
  pagination,
  filters,
  banners,
  adminBanners,
  tabList,
  tabContentList,
};
