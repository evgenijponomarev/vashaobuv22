import proptypes from '../../lib/proptypes';
import { getStores, getAllProductCodes, getProductData } from '../../lib/data';
import Layout from '../../components/layout';

export default function Shoe({ storeCode, stores, productData }) {
  return (
    <Layout
      storeCode={storeCode}
      pathname="/new/[storeCode]"
      stores={stores}
      title={productData.name}
    >
      asdf
    </Layout>
  );
}

export async function getStaticPaths() {
  const storeCodes = getStores().map(({ code }) => code);
  const productCodesByStore = storeCodes.map((storeCode) => ({
    storeCode,
    productCodes: getAllProductCodes(storeCode),
  }));
  const paths = productCodesByStore.flatMap(({ storeCode, productCodes }) => (
    productCodes.map((productCode) => ({
      params: {
        codes: [storeCode, productCode],
      },
    }))
  ));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const [storeCode, productCode] = params.codes;
  const stores = getStores();
  const productData = getProductData(storeCode, productCode);

  return {
    props: {
      storeCode,
      stores,
      productData,
    },
  };
}

Shoe.propTypes = {
  storeCode: proptypes.string.isRequired,
  stores: proptypes.stores.isRequired,
  productData: proptypes.productData.isRequired,
};
