import proptypes from '../../lib/proptypes';
import {
  getStores,
  getProductsPageData,
  getProductsFilters,
} from '../../lib/data';
import Layout from '../../components/layout';
import ProductList from '../../components/product-list';

export default function New({
  stores,
  products,
  pagination,
  filters,
}) {
  return (
    <Layout stores={stores}>
      <ProductList
        products={products}
        pagination={pagination}
        filters={filters}
      />
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const {
    storeCode,
    page,
    auditory,
    type,
  } = query;
  const selectFilter = {
    is_new: true,
    ...(auditory ? { auditory } : null),
    ...(type ? { type } : null),
  };
  const stores = getStores();
  const { products, pagination } = getProductsPageData(storeCode, page, selectFilter);
  const filters = getProductsFilters(storeCode, { is_new: true });

  return {
    props: {
      stores,
      products,
      pagination,
      filters,
    },
  };
}

New.propTypes = {
  stores: proptypes.stores.isRequired,
  products: proptypes.products.isRequired,
  pagination: proptypes.pagination.isRequired,
  filters: proptypes.filters.isRequired,
};
