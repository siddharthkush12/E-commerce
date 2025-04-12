import {Router} from "express"
import { editProfile, fetchProfile } from "../../controllers/shop/profile.controllers.js";

const router=Router();


router.route('/edit/:userId').put(editProfile)
router.route('/fetch/:userId').get(fetchProfile)

export default router;