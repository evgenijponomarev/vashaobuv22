import _ from 'lodash';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import fsHelpers from './fs-helpers';

const COUNT_ON_PAGE = 10;

function filterProducts(products, selectionParams) {
  const filters = Object.entries(selectionParams);

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

export function getStores() { return fsHelpers.getStores(); }

export function getAllProductCodes(storeCode) {
  return fsHelpers.getProducts(storeCode).map(({ code }) => code);
}

export function getProductsPageData(storeCode, page = 1, selectionParams) {
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
}

export function getProductsFilters(storeCode, selectionParams) {
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
}

export function getProductData(storeCode, productCode) {
  return fsHelpers.getProducts(storeCode)
    .find(({ code }) => code === productCode);
}

export function getBannerLinks(storeCode) {
  const bannerFileNames = fsHelpers.getBanners(storeCode);

  return bannerFileNames.map((fileName) => `/banners/${fileName}`);
}

export function validateData(data) {
  return !!data.stores
    && !!data.bonuses
    && !!data.shoes
    && !!data.products;
}

export function updateData(data) {
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
}

export default {
  getStores,
  getAllProductCodes,
  getProductsPageData,
  getProductsFilters,
  getProductData,
  getBannerLinks,
  validateData,
  updateData,
};
