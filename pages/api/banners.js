import fsHelpers from '../../lib/fs-helpers';

const actions = {
  DELETE(req) {
    const { storeCode, bannerNum, fileExt } = req.query;

    fsHelpers(storeCode, bannerNum, fileExt);
  },
  POST() {

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
