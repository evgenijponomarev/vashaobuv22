import { useState, useEffect } from 'react';
import productsModel from '../../models/products';
import storesModel from '../../models/stores';
import Layout from '../../components/layout';
import ProductList from '../../components/product-list';
import Pagination from '../../components/pagination';

const COUNT_ON_PAGE = 20;

export default function New({ stores = [], products = [] }) {
  const currentStore = stores.find(store => store.isCurrent);

  const [pageList, setPageList] = useState(getPageList(1));

  useEffect(() => {
    const userStoreCode = localStorage.getItem('store');

    if (userStoreCode !== currentStore.code) {
      localStorage.setItem('store', currentStore.code);
      setPageList(getPageList(1));
    }
  });

  return (
    <Layout stores={stores} currentStore={currentStore}>
      <ProductList products={pageList}/>

      {/* <Pagination
        pagesCount={pagesCount}
        currentPageNum={}
        onChangePage={pageNum => setPageList(getPageList(pageNum))}
      /> */}
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const stores = storesModel.getList().map(store => ({
    ...store,
    isCurrent: store.code === params.storeCode,
  }));
  const products = productsModel.getList(params);

  return {
    props: {
      stores,
      products,
    },
    revalidate: 5,
  };
}

export async function getStaticPaths() {
  const stores = storesModel.getList();
  const paths = stores.map((store) => {
    const storeCode = store.code;
    const pageNumbersList = productsModel.getPageNumbersList({ storeCode });

    return pageNumbersList.map((pageNum) => ({
      params: {
        storeCode,
        pageNum,
      }
    }));
  }).flat();

  return {
    paths,
    fallback: true,
  };
}
