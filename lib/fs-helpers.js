import path from 'path';
import fs from 'fs';
import extractZip from 'extract-zip';
import multer from 'multer';
import _ from 'lodash';

const DATA_FORMAT = 'json';
const DATA_DIR_NAME = 'data';
const PUBLIC_DIR_NAME = 'public';
const UPLOADS_DIR_NAME = 'uploads';
const BANNERS_DIR_NAME = 'banners';
const SHOES_PHOTOS_DIR_NAME = 'shoes_photos';
const STORES_PHOTOS_DIR_NAME = 'stores_photos';
const IMPORT_LOG_FILE_NAME = '1s_import.log';
const PRODUCTS_FILE_NAME_PREFIX = 'products';
const BANNER_FILE_NAME_SUFFIX = 'banner';
const SOURCE_DATA_FILE_NAME = `data.${DATA_FORMAT}`;
const STORES_FILE_NAME = `stores.${DATA_FORMAT}`;
const BONUSES_FILE_NAME = `bonuses.${DATA_FORMAT}`;
const CONTACTS_FILE_NAME = `contacts.${DATA_FORMAT}`;
const DATA_DIR_PATH = path.join(process.cwd(), DATA_DIR_NAME);
const SOURCE_DATA_FILE_PATH = path.join(DATA_DIR_PATH, SOURCE_DATA_FILE_NAME);
const STORES_FILE_PATH = path.join(DATA_DIR_PATH, STORES_FILE_NAME);
const BONUSES_FILE_PATH = path.join(DATA_DIR_PATH, BONUSES_FILE_NAME);
const LOG_FILE_PATH = path.join(process.cwd(), IMPORT_LOG_FILE_NAME);
const UPLOADS_DIR_PATH = path.join(process.cwd(), UPLOADS_DIR_NAME);
const BANNERS_DIR_PATH = path.join(process.cwd(), PUBLIC_DIR_NAME, BANNERS_DIR_NAME);
const SHOES_PHOTOS_DIR_PATH = path.join(process.cwd(), PUBLIC_DIR_NAME, SHOES_PHOTOS_DIR_NAME);
const STORES_PHOTOS_DIR_PATH = path.join(process.cwd(), PUBLIC_DIR_NAME, STORES_PHOTOS_DIR_NAME);

function getProductsFileName(storeCode) {
  return `${PRODUCTS_FILE_NAME_PREFIX}.${storeCode}.${DATA_FORMAT}`;
}

function getBannerFileName(storeCode, num, ext) {
  return `${storeCode}_${BANNER_FILE_NAME_SUFFIX}_${num}.${ext}`;
}

function readDataFromFile(fileName) {
  const dataPath = path.join(process.cwd(), DATA_DIR_NAME, fileName);

  if (!fs.existsSync(dataPath)) return [];

  return JSON.parse(fs.readFileSync(dataPath));
}

function getSourceData() {
  return JSON.parse(fs.readFileSync(SOURCE_DATA_FILE_PATH));
}

function getStores() {
  return readDataFromFile(STORES_FILE_NAME);
}

function getProducts(storeCode) {
  const fileName = getProductsFileName(storeCode);

  return readDataFromFile(fileName).map((product) => ({ ...product, storeCode }));
}

function getBanners(storeCode) {
  const allFileNames = fs.readdirSync(BANNERS_DIR_PATH);

  if (!storeCode) return allFileNames;

  return allFileNames.filter((fileName) => fileName.includes(storeCode));
}

function getBonuses() {
  return readDataFromFile(BONUSES_FILE_NAME);
}

function getProductPhotos(productCode) {
  const allFileNames = fs.readdirSync(SHOES_PHOTOS_DIR_PATH);

  return allFileNames.filter((fileName) => fileName.indexOf(productCode) === 0);
}

function setProducts(storeCode, data) {
  const fileName = getProductsFileName(storeCode);
  const filePath = path.join(DATA_DIR_PATH, fileName);
  fs.writeFileSync(filePath, JSON.stringify(data));
}

function setStores(data) {
  fs.writeFileSync(STORES_FILE_PATH, JSON.stringify(data));
}

function setBonuses(data) {
  fs.writeFileSync(BONUSES_FILE_PATH, JSON.stringify(data));
}

function deleteBanner(fileName) {
  const filePath = path.join(BANNERS_DIR_PATH, fileName);

  fs.unlinkSync(filePath);
}

function updateDataImportLogs(dumpFilename) {
  const currentTimestamp = Date.now();
  const currentTime = new Date(currentTimestamp).toString();
  const message = `Time: ${currentTime}. Filename: ${dumpFilename}\n`;

  fs.appendFileSync(LOG_FILE_PATH, message);
}

async function unzip(dumpFileName, onEntry) {
  await extractZip(path.join(UPLOADS_DIR_PATH, dumpFileName), {
    dir: UPLOADS_DIR_PATH,
    onEntry,
  });
}

function getUploadMiddlware(filename, fileNameHandler = () => {}) {
  return multer({
    storage: multer.diskStorage({
      destination: UPLOADS_DIR_PATH,
      filename: (req, file, cb) => {
        fileNameHandler(file.originalname);
        cb(null, filename);
      },
    }),
  });
}

function saveBanner(storeCode, fileData) {
  const storeBanners = getBanners(storeCode);
  const bannerNum = storeBanners.length + 1;
  const ext = _.last(fileData.originalFilename.split('.'));
  const destFilePath = path.join(
    process.cwd(),
    PUBLIC_DIR_NAME,
    BANNERS_DIR_NAME,
    getBannerFileName(storeCode, bannerNum, ext),
  );

  fs.copyFileSync(fileData.path, destFilePath);
}

function getContacts() {
  return readDataFromFile(CONTACTS_FILE_NAME);
}

function getStorePhotos(storeCode) {
  return fs.readdirSync(STORES_PHOTOS_DIR_PATH)
    .filter((fileName) => fileName.indexOf(storeCode) === 0);
}

export default {
  getSourceData,
  getStores,
  getProducts,
  getProductPhotos,
  setProducts,
  getBanners,
  getBonuses,
  setStores,
  setBonuses,
  deleteBanner,
  updateDataImportLogs,
  unzip,
  getUploadMiddlware,
  saveBanner,
  getContacts,
  getStorePhotos,
};
