import multer from "multer";
import { v4 as uuidv4 } from 'uuid';


// const storage = multer.memoryStorage({
//     destination: function (req, file, cb) {
//       //cb-callback
//       cb(null, "./public/temp");
//     },
//     filename: function (req, file, cb) {
//         const ext = file.originalname;       
//         const safeName = uuidv4() + ext;
//         cb(null, safeName);
//     },
// });


const storage = multer.memoryStorage();

export const upload=multer({storage});

