import razorpay from "../../utils/razorpay.js";
import { Order } from "../../models/orders.models.js";
import { Cart } from "../../models/cart.models.js";
import crypto from "crypto";

const createCashDeliveryOrder = async (req, res) => {
  try {
    const {
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      totalAmount,
      paymentMethod,
      paymentStatus,
      orderDate,
      orderUpdateDate,
    } = req.body;

    const newCreatedOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      totalAmount,
      paymentMethod,
      paymentStatus,
      orderDate,
      orderUpdateDate,
      paymentId: `order-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 5)}`,
    });

    await newCreatedOrder.save();

    if (cartId) {
      await Cart.findByIdAndDelete(cartId);
    }


    res.status(201).json({
      success: true,
      orders: newCreatedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      totalAmount,
      paymentMethod,
      paymentStatus,
      orderDate,
      orderUpdateDate,
      paymentId,
    } = req.body;

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId,
        addressInfo: JSON.stringify(addressInfo),
        cartItems: JSON.stringify(cartItems),
      },
    };

    razorpay.orders.create(options, async (error, order) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "error while creating razorpay order",
        });
      }
      const newCreatedOrder = new Order({
        userId,
        cartId,
        cartItems,
        addressInfo,
        orderStatus,
        totalAmount,
        paymentMethod,
        paymentStatus,
        orderDate,
        orderUpdateDate,
        paymentId: order.id,
      });

      await newCreatedOrder.save();

      res.status(201).json({
        success: true,
        razorpayOrderId: order?.id,
        orderId: newCreatedOrder._id,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      orderId,
    } = req.body;

    let order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order can not be found",
      });
    }

    const secret = process.env.RAZORPAY_SECRET;
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "payment signature failed",
      });
    }

    order.paymentStatus = "Paid";
    order.paymentMethod = "Razorpay";
    order.paymentId = razorpay_payment_id;

    const getCart = order.cartId;
    if (getCart) {
      await Cart.findByIdAndDelete(getCart);
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      order: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

const fetchOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    if (!orders) {
      return res.status(404).json({
        success: false,
        message: "no order found",
      });
    }
    return res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured in fetch orders",
    });
  }
};

export { capturePayment, createOrder, fetchOrders, createCashDeliveryOrder };
