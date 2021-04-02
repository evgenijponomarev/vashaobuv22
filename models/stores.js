import path from 'path';
import fs from 'fs';

function getList() {
  const dataPath = path.join(process.cwd(), 'data', `stores.json`);
  const data = JSON.parse(fs.readFileSync(dataPath));

  return data;
}

export default {
  getList,
};
