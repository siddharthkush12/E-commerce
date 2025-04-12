import { Router } from "express";
import { addAddress, deleteAddress, editAddress, fetchAddress } from "../../controllers/shop/address.controllers.js";



const router=Router();

router.route('/add').post(addAddress)
router.route('/get/:userId').get(fetchAddress)
router.route('/update/:userId/:addressId').put(editAddress)
router.route('/delete/:userId/:addressId').delete(deleteAddress)


export default router; 