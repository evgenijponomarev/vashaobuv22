import { getBonuses } from '../../lib/data';
import apiHelpers from '../../lib/api-helpers';

const actions = {
  GET(req, res) {
    const { phoneTail, cardNumber } = req.query;

    const bonusesEntry = getBonuses().find(({ phone_tail, card_number }) => (
      +phone_tail === +phoneTail && +card_number === +cardNumber
    ));

    if (!bonusesEntry) {
      apiHelpers.sendNotFoundError(res);
      return;
    }

    apiHelpers.sendData(res, { count: bonusesEntry.count });
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
