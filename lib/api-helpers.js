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

export default {
  sendServerError,
  sendNoMatchError,
  sendUnzipError,
  sendJsonError,
  sendDataFormatError,
  sendSuccessResponse,
  getCommonErrors,
  sendFileNameError,
};
