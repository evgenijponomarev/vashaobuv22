import path from 'path';
import multiparty from 'multiparty';
import fsHelpers from '../../lib/fs-helpers';
import apiHelpers from '../../lib/api-helpers';

const actions = {
  DELETE(req, res) {
    const { fileName } = req.query;

    if (path.dirname(fileName) !== '.') {
      throw new Error(`Invalid file name: ${fileName}`);
    }

    fsHelpers.deleteBanner(fileName);
    apiHelpers.sendSuccessResponse(res);
  },

  POST(req, res) {
    const form = new multiparty.Form();

    form.parse(req, (err, fields, files) => {
      const storeCode = fields.storeCode[0];
      const fileData = files.banner[0];
      fsHelpers.saveBanner(storeCode, fileData);
      apiHelpers.sendSuccessResponse(res);
    });
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

export const config = {
  api: { bodyParser: false },
};
