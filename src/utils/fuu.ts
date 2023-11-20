/* eslint-disable prettier/prettier */
import {extname} from 'path';

// filter for uploading file
export const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowrd!'), false);
  }
  cb(null, true);
};
export const editFilname = (req, file, cb) => {
  cb(null, Date.now() + extname(file.originalname));
}
