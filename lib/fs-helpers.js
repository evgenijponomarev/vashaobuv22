import path from 'path';
import fs from 'fs';
import extractZip from 'extract-zip';
import _ from 'lodash';
import rimraf from 'rimraf';

const ENCODING = 'utf8';
const DATA_FORMAT = 'json';

const DATA_DIR_NAME = 'data';
const PUBLIC_DIR_NAME = 'public';
const UPLOADS_DIR_NAME = 'uploads';
const BANNERS_DIR_NAME = 'banners';
const SHOES_PHOTOS_DIR_NAME = 'shoes_photos';
const STORES_PHOTOS_DIR_NAME = 'stores_photos';
const SECRET_DIR_NAME = 'secret';
const LOGS_DIR_NAME = 'logs';

const IMPORT_LOG_FILE_NAME = 'import.log';
const PRODUCTS_FILE_NAME_PREFIX = 'products';
const SOURCE_DATA_FILE_NAME = `data.${DATA_FORMAT}`;
const STORES_FILE_NAME = `stores.${DATA_FORMAT}`;
const BONUSES_FILE_NAME = `bonuses.${DATA_FORMAT}`;
const CONTACTS_FILE_NAME = `contacts.${DATA_FORMAT}`;
const API_PASSWORD_FILE_NAME = 'api-password';

const SECRET_DIR_PATH = path.join(process.cwd(), SECRET_DIR_NAME);
const DATA_DIR_PATH = path.join(process.cwd(), DATA_DIR_NAME);
const UPLOADS_DIR_PATH = path.join(process.cwd(), UPLOADS_DIR_NAME);
const BANNERS_DIR_PATH = path.join(process.cwd(), PUBLIC_DIR_NAME, BANNERS_DIR_NAME);
const SHOES_PHOTOS_DIR_PATH = path.join(process.cwd(), PUBLIC_DIR_NAME, SHOES_PHOTOS_DIR_NAME);
const STORES_PHOTOS_DIR_PATH = path.join(process.cwd(), PUBLIC_DIR_NAME, STORES_PHOTOS_DIR_NAME);
const LOGS_DIR_PATH = path.join(process.cwd(), LOGS_DIR_NAME);

const SOURCE_DATA_FILE_PATH = path.join(DATA_DIR_PATH, SOURCE_DATA_FILE_NAME);
const STORES_FILE_PATH = path.join(DATA_DIR_PATH, STORES_FILE_NAME);
const BONUSES_FILE_PATH = path.join(DATA_DIR_PATH, BONUSES_FILE_NAME);
const CONTACTS_FILE_PATH = path.join(DATA_DIR_PATH, CONTACTS_FILE_NAME);
const API_PASSWORD_FILE_PATH = path.join(SECRET_DIR_PATH, API_PASSWORD_FILE_NAME);
const IMPORT_LOG_FILE_PATH = path.join(LOGS_DIR_PATH, IMPORT_LOG_FILE_NAME);

const readDataFromFile = (fileName) => {
  const dataPath = path.join(process.cwd(), DATA_DIR_NAME, fileName);

  if (!fs.existsSync(dataPath)) return [];

  return JSON.parse(fs.readFileSync(dataPath));
};

const getProductsFileName = (storeCode) => `${PRODUCTS_FILE_NAME_PREFIX}.${storeCode}.${DATA_FORMAT}`;

const getBannerFileName = (storeCode, num, ext) => `${storeCode}_${num}.${ext}`;

const getStorePhotoFileName = (storeCode, num, ext) => `${storeCode}_${num}.${ext}`;

const getSourceData = () => JSON.parse(fs.readFileSync(SOURCE_DATA_FILE_PATH));

const getStores = () => readDataFromFile(STORES_FILE_NAME);

const getBanners = () => {
  if (!fs.existsSync(BANNERS_DIR_PATH)) fs.mkdirSync(BANNERS_DIR_PATH);

  return fs.readdirSync(BANNERS_DIR_PATH);
};

const getBonuses = () => readDataFromFile(BONUSES_FILE_NAME);

const getProductPhotos = () => fs.readdirSync(SHOES_PHOTOS_DIR_PATH);

const getContacts = () => readDataFromFile(CONTACTS_FILE_NAME);

