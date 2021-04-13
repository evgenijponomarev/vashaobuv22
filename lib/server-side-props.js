import {
  getStores,
  getProductsPageData,
  getProductsFilters,
} from './data';

export function getProductsPageServerSideProps(query, params) {
  const {
    storeCode,
    page,
    auditory,
    type,
  } = query;

  const { is_new, extra_bonus } = params;

  const selectFilter = {
    ...(is_new ? { is_new } : null),
    ...(extra_bonus ? { extra_bonus } : null),
    ...(auditory ? { auditory: auditory.split(',') } : null),
    ...(type ? { type: type.split(',') } : null),
  };

  const stores = getStores();
  const { products, pagination } = getProductsPageData(storeCode, page, selectFilter);
  const filters = getProductsFilters(storeCode, params);

  return {
    props: {
      stores,
      products,
      pagination,
      filters,
    },
  };
}

export default {
  getProductsPageServerSideProps,
};
