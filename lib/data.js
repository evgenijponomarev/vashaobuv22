import path from 'path';
import fs from 'fs';

const COUNT_ON_PAGE = 20;

function readDataFromFile(fileName) {
  const dataPath = path.join(process.cwd(), 'data', `${fileName}.json`);
  return JSON.parse(fs.readFileSync(dataPath));
}

export default class Data {
  constructor(queryParams = {}) {
    this.storeCode = queryParams.storeCode;
    this.pageNum = queryParams.pageNum || 1;
  }

  getStores() {
    const data = readDataFromFile('stores');

    return data.map((store) => ({
      ...store,
      isCurrent: store.code === this.storeCode,
    }));
  }

  getProducts() {
    const data = readDataFromFile(`products.${this.storeCode}`);
    const beginIndex = COUNT_ON_PAGE * (this.pageNum - 1);
    const endIndex = COUNT_ON_PAGE * this.pageNum;

    return data.slice(beginIndex, endIndex);
  }
}
