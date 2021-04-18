import Link from 'next/link';
import PropTypes from '../../lib/prop-types';
import {
  getStores,
  getAllProductCodes,
  getProductData,
  getProductPhotoLinks,
} from '../../lib/data';
import Layout from '../../components/layout';
import ProductCard from '../../components/product-card';
import Message404 from '../../components/message404';
import styleVars from '../../styles/vars';

export default function ShoePage({
  storeCode,
  stores,
  productData,
  productPhotos,
}) {
  if (!storeCode) return null;

  return (
    <Layout
      storeCode={storeCode}
      pathname="/new/[storeCode]"
      stores={stores}
      title={productData?.name ?? 'Товар не найден'}
    >
      {productData && <ProductCard data={productData} photos={productPhotos}/>}

      {!productData && (
        <Message404>
          <p>К сожалению, мы не нашли товар по этому адресу — вероятно, он распродан.</p>
          <p>
            Не хотите взглянуть на наши
            {' '}
            <Link
              href={{
                pathname: '/new/[storeCode]',
                query: {
                  storeCode,
                },
              }}
            >
              <a className="link">новинки</a>
            </Link>
            ?
          </p>
        </Message404>
      )}

      <style jsx>
        {`
        .link {
          color: ${styleVars.colors.green};
        }
        `}
      </style>
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
  storeCode: null,
  stores: null,
  productData: null,
  productPhotos: null,
};

ShoePage.propTypes = {
  storeCode: PropTypes.string,
  stores: PropTypes.stores,
  productData: PropTypes.productData,
  productPhotos: PropTypes.productPhotos,
};
