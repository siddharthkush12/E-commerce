import {Router} from 'express'
import { fetchAllOrders, updateStatus } from '../../controllers/admin/adminOrders.controllers.js';



const router=Router();


router.route('/updateStatus').post(updateStatus);
router.route('/fetchAllOrders').get(fetchAllOrders);



export default router;