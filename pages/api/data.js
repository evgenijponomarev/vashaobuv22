import path from 'path';
import nextConnect from 'next-connect';
import fsHelpers from '../../lib/fs-helpers';
import { validateData, updateData } from '../../lib/data';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const DATA_DIR = path.join(process.cwd(), 'data');
const SHOES_PHOTOS_DIR = path.join(PUBLIC_DIR, 'shoes_photos');
const DUMP_FIELD_NAME = '1s_dump';
const DUMP_FILE_NAME = `${DUMP_FIELD_NAME}.zip`;
const DATA_FILE_NAME = 'data.json';

let importFileName = '';

function sendCommonError(err, req, res) {
  res.status(501).json({
    status: 'error',
    error: `Sorry something Happened! ${err.message}`,
  });
}

function sendNoMatchError(req, res) {
  res.status(405).json({
    error: `Method '${req.method}' Not Allowed`,
  });
}

function sendUnzipError(res) {
  res.status(502).json({
    status: 'error',
    error: 'File not unzipped',
  });
}

function sendJsonError(res) {
  res.status(502).json({
    status: 'error',
    error: 'Incorrect JSON format',
  });
}

function sendSuccessResponse(res) {
  res.status(200).json({ status: 'ok' });
}

async function onSuccess(req, res) {
  try {
    await fsHelpers.unzip(DUMP_FILE_NAME, function onEntry(entry) {
      this.dir = entry.fileName === DATA_FILE_NAME ? DATA_DIR : SHOES_PHOTOS_DIR;
    });

    console.log('File unzipped');
  } catch (err) {
    console.error(err);

    sendUnzipError(res);

    process.exit(1);
  }

  try {
    const sourceData = fsHelpers.getSourceData();

    if (!validateData(sourceData)) throw new Error('Invalid data format.');

    updateData(sourceData);

    console.log('Data updated');
  } catch (err) {
    console.error(err);

    sendJsonError(res);

    process.exit(1);
  }

  fsHelpers.updateDataImportLogs(importFileName);

  sendSuccessResponse(res);
}

const uploadMiddleware = fsHelpers.getUploadMiddlware(
  DUMP_FILE_NAME,
  (originalname) => { importFileName = originalname; },
);

export default nextConnect({
  onError: sendCommonError,
  onNoMatch: sendNoMatchError,
}).use(uploadMiddleware.single(DUMP_FIELD_NAME))
  .post(onSuccess);

export const config = {
  api: { bodyParser: false },
};
