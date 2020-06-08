let multer = require("multer");
//const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      file.mimetype === "audio/mpeg" ||
      file.mimetype === "audio/wave" ||
      file.mimetype === "audio/wav" ||
      file.mimetype === "audio/mp3"
       ) {
        cb(null, "./uploads");
       }
       else if(
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png'
       ){
        cb(null, "./images");
       }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); 
  }
});
const fileFilter = (req, file, cb) => {
  if (
     file.mimetype === "audio/mpeg" ||
     file.mimetype === "audio/wave" ||
     file.mimetype === "audio/wav" ||
     file.mimetype === "audio/mp3"  ||
     file.mimetype === 'image/jpg' ||
     file.mimetype === 'image/jpeg' ||
     file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
exports.upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