const getStoresPhotos = () => {
  if (!fs.existsSync(STORES_PHOTOS_DIR_PATH)) fs.mkdirSync(STORES_PHOTOS_DIR_PATH);

  return fs.readdirSync(STORES_PHOTOS_DIR_PATH);
};

const getProducts = (storeCode) => {
  const fileName = getProductsFileName(storeCode);
  return readDataFromFile(fileName)
    .map((product) => ({ ...product, storeCode }))
    .slice()
    .sort((a, b) => (a.name < b.name ? -1 : 1));
};

const setProducts = (storeCode, data) => {
  const fileName = getProductsFileName(storeCode);
  const filePath = path.join(DATA_DIR_PATH, fileName);
  fs.writeFileSync(filePath, JSON.stringify(data));
};

const setStores = (data) => fs.writeFileSync(STORES_FILE_PATH, JSON.stringify(data));

const setBonuses = (data) => fs.writeFileSync(BONUSES_FILE_PATH, JSON.stringify(data));

const setContacts = (data) => fs.writeFileSync(CONTACTS_FILE_PATH, JSON.stringify(data));

const deleteBanner = (fileName) => fs.unlinkSync(path.join(BANNERS_DIR_PATH, fileName));

const deleteStorePhoto = (fileName) => fs.unlinkSync(path.join(STORES_PHOTOS_DIR_PATH, fileName));

const updateDataImportLogs = (dumpFilename) => {
  const currentTimestamp = Date.now();
  const currentTime = new Date(currentTimestamp).toString();
  const message = `Time: ${currentTime}. Filename: ${dumpFilename}\n`;
  fs.appendFileSync(IMPORT_LOG_FILE_PATH, message);
};

const unzip = async (dumpFileName, onEntry) => {
  await extractZip(path.join(UPLOADS_DIR_PATH, dumpFileName), {
    dir: UPLOADS_DIR_PATH,
    onEntry,
  });
};

const saveBanner = (storeCode, fileData) => {
  const storeBanners = getBanners()
    .filter((fileName) => fileName.indexOf(storeCode) === 0);
  const bannerNum = storeBanners.length + 1;
  const ext = _.last(fileData.originalFilename.split('.'));
  const destFilePath = path.join(
    BANNERS_DIR_PATH,
    getBannerFileName(storeCode, bannerNum, ext),
  );

  fs.copyFileSync(fileData.path, destFilePath);
};

const saveStorePhoto = (storeCode, fileData) => {
  const storePhotos = getStoresPhotos()
    .filter((fileName) => fileName.indexOf(storeCode) === 0);
  const photoNum = storePhotos.length + 1;
  const ext = _.last(fileData.originalFilename.split('.'));
  const destFilePath = path.join(
    STORES_PHOTOS_DIR_PATH,
    getStorePhotoFileName(storeCode, photoNum, ext),
  );

  fs.copyFileSync(fileData.path, destFilePath);
};

const writeApiPassword = (password) => fs.writeFileSync(API_PASSWORD_FILE_PATH, password);

const getApiPassword = () => fs.readFileSync(API_PASSWORD_FILE_PATH, ENCODING);

const saveSourceData = async (fileData) => {
  rimraf.sync(UPLOADS_DIR_PATH);
  rimraf.sync(SHOES_PHOTOS_DIR_PATH);
  fs.mkdirSync(UPLOADS_DIR_PATH);
  fs.mkdirSync(SHOES_PHOTOS_DIR_PATH);

  const destFilePath = path.join(
    UPLOADS_DIR_PATH,
    fileData.originalFilename,
  );

  fs.copyFileSync(fileData.path, destFilePath);

  await extractZip(destFilePath, {
    dir: UPLOADS_DIR_PATH,
    onEntry: function unzipHandler(entry) {
      this.dir = entry.fileName === SOURCE_DATA_FILE_NAME ? DATA_DIR_PATH : SHOES_PHOTOS_DIR_PATH;
    },
  });
};

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
  setContacts,
  deleteBanner,
  deleteStorePhoto,
  updateDataImportLogs,
  unzip,
  saveBanner,
  saveStorePhoto,
  getContacts,
  getStoresPhotos,
  writeApiPassword,
  getApiPassword,
  saveSourceData,
};
