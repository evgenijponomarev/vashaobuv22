import { getProducts } from '../../lib/data';

export default function handler(req, res) {
  try {
    const { storeCode, page } = req.query;

    const result = getProducts(storeCode, page);

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: 'Request error' });
  }
}
