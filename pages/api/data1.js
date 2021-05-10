import path from 'path';
import nextConnect from 'next-connect';
import fsHelpers from '../../lib/fs-helpers';
import apiHelpers from '../../lib/api-helpers';
import { validateData, updateData } from '../../lib/data';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const DATA_DIR = path.join(process.cwd(), 'data');
const SHOES_PHOTOS_DIR = path.join(PUBLIC_DIR, 'shoes_photos');
const DUMP_FIELD_NAME = 'data';
const DUMP_FILE_NAME = `${DUMP_FIELD_NAME}.zip`;
const DATA_FILE_NAME = 'data.json';

let importFileName = '';

async function onSuccess(req, res) {
  try {
    await fsHelpers.unzip(DUMP_FILE_NAME, function onEntry(entry) {
      this.dir = entry.fileName === DATA_FILE_NAME ? DATA_DIR : SHOES_PHOTOS_DIR;
    });

    console.log('File unzipped');
  } catch (err) {
    console.error(err);

    apiHelpers.sendServerError(res);

    process.exit(1);
  }

  try {
    const sourceData = fsHelpers.getSourceData();

    if (!validateData(sourceData)) throw new Error('Invalid data format.');

    updateData(sourceData);

    console.log('Data updated');
  } catch (err) {
    console.error(err);

    apiHelpers.sendServerError(res);

    process.exit(1);
  }

  fsHelpers.updateDataImportLogs(importFileName);

  apiHelpers.sendSuccessResponse(res);
}

const uploadMiddleware = fsHelpers.getUploadMiddlware(
  DUMP_FILE_NAME,
  (originalname) => { importFileName = originalname; },
);

export default nextConnect({
  onError: (err, req, res) => {console.error(err); apiHelpers.sendServerError(res); },
  onNoMatch: (req, res) => apiHelpers.sendNoMatchError(res),
}).use(uploadMiddleware.single(DUMP_FIELD_NAME))
  .post(onSuccess);

export const config = {
  api: { bodyParser: false },
};
