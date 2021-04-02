import path from 'path';
import fs from 'fs';

const COUNT_ON_PAGE = 20;

function getList({ storeCode, pageNum = 1 }) {
  const dataPath = path.join(process.cwd(), 'data', `products.${storeCode}.json`);
  const data = JSON.parse(fs.readFileSync(dataPath));
  const beginIndex = COUNT_ON_PAGE * (pageNum - 1);
  const endIndex = COUNT_ON_PAGE * pageNum;

  return data.slice(beginIndex, endIndex);
}

function getPageNumbersList(params) {
  const products = getList(params);
  const pagesCount = Math.ceil(products.length / COUNT_ON_PAGE) || 1;
  const pageNumbersList = new Array(pagesCount).fill().map((v, k) => k + 1);

  return pageNumbersList;
}

export default {
  getList,
  getPageNumbersList,
};
