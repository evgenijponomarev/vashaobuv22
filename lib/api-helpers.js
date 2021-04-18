import _ from 'lodash';
import fsHelpers from './fs-helpers';

function sendData(res, data) {
  res.status(200).json(data);
}

function sendServerError(res) {
  res.status(501).json({
    status: 'error',
    error: 'Internal server error',
  });
}

function sendNoMatchError(res, method) {
  res.status(405).json({
    status: 'error',
    error: `Method ${method} not allowed`,
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
    error: 'Invalid JSON',
  });
}

function sendDataFormatError(res) {
  res.status(502).json({
    status: 'error',
    error: 'Invalid data format',
  });
}

function sendFileNameError(res) {
  res.status(502).json({
    status: 'error',
    error: 'Invalid file name',
  });
}

function sendNotFoundError(res) {
  res.status(404).json({
    status: 'error',
    error: 'Not found',
  });
}

function sendSuccessResponse(res, data = {}) {
  res.status(200).json({
    status: 'ok',
    ...data,
  });
}

function getCommonErrors() {
  return {
    onError: (err, req, res) => sendServerError(res),
    onNoMatch: (req, res) => sendNoMatchError(res, req.method),
  };
}

function createPassword() {
  const newPassword = `--${Date.now()}--${_.uniqueId()}--`;

  fsHelpers.writeApiPassword(newPassword);

  return newPassword;
}

function getPassword() {
  return fsHelpers.getApiPassword();
}

function checkPassword(password) {
  if (password === getPassword()) throw new Error('Hacking attempt!');
}

export default {
  sendData,
  sendServerError,
  sendNoMatchError,
  sendUnzipError,
  sendJsonError,
  sendDataFormatError,
  sendSuccessResponse,
  getCommonErrors,
  sendFileNameError,
  sendNotFoundError,
  createPassword,
  getPassword,
  checkPassword,
};
