import {Router} from "express"
import { editProfile, fetchProfile, handleAvtarUpload } from "../../controllers/shop/profile.controllers.js";
import { upload } from "../../middlewares/multer.middlewares.js";

const router=Router();


router.route('/upload_avtar').post(
    upload.single("avatarFile"),handleAvtarUpload
)

router.route('/edit/:userId').put(editProfile)
router.route('/fetch/:userId').get(fetchProfile)



export default router;