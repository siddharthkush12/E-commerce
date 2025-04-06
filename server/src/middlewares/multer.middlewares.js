import multer from "multer";
import { v4 as uuidv4 } from 'uuid';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //cb-callback
      cb(null, "./public/temp");
    },
    filename: function (req, file, cb) {
        const ext = file.originalname;       
        const safeName = uuidv4() + ext;
        cb(null, safeName);
    },
});

export const upload=multer({storage});

