import path from 'path';
import fs from 'fs';
import nextConnect from 'next-connect';
import multer from 'multer';
import extractZip from 'extract-zip';
import CyrillicToTranslit from 'cyrillic-to-translit-js';

const cyrillicToTranslit = new CyrillicToTranslit();

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const DATA_DIR = path.join(process.cwd(), 'data');
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
const SHOES_PHOTOS_DIR = path.join(PUBLIC_DIR, 'shoes_photos');
const DUMP_FILE_NAME = '1s_dump';
const DUMP_FILE_PATH = path.join(UPLOADS_DIR, `${DUMP_FILE_NAME}.zip`);
const DATA_FILE_NAME = 'data.json';
const DATA_FILE_PATH = path.join(DATA_DIR, DATA_FILE_NAME);
const STORES_FILE_PATH = path.join(DATA_DIR, 'stores.json');
const BONUSES_FILE_PATH = path.join(DATA_DIR, 'bonuses.json');

const buildData = () => {
  const sourceData = JSON.parse(fs.readFileSync(DATA_FILE_PATH));
  const bonuses = sourceData.bonuses;
  const stores = [];

  sourceData.stores.forEach(storeName => {
    const storeCode = cyrillicToTranslit.transform(storeName, '_').toLowerCase();

    stores.push({
      name: storeName,
      code: storeCode,
    });

    const storeProducts = sourceData.products
      .filter(product => product.store === storeName)
      .map(product => {
        const shoesEntry = sourceData.shoes.find(shoe => shoe.code === product.shoe_code);

        return {
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

    const filePath = path.join(DATA_DIR, `products.${storeCode}.json`);
    fs.writeFileSync(filePath, JSON.stringify(storeProducts));
  });

  fs.writeFileSync(STORES_FILE_PATH, JSON.stringify(stores));
  fs.writeFileSync(BONUSES_FILE_PATH, JSON.stringify(bonuses));
};

const onError = (error, req, res) => {
  res.status(501).json({
    status: 'error',
    error: `Sorry something Happened! ${error.message}`,
  });
};

const onNoMatch = (req, res) => {
  res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
};

const onSuccess = async (req, res) => {
  try {
    await extractZip(DUMP_FILE_PATH, {
      dir: UPLOADS_DIR,
      onEntry: function(entry) {
        this.dir = entry.fileName === DATA_FILE_NAME ? DATA_DIR : SHOES_PHOTOS_DIR;
      },
    });

    buildData();

    res.status(200).json({ status: 'ok' });
  } catch (err) {
    console.log(err);

    res.status(502).json({
      status: 'error',
      error: 'File was not unzipped',
    });
  }
};

const uploadMiddleware = multer({
  storage: multer.diskStorage({
    destination: UPLOADS_DIR,
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
}).single(DUMP_FILE_NAME);

export default nextConnect({ onError, onNoMatch })
  .use(uploadMiddleware)
  .post(onSuccess);

export const config = {
  api: { bodyParser: false },
};
