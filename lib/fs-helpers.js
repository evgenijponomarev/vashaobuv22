import path from 'path';
import fs from 'fs';
import extractZip from 'extract-zip';
import multer from 'multer';

const DATA_FILE_NAME = 'data.json';
const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE_PATH = path.join(DATA_DIR, DATA_FILE_NAME);
const STORES_FILE_PATH = path.join(DATA_DIR, 'stores.json');
const BONUSES_FILE_PATH = path.join(DATA_DIR, 'bonuses.json');
const LOG_FILE_PATH = path.join(process.cwd(), '1s_import.log');
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');

function readDataFromFile(fileName) {
  const dataPath = path.join(process.cwd(), 'data', `${fileName}.json`);

  if (!fs.existsSync(dataPath)) return [];

  return JSON.parse(fs.readFileSync(dataPath));
}

function getSourceData() {
  return JSON.parse(fs.readFileSync(DATA_FILE_PATH));
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

function deleteBanner(storeCode, bannerNum, fileExt) {
  const fileName = `${storeCode}_banner_${bannerNum}.${fileExt}`;
  const filePath = path.join(process.cwd(), 'public', 'banners', fileName);

  fs.unlinkSync(filePath);
}

function updateDataImportLogs(dumpFilename) {
  const currentTimestamp = Date.now();
  const currentTime = new Date(currentTimestamp).toString();

  fs.appendFileSync(LOG_FILE_PATH, `Time: ${currentTime}. Filename: ${dumpFilename}\n`);
}

async function unzip(dumpFileName, onEntry) {
  await extractZip(path.join(UPLOADS_DIR, dumpFileName), {
    dir: UPLOADS_DIR,
    onEntry,
  });
}

function getUploadMiddlware(dumpFilename, callback = () => {}) {
  return multer({
    storage: multer.diskStorage({
      destination: UPLOADS_DIR,
      filename: (req, file, cb) => {
        callback(file.originalname);
        cb(null, dumpFilename);
      },
    }),
  });
}

export default {
  getSourceData,
  getStores,
  getProducts,
  setProducts,
  getBanners,
  setStores,
  setBonuses,
  deleteBanner,
  updateDataImportLogs,
  unzip,
  getUploadMiddlware,
};
