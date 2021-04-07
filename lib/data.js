import path from 'path';
import fs from 'fs';

const COUNT_ON_PAGE = 10;

function readDataFromFile(fileName) {
  const dataPath = path.join(process.cwd(), 'data', `${fileName}.json`);

  if (!fs.existsSync(dataPath)) return [];

  return JSON.parse(fs.readFileSync(dataPath));
}

function filterProducts(products, filterParams) {
  if (!filterParams) return products;

  return products.filter((product) => (
    !!product.is_new === !!filterParams.isNew
  ));
}

export function getStores() {
  return readDataFromFile('stores');
}

export function getProductsPageData(storeCode, page = 1, filterParams) {
  const items = readDataFromFile(`products.${storeCode}`);
  const filteredItems = filterProducts(items, filterParams);

  const itemsCount = filteredItems.length;
  const pagesCount = Math.ceil(itemsCount / COUNT_ON_PAGE);
  const pageNum = +page;
  const beginIndex = COUNT_ON_PAGE * (pageNum - 1);
  const endIndex = COUNT_ON_PAGE * pageNum;
  const products = filteredItems.slice(beginIndex, endIndex);

  return {
    products,
    pagination: {
      pageNum,
      pagesCount,
    },
  };
}

export function getProductsFilters(storeCode, filterParams) {
  const filters = {
    auditory: [],
    type: [],
  };

  const items = readDataFromFile(`products.${storeCode}`);
  const filteredItems = filterProducts(items, filterParams);

  filteredItems.forEach((item) => {
    Object.keys(item)
      .filter((itemKey) => typeof filters[itemKey] !== 'undefined')
      .forEach((itemKey) => {
        const value = item[itemKey];

        if (!filters[itemKey].includes(value)) filters[itemKey].push(value);
      });
  });

  return filters;
}

export default {
  getStores,
  getProductsPageData,
  getProductsFilters,
};
