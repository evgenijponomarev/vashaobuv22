import path from 'path';
import fs from 'fs';

const DATA_DIR = path.join(process.cwd(), 'data');
const STORES_FILE_PATH = path.join(DATA_DIR, 'stores.json');
const BONUSES_FILE_PATH = path.join(DATA_DIR, 'bonuses.json');

function readDataFromFile(fileName) {
  const dataPath = path.join(process.cwd(), 'data', `${fileName}.json`);

  if (!fs.existsSync(dataPath)) return [];

  return JSON.parse(fs.readFileSync(dataPath));
}

function getStores() {
  return readDataFromFile('stores');
}

function getProducts(storeCode) {
  return readDataFromFile(`products.${storeCode}`);
}

function getBanners(storeCode) {
  const bannersDirPath = path.join(process.cwd(), 'public', 'banners');
  const allFileNames = fs.readdirSync(bannersDirPath);

  if (!storeCode) return allFileNames;

  return allFileNames.filter((fileName) => fileName.includes(storeCode));
}

function setProducts(storeCode, products) {
  const filePath = path.join(DATA_DIR, `products.${storeCode}.json`);
  fs.writeFileSync(filePath, JSON.stringify(products));
}

function setStores(data) {
  fs.writeFileSync(STORES_FILE_PATH, JSON.stringify(data));
}

function setBonuses(data) {
  fs.writeFileSync(BONUSES_FILE_PATH, JSON.stringify(data));
}

export default {
  getStores,
  getProducts,
  setProducts,
  getBanners,
  setStores,
  setBonuses,
};
