import path from 'path';
import { app } from 'electron'

const getAssetFilePath = (fname) => path.join(app.getAppPath(), 'assets', fname)

export { getAssetFilePath }

/* export getAssetsPath = (fileName) => {
    return path.join(__static, 'assets', fileName);
} */

