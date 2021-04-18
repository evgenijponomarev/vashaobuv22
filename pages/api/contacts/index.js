import apiHelpers from '../../../lib/api-helpers';
import { updateContacts } from '../../../lib/data';

const actions = {
  PUT(req, res) {
    const {
      storeCode,
      address,
      coordinates,
      zoom,
      apiPassword,
    } = req.body;

    apiHelpers.checkPassword(apiPassword);

    if (
      coordinates.some((coord) => Number.isNaN(coord) || typeof coord !== 'number')
      || Number.isNaN(zoom) || typeof zoom !== 'number'
    ) {
      apiHelpers.sendDataFormatError(res);
      return;
    }

    updateContacts(
      storeCode,
      address,
      coordinates,
      zoom,
    );

    apiHelpers.sendSuccessResponse(res);
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
