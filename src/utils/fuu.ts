/* eslint-disable prettier/prettier */
import { extname } from 'path';

// filter for uploading file
export const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowrd!'), false);
  }
  cb(null, true);
};
export const editFilname = (req, file, cb) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  cb(null, `${name}-${randomName}${fileExtName}`);
};
