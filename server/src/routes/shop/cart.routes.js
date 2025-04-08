import { Router } from "express";
import { addCartItem, deleteCartItem, fetchCartItem, updateCartItem } from "../../controllers/shop/cart.controllers.js";


const router=Router();

router.route('/add').post(addCartItem)
router.route('/get/:userId').get(fetchCartItem)
router.route('/updateCart').put(updateCartItem)
router.route('/:userId/:productId').delete(deleteCartItem)


export default router; 