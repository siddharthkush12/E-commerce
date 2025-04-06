import {Router} from "express";

import { handleImageUpload, addProduct, fetchProduct, editProduct, deleteProduct } from "../../controllers/admin/adminProduct.controllers.js";
import { upload } from "../../middlewares/multer.middlewares.js";



const router=Router(); 

router.route("/upload_image").post(
    upload.single("imageFile"),
    handleImageUpload
);

router.route("/add").post(addProduct);
router.route("/get").get(fetchProduct);
router.route("/edit/:id").put(editProduct);
router.route("/delete/:id").delete(deleteProduct);



export default router;