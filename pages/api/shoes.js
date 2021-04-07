import { getProductsPageData } from '../../lib/data';

export default function handler(req, res) {
  try {
    const { storeCode, page, ...filterParams } = req.query;

    const { products } = getProductsPageData(storeCode, page, filterParams);

    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: 'Request error' });
  }
}
