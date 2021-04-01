import { useState, useEffect } from 'react';
import stores from '../../data/stores.json';
import productsModel from '../../models/products';
import Layout from '../../components/layout';
import ProductList from '../../components/product-list';

const COUNT_ON_PAGE = 20;

export default function New({ store, products }) {
  const getPageList = (pageNumber) => {
    const beginIndex = COUNT_ON_PAGE * (pageNumber - 1);
    const endIndex = COUNT_ON_PAGE * pageNumber;

    return products.slice(beginIndex, endIndex);
  }

  useEffect(() => {
    const currentStoreCode = localStorage.getItem('store');
    if (currentStoreCode !== store.code) {
      localStorage.setItem('store', store.code);
      setPageList(getPageList(1));
    }
  });

  const pagesCount = Math.ceil(products.length / COUNT_ON_PAGE);
  const [pageList, setPageList] = useState(getPageList(1));

  return (
    <Layout stores={stores} currentStore={store}>
      <ProductList products={pageList}/>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const store = stores.find(store => store.code === params.storeCode);
  const products = productsModel.getList(store.code);

  return {
    props: {
      store,
      products,
    },
  };
}

export async function getStaticPaths() {
  const paths = stores.map(({ code }) => ({
    params: { storeCode: code },
  }));

  return {
    paths,
    fallback: false,
  };
}
