import {paypal} from '../../utils/paypal.js'
import {Order} from '../../models/orders.models.js'


const createOrder=async(req,res)=>{
    try {
        const {
            userId,
            cartItems,
            addressInfo,
            totalAmount,
            paymentMethod,
            paymentStatus,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId,
          } = req.body;

          const create_payment_json={
            intent:'sale',
            payer:{
                payment_method:'paypal'
            },
            redirect_urls:{
                return_url:'http://localhost:5173/shop/paypal-return',
                cancel_url:'http://localhost:5173/shop/paypal-cancel'
            },
            transactions:[
                {
                    item_list:{
                        items:cartItems.map(item=>({
                            name:item.title,
                            sku:item.productId,
                            price:item.price.toFixed(2),
                            currency:'INR',
                            quantity:item.quantity
                        }))
                    },
                    amount:{
                        currency:'INR',
                        total:totalAmount.toFixed(2) 
                    },
                    description:'description'
                }
            ]
          }

          paypal.payment.create(create_payment_json,async(error,paymentInfo)=>{
            if(error){
                console.log(error);
                return res.status(500).json({
                    success:false,
                    message:"Error while creating paypal payment"
                })
            }
            else{
                const newCreatedOrder=new Order({
                    userId,
                    cartItems,
                    addressInfo,
                    totalAmount,
                    paymentMethod,
                    paymentStatus,
                    orderDate,
                    orderUpdateDate,
                    paymentId,
                    payerId,
                })

                await newCreatedOrder.save();

                const approvalURL=paymentInfo.links.find(link=>link.rel==='approval_url').href;

                res.status(201).json({
                    success:true,
                    approvalURL,
                    orderId:newCreatedOrder._id
                })
            }


          })




    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"some error occured"
        })
    }
}




const capturePayment=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"some error occured"
        })
    }
}


export {capturePayment,createOrder}