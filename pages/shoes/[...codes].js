import PropTypes from '../../lib/prop-types';
import {
  getStores,
  getAllProductCodes,
  getProductData,
  getProductPhotoLinks,
} from '../../lib/data';
import Layout from '../../components/layout';
import ProductCard from '../../components/product-card';

export default function ShoePage({
  storeCode,
  stores,
  productData,
  productPhotos,
}) {
  return (
    <Layout
      storeCode={storeCode}
      pathname="/new/[storeCode]"
      stores={stores}
      title={productData?.name ?? 'Страница не найдена'}
    >
      {productData && <ProductCard data={productData} photos={productPhotos}/>}
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
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const [storeCode, productCode] = params.codes;
  const stores = getStores();
  const productData = getProductData(storeCode, productCode);
  const productPhotos = getProductPhotoLinks(productCode);

  return {
    props: {
      storeCode,
      stores,
      productData,
      productPhotos,
    },
  };
}

ShoePage.defaultProps = {
  productData: null,
};

ShoePage.propTypes = {
  storeCode: PropTypes.string.isRequired,
  stores: PropTypes.stores.isRequired,
  productData: PropTypes.productData,
  productPhotos: PropTypes.productPhotos.isRequired,
};
