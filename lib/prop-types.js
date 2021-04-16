import _PropTypes from 'prop-types';

const PropTypes = { ..._PropTypes };

PropTypes.stores = PropTypes.arrayOf(PropTypes.shape({
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
}));

PropTypes.product = PropTypes.shape({
  url: PropTypes.string,
  name: PropTypes.string.isRequired,
  articul: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  size_line: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
});

PropTypes.products = PropTypes.arrayOf(PropTypes.product);

PropTypes.pagination = PropTypes.shape({
  pageNum: PropTypes.number.isRequired,
  pagesCount: PropTypes.number.isRequired,
});

PropTypes.filter = PropTypes.arrayOf(PropTypes.string);

PropTypes.filters = PropTypes.shape({
  auditory: PropTypes.filter,
  type: PropTypes.filter,
});

PropTypes.banners = PropTypes.arrayOf(PropTypes.string);

PropTypes.adminBanners = PropTypes.arrayOf(PropTypes.shape({
  storeCode: PropTypes.string.isRequired,
  bannerLinks: PropTypes.arrayOf(PropTypes.string).isRequired,
}));

PropTypes.tabList = PropTypes.arrayOf(PropTypes.string);

PropTypes.tabContentList = PropTypes.arrayOf(PropTypes.shape({
  key: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
}));

PropTypes.productData = PropTypes.shape({
  name: PropTypes.string.isRequired,
});

PropTypes.productPhotos = PropTypes.arrayOf(PropTypes.string);

PropTypes.coordinates = PropTypes.arrayOf(PropTypes.number.isRequired);

PropTypes.map = PropTypes.shape({
  coordinates: PropTypes.coordinates.isRequired,
  zoom: PropTypes.number.isRequired,
});

PropTypes.contacts = PropTypes.shape({
  address: PropTypes.string.isRequired,
  map: PropTypes.map.isRequired,
});

PropTypes.photos = PropTypes.arrayOf(PropTypes.string.isRequired);

export default PropTypes;
