import multiparty from 'multiparty';
import fsHelpers from '../../lib/fs-helpers';
import apiHelpers from '../../lib/api-helpers';
import { updateData } from '../../lib/data';

const actions = {
  POST(req, res) {
    const form = new multiparty.Form();

    form.parse(req, async (error, fields, files) => {
      const apiPassword = fields.apiPassword ? fields.apiPassword[0] : null;

      try {
        apiHelpers.checkPassword(apiPassword);
      } catch (err) {
        console.error(err);
        apiHelpers.sendServerError(res);
        return;
      }

      const fileData = files.data[0];
      await fsHelpers.saveSourceData(fileData);
      const sourceData = fsHelpers.getSourceData();
      updateData(sourceData);
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
