import _ from 'lodash';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import fsHelpers from './fs-helpers';

const COUNT_ON_PAGE = 10;

function filterProducts(products, selectionParams) {
  const filters = Object.entries(selectionParams)
    .filter(([, value]) => value !== '');

  if (filters.length === 0) return products;

  const isMatchBoolFilter = (product, filterKey, filterValue) => (
    typeof filterValue === 'boolean' && !!product[filterKey]
  );
  const isMatchArrayFilter = (product, filterKey, filterValue) => (
    _.isArray(filterValue) && filterValue.includes(product[filterKey])
  );

  return products.filter((product) => (
    filters.reduce((acc, [filterKey, filterValue]) => (acc && (
      isMatchBoolFilter(product, filterKey, filterValue)
      || isMatchArrayFilter(product, filterKey, filterValue)
      || product[filterKey] === filterValue
    )), true)
  ));
}

export const getStores = () => fsHelpers.getStores();

export const getAllProductCodes = (storeCode) => fsHelpers.getProducts(storeCode)
  .map(({ code }) => code);

export const getProductsPageData = (storeCode, page = 1, selectionParams) => {
  const items = fsHelpers.getProducts(storeCode);
  const selectedItems = filterProducts(items, selectionParams);
  const itemsCount = selectedItems.length;
  const pagesCount = Math.ceil(itemsCount / COUNT_ON_PAGE);
  const pageNum = +page;
  const beginIndex = COUNT_ON_PAGE * (pageNum - 1);
  const endIndex = COUNT_ON_PAGE * pageNum;
  const products = selectedItems.slice(beginIndex, endIndex);

  return {
    products,
    pagination: {
      pageNum,
      pagesCount,
    },
  };
};

export const getProductsFilters = (storeCode, selectionParams) => {
  const filters = {
    auditory: [],
    type: [],
  };

  const items = fsHelpers.getProducts(storeCode);
  const selectedItems = filterProducts(items, selectionParams);

  selectedItems.forEach((item) => {
    Object.keys(item)
      .filter((itemKey) => typeof filters[itemKey] !== 'undefined')
      .forEach((itemKey) => {
        const value = item[itemKey];

        if (!filters[itemKey].includes(value)) filters[itemKey].push(value);
      });
  });

  return filters;
};

export const getProductData = (storeCode, productCode) => fsHelpers.getProducts(storeCode)
  .find(({ code }) => code === productCode) ?? null;

export const getProductPhotoLinks = (productCode) => {
  const allPhotos = fsHelpers.getProductPhotos();
  const resultPhotos = productCode
    ? allPhotos.filter((fileName) => fileName.indexOf(productCode) === 0)
    : allPhotos;

  return resultPhotos.map((fileName) => `/shoes_photos/${fileName}`);
};

export const getAllStorePhotos = () => fsHelpers.getStoresPhotos()
  .map((fileName) => `/stores_photos/${fileName}`);

export const getStorePhotos = (storeCode) => {
  const allPhotos = fsHelpers.getStoresPhotos();
  const resultPhotos = storeCode
    ? allPhotos.filter((fileName) => fileName.indexOf(storeCode) === 0)
    : allPhotos;

  return resultPhotos.map((fileName) => `/stores_photos/${fileName}`);
};

export const getBannerLinks = (storeCode) => {
  const allBanners = fsHelpers.getBanners();
  const resultBanners = storeCode
    ? allBanners.filter((fileName) => fileName.indexOf(storeCode) === 0)
    : allBanners;

  return resultBanners.map((fileName) => `/banners/${fileName}`);
};

export const getContacts = (storeCode) => {
  const contacts = fsHelpers.getContacts();

  if (!storeCode) return contacts;

  return contacts.find(({ store_code }) => store_code === storeCode) ?? null;
};

export const updateContacts = (
  storeCode,
  address,
  coordinates,
  zoom,
) => {
  const allContacts = fsHelpers.getContacts();
  const data = allContacts.map((contacts) => {
    if (contacts.store_code !== storeCode) return contacts;

    return {
      store_code: storeCode,
      address,
      map: {
        coordinates,
        zoom,
      },
    };
  });

  fsHelpers.setContacts(data);
};

export const getBonuses = () => fsHelpers.getBonuses();

export const validateData = (data) => !!data.stores
  && !!data.bonuses && !!data.shoes && !!data.products;

export const updateData = (data) => {
  const cyrillicToTranslit = new CyrillicToTranslit();

  const { bonuses } = data;
  const stores = [];

  data.stores.forEach((storeName) => {
    const storeCode = cyrillicToTranslit.transform(storeName, '_').toLowerCase();

    stores.push({
      name: storeName,
      code: storeCode,
    });

    const storeProducts = data.products
      .filter((product) => product.store === storeName)
      .map((product) => {
        const shoesEntry = data.shoes.find((shoe) => shoe.code === product.shoe_code);

        return {
          code: shoesEntry.code,
          name: shoesEntry.name,
          articul: shoesEntry.articul,
          type: shoesEntry.type,
          auditory: shoesEntry.auditory,
          size_line: shoesEntry.size_line,
          price: product.price,
          is_new: product.is_new,
          extra_bonus: product.extra_bonus,
        };
      });

    fsHelpers.setProducts(storeCode, storeProducts);
  });

  fsHelpers.setStores(stores);
  fsHelpers.setBonuses(bonuses);
};

export default {
  getStores,
  getAllProductCodes,
  getProductsPageData,
  getProductsFilters,
  getProductData,
  getBannerLinks,
  getBonuses,
  getAllStorePhotos,
  getStorePhotos,
  getContacts,
  updateContacts,
  validateData,
  updateData,
};
