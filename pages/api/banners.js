import path from 'path';
import multiparty from 'multiparty';
import fsHelpers from '../../lib/fs-helpers';
import apiHelpers from '../../lib/api-helpers';

const actions = {
  DELETE(req, res) {
    const { fileName, apiPassword } = req.query;

    apiHelpers.checkPassword(apiPassword);

    if (path.dirname(fileName) !== '.') {
      throw new Error(`Invalid file name: ${fileName}`);
    }

    fsHelpers.deleteBanner(fileName);
    apiHelpers.sendSuccessResponse(res);
  },

  POST(req, res) {
    const form = new multiparty.Form();

    form.parse(req, (error, fields, files) => {
      const storeCode = fields.storeCode[0];
      const apiPassword = fields.apiPassword ? fields.apiPassword[0] : null;

      try {
        apiHelpers.checkPassword(apiPassword);
      } catch (err) {
        console.error(err);
        apiHelpers.sendServerError(res);
        return;
      }

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
    console.error(err);
    apiHelpers.sendServerError(res);
  }
}

export const config = {
  api: { bodyParser: false },
};
