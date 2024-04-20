import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../public/data/uploads'));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname),
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 3e7 }, // Set the maximum file size limit to 30,000,000 bytes (30 megabytes)
  fileFilter: function (req, file, cb) {
    // Accept all file types
    cb(null, true);
  },
}).fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'file', maxCount: 1 },
]);

export default upload;
