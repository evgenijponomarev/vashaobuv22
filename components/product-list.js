import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import PropTypes from '../lib/prop-types';
import Filter from './filter';
import Product from './product';
import Pagination from './pagination';
import ContentLoader from './content-loader';
import styleVars from '../styles/vars';

export default function ProductList({ products, pagination, filters }) {
  const B = 'product-list';

  const router = useRouter();

  const [productList, setProductList] = useState(products);
  const [lastPageNum, setLastPageNum] = useState(pagination?.pageNum);

  useEffect(() => {
    setLastPageNum(pagination?.pageNum);
    setProductList(products);
  }, [
    router.query.storeCode,
    router.query.page,
    router.query.auditory,
    router.query.type,
  ]);

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

  function onChangeFilter(filterCode, filterValues) {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        [filterCode]: filterValues.join(','),
        page: 1,
      },
    });
  }

  function onClearFilter(field) {
    const { query } = router;
    delete query[field];
    query.page = 1;

    router.push({
      pathname: router.pathname,
      query,
    });
  }

  function isVisibleFilter() {
    const filterEntries = Object.entries(filters);

    return filterEntries.length > 0
      && filterEntries.some(([, value]) => value.length > 1);
  }

  return (
    <div className={B}>
      {isVisibleFilter() && (
        <div className={`${B}__sidebar`}>
          <Filter
            filters={filters}
            onChange={onChangeFilter}
            onClear={onClearFilter}
          />
        </div>
      )}

      <div className={`${B}__items`}>
        {productList.map((product) => (
          <div className={`${B}__item`} key={product.code}>
            <Product productData={product}/>
          </div>
        ))}

        {
          pagination
          && lastPageNum < pagination.pagesCount
          && <ContentLoader onClick={getNextPage}/>
        }

        {pagination && (
          <Pagination
            pagination={pagination}
            onGetMore={getNextPage}
          />
        )}
      </div>

      <style jsx>
        {`
        .${B} {
          display: flex;
        }

        .${B}__sidebar {
          position: sticky;
          top: ${styleVars.headerHeigh}px;
          z-index: 10;
          background: #fff;
          width: 200px;
          flex-shrink: 0;
          align-self: flex-start;
        }

        .${B}__items {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          width: 100%;
        }

        .${B}__item {
          display: block;
          padding: ${styleVars.padding}px;
          width: 25%;
          align-self: stretch;
        }

        @media (max-width: 800px) {
          .${B}__item {
            width: 33%;
          }
        }

        @media (max-width: 700px) {
          .${B}__item {
            width: 50%;
          }
        }

        @media (max-width: 550px) {
          .${B} {
            flex-direction: column;
          }

          .${B}__sidebar {
            width: 100%;
          }
        }
      `}
      </style>
    </div>
  );
}

ProductList.defaultProps = {
  pagination: null,
  filters: null,
};

ProductList.propTypes = {
  products: PropTypes.products.isRequired,
  pagination: PropTypes.pagination,
  filters: PropTypes.filters,
};
