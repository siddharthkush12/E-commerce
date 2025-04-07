import { Router } from "express";
import { addToWishList, fetchWishlistProduct, wishlistItemDelete } from "../../controllers/shop/wishlist.controllers.js";

const router=Router();

router.route("/add").post(addToWishList);
router.route("/get/:userId").get(fetchWishlistProduct);
router.route("/remove/:userId/:productId").post(wishlistItemDelete);

export default router;