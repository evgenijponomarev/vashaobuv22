import { getProductsPageData } from '../../lib/data';
import apiHelpers from '../../lib/api-helpers';

const actions = {
  GET(req, res) {
    const { storeCode, page, ...filterParams } = req.query;

    if (filterParams.auditory) filterParams.auditory = filterParams.auditory.split(',');
    if (filterParams.type) filterParams.type = filterParams.type.split(',');

    const { products } = getProductsPageData(storeCode, page, filterParams);

    apiHelpers.sendData(res, products);
  },
};

export default function handler(req, res) {
  const action = actions[req.method];

  if (!action) {
    apiHelpers.sendNoMatchError(res, req.method);
    return;
  }

  try {
    action(req, res);
  } catch (err) {
    apiHelpers.sendServerError(res);
  }
}
