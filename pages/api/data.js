import path from 'path';
import nextConnect from 'next-connect';
import fsHelpers from '../../lib/fs-helpers';
import apiHelpers from '../../lib/api-helpers';
import { validateData, updateData } from '../../lib/data';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const DATA_DIR = path.join(process.cwd(), 'data');
const SHOES_PHOTOS_DIR = path.join(PUBLIC_DIR, 'shoes_photos');
const DUMP_FIELD_NAME = '1s_dump';
const DUMP_FILE_NAME = `${DUMP_FIELD_NAME}.zip`;
const DATA_FILE_NAME = 'data.json';

let importFileName = '';

function unzipHandler(entry) {
  this.dir = entry.fileName === DATA_FILE_NAME ? DATA_DIR : SHOES_PHOTOS_DIR;
}

async function onSuccess(req, res) {
  try {
    await fsHelpers.unzip(DUMP_FILE_NAME, unzipHandler);
  } catch (err) {
    console.error(err);
    apiHelpers.sendUnzipError(res);
    return;
  }

  try {
    const sourceData = fsHelpers.getSourceData();
    if (!validateData(sourceData)) apiHelpers.sendDataFormatError(res);
    updateData(sourceData);
  } catch (err) {
    console.error(err);
    apiHelpers.sendJsonError(res);
    return;
  }

  fsHelpers.updateDataImportLogs(importFileName);
  apiHelpers.sendSuccessResponse(res);
}

const uploadMiddleware = fsHelpers.getUploadMiddlware(
  DUMP_FILE_NAME,
  (originalname) => { importFileName = originalname; },
);

export default nextConnect(apiHelpers.getCommonErrors())
  .use(uploadMiddleware.single(DUMP_FIELD_NAME))
  .post(onSuccess);

export const config = {
  api: { bodyParser: false },
};
