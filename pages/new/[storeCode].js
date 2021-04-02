import proptypes from '../../lib/proptypes';
import Data from '../../lib/data';
import Layout from '../../components/layout';
import ProductList from '../../components/product-list';
import Pagination from '../../components/pagination';

export default function New({ storeCode, stores, products }) {
  return (
    <Layout stores={stores}>
      <ProductList
        products={products.map((product) => ({
          ...product,
          url: `/new/${storeCode}/${product.code}`,
        }))}
      />

      <Pagination/>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const data = new Data(query);

  return {
    props: {
      storeCode: query.storeCode,
      stores: data.getStores(),
      products: data.getProducts(),
    },
  };
}

New.propTypes = {
  storeCode: proptypes.string.isRequired,
  stores: proptypes.stores.isRequired,
  products: proptypes.products.isRequired,
};
