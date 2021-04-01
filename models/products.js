import path from 'path';
import fs from 'fs';

function getList(storeCode) {
  const dataPath = path.join(process.cwd(), 'data', `products.${storeCode}.json`);
  const data = JSON.parse(fs.readFileSync(dataPath)).map(product => ({
    ...product,
    storeCode,
  }));

  return data;
}

export default {
  getList,
};
