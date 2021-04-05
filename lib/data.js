import path from 'path';
import fs from 'fs';

const COUNT_ON_PAGE = 20;

function readDataFromFile(fileName) {
  const dataPath = path.join(process.cwd(), 'data', `${fileName}.json`);

  if (!fs.existsSync(dataPath)) return [];

  return JSON.parse(fs.readFileSync(dataPath));
}

export function getStores() {
  return readDataFromFile('stores');
}

export function getProducts({ storeCode, page = 1 }) {
  const pageNum = +page;
  const items = readDataFromFile(`products.${storeCode}`);
  const itemsCount = items.length;
  const pagesCount = Math.ceil(itemsCount / COUNT_ON_PAGE);
  const beginIndex = COUNT_ON_PAGE * (pageNum - 1);
  const endIndex = COUNT_ON_PAGE * pageNum;
  const products = items.slice(beginIndex, endIndex);

  return {
    products,
    pagination: {
      pageNum,
      pagesCount,
    },
  };
}

export default {
  getStores,
  getProducts,
};
