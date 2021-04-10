import path from 'path';
import fs from 'fs';

const actions = {
  DELETE(req) {
    const { storeCode, bannerNum, fileExt } = req.query;

    const fileName = `${storeCode}_banner_${bannerNum}.${fileExt}`;
    const filePath = path.join(process.cwd(), 'public', 'banners', fileName);

    fs.unlinkSync(filePath);
  },
};

export default function handler(req, res) {
  try {
    actions[req.method](req);

    res.status(200).json();
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: 'Request error' });
  }
}
