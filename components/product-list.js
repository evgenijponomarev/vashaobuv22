import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import proptypes from '../lib/proptypes';
import Filter from './filter';
import Product from './product';
import Pagination from './pagination';
import ContentLoader from './content-loader';

export default function ProductList({ products, pagination, filters }) {
  const B = 'product-list';

  const router = useRouter();

  const [productList, setProductList] = useState(products);
  const [lastPageNum, setLastPageNum] = useState(pagination.pageNum);

  useEffect(() => {
    setLastPageNum(pagination.pageNum);
    setProductList(products);
  }, [router.query.page]);

  async function getNextPage() {
    const queryString = Object.entries({
      ...router.query,
      page: lastPageNum + 1,
    }).map(([key, value]) => `${key}=${value}`)
      .join('&');

    const { data } = await axios.get(`/api/shoes?${queryString}`);

    setLastPageNum(lastPageNum + 1);
    setProductList([...productList, ...data]);
  }

  return (
    <div className={B}>
      {filters.length > 0 && <Filter filters={filters}/>}

      {productList.map((product) => (
        <div className={`${B}__item`} key={product.code}>
          <Product productData={product}/>
        </div>
      ))}

      {lastPageNum < pagination.pagesCount && <ContentLoader onClick={getNextPage}/>}

      <Pagination
        pagination={pagination}
        onGetMore={getNextPage}
      />

      <style jsx>
        {`
        .${B} {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
        }

        .${B}__item {
          display: block;
          padding: 10px;
          width: 20%;
          align-self: stretch;
        }

        @media (max-width: 800px) {
          .${B}__item {
            width: 25%;
          }
        }

        @media (max-width: 560px) {
          .${B}__item {
            width: 33%;
          }
        }

        @media (max-width: 480px) {
          .${B}__item {
            width: 50%;
          }
        }
      `}
      </style>
    </div>
  );
}

ProductList.defaultProps = {
  filters: [],
};

ProductList.propTypes = {
  products: proptypes.products.isRequired,
  pagination: proptypes.pagination.isRequired,
  filters: proptypes.filters,
};
