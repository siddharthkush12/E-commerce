import { Order } from "../../models/orders.models.js";

const fetchAllOrders=async(req,res)=>{
  try {
    
    const orders=await Order.find({})
    if(!orders.length){
      return res.status(404).json({
        success:false,
        message:"no order found"
      })
    }
    return res.status(200).json({
      success:true,
      orders:orders
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured in fetch orders",
    });
  }
}


const updateStatus=async(req,res)=>{
  try {
    const {orderId,orderStatus}=req.body;
    if (!orderId || !orderStatus) {
      return res.status(400).json({
        success: false,
        message: 'orderId and status are required',
      });
    }

    const order=await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    order.orderStatus=orderStatus
    await order.save();
    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      order,
    });

    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured updating orders",
    });
  }
}


export {fetchAllOrders, updateStatus};
