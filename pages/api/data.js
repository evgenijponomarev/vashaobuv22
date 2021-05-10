import multiparty from 'multiparty';
import fsHelpers from '../../lib/fs-helpers';
import apiHelpers from '../../lib/api-helpers';
import { updateData } from '../../lib/data';

const actions = {
  POST(req, res) {
    console.log('DATA UPLOADING REQUEST:\n');
    console.log(req);

    const form = new multiparty.Form();

    form.parse(req, async (error, fields, files) => {
      console.log('DATA UPLOADING ERROR:\n');
      console.log(error);
      console.log('DATA UPLOADING FIELDS:\n');
      console.log(fields);
      console.log('DATA UPLOADING files:\n');
      console.log(files);
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
