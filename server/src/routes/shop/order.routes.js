import {Router} from 'express'
import { capturePayment, createCashDeliveryOrder, createOrder, fetchOrders } from '../../controllers/shop/order.controllers.js';


const router=Router();

router.route('/create').post(createOrder);
router.route('/createCOD').post(createCashDeliveryOrder);
router.route('/capture').post(capturePayment);
router.route('/fetchOrders/:userId').get(fetchOrders);



export default router;