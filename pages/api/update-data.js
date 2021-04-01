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
const DUMP_FIELD_NAME = '1s_dump';
const DUMP_FILE_NAME = `${DUMP_FIELD_NAME}.zip`;
const DUMP_FILE_PATH = path.join(UPLOADS_DIR, DUMP_FILE_NAME);
const DATA_FILE_NAME = 'data.json';
const DATA_FILE_PATH = path.join(DATA_DIR, DATA_FILE_NAME);
const STORES_FILE_PATH = path.join(DATA_DIR, 'stores.json');
const BONUSES_FILE_PATH = path.join(DATA_DIR, 'bonuses.json');
const LOG_FILE_PATH = path.join(process.cwd(), '1s_import.log');

let importFileName = '';

function validateData (data) {
  return !!data.stores
    && !!data.bonuses
    && !!data.shoes
    && !!data.products;
}

function makeDataFiles() {
  const sourceData = JSON.parse(fs.readFileSync(DATA_FILE_PATH));

  if (!validateData(sourceData)) {
    throw new Error('Invalid data format.');
  }

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

    const filePath = path.join(DATA_DIR, `products.${storeCode}.json`);
    fs.writeFileSync(filePath, JSON.stringify(storeProducts));
  });

  fs.writeFileSync(STORES_FILE_PATH, JSON.stringify(stores));
  fs.writeFileSync(BONUSES_FILE_PATH, JSON.stringify(bonuses));
}

async function unzip() {
  try {
    await extractZip(DUMP_FILE_PATH, {
      dir: UPLOADS_DIR,
      onEntry: function(entry) {
        this.dir = entry.fileName === DATA_FILE_NAME ? DATA_DIR : SHOES_PHOTOS_DIR;
      },
    });

    console.log('File unzipped');
  } catch (err) {
    console.error(err);

    res.status(502).json({
      status: 'error',
      error: 'File not unzipped',
    });

    process.exit(1);
  }
}

function buildData() {
  try {
    makeDataFiles();
    console.log('Data updated');
  } catch (err) {
    console.error(err);

    res.status(502).json({
      status: 'error',
      error: 'Incorrect JSON format',
    });

    process.exit(1);
  };
}

function onError(error, req, res) {
  res.status(501).json({
    status: 'error',
    error: `Sorry something Happened! ${error.message}`,
  });
}

function onNoMatch(req, res) {
  res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
}

async function onSuccess(req, res) {
  await unzip();
  buildData();

  const currentTimestamp = Date.now();
  const currentTime = new Date(currentTimestamp).toString()

  fs.appendFileSync(LOG_FILE_PATH, `Time: ${currentTime}. Filename: ${importFileName}\n`);

  res.status(200).json({ status: 'ok' });
}

const uploadMiddleware = multer({
  storage: multer.diskStorage({
    destination: UPLOADS_DIR,
    filename: (req, file, cb) => {
      importFileName = file.originalname;
      cb(null, DUMP_FILE_NAME);
    },
  }),
});

export default nextConnect({ onError, onNoMatch })
  .use(uploadMiddleware.single(DUMP_FIELD_NAME))
  .post(onSuccess);

export const config = {
  api: { bodyParser: false },
};
