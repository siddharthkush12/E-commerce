import React, { useState } from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import Form from "../common/Form";
import { useDispatch } from "react-redux";
import { fetchAllOrders, updateOrderStatus } from "@/store/admin/order-slice";

const initialFormData = {
  orderStatus: "",
};

function AdminOrdersDetails({ order, setOpenDetailsDialog }) {
  const [formData, setFormData] = useState(initialFormData);
  const dispatch=useDispatch();
  console.log(formData);
  function handleUpdateStatus(e) {
    e.preventDefault();
    dispatch(updateOrderStatus({orderId:order?._id,orderStatus:formData.orderStatus})).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchAllOrders(order?._id))
        setOpenDetailsDialog(false)
      }
    })
  }

  return (
    <DialogContent aria-describedby={undefined}>
      <div className="flex flex-col gap-1 mt-2 p-3">
        <div className="flex justify-between ">
          <p>Order Id</p>
          <Label>{order?._id}</Label>
        </div>
        <div className="flex justify-between ">
          <p>User Id</p>
          <Label>{order?.userId}</Label>
        </div>
        <div className="flex justify-between ">
          <p>Order Date</p>
          <Label>
            {order?.orderDate.slice(0, 10).split("-").reverse().join("-")}
          </Label>
        </div>
        <div className="flex justify-between ">
          <p>Order Price</p>
          <Label>₹ {order?.totalAmount}</Label>
        </div>
        <div className="flex justify-between ">
          <p>Payment Method</p>
          <Label>{order?.paymentMethod}</Label>
        </div>
        <div className="flex justify-between ">
          <p>Payment Status</p>
          <Label>{order?.paymentStatus}</Label>
        </div>
        <div className="flex justify-between ">
          <p>Order Status</p>
          <Label>{order?.orderStatus}</Label>
        </div>

        <Separator className='my-2'/>

        <div className="grid gap-4 max-h-[30vh] overflow-scroll">
          <ul className="grid gap-2">
            {order &&
              order?.cartItems &&
              order?.cartItems.map((item) => {
                return (
                  <li className="flex py-1 flex-row gap-2" key={item?._id}>
                    <div>
                      <img src={item.image} className="w-15 rounded" />
                    </div>
                    <div className="flex justify-between gap-10 w-full">
                      <div>
                        <span className="block w-40 md:w-60 truncate">{item.title}</span>
                        <span>Quantity: {item.quantity}</span>
                      </div>
                      <span>₹ {item.price}</span>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
        <Separator className='my-2'/>

        <div className="grid gap-4 mb-1">
          <div className="grid gap-2">
            <div className="text-lg text-center">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              
              <span>Address: {order?.addressInfo?.address}</span>
              <span>City: {order?.addressInfo?.city}</span>
              <span>Phone: {order?.addressInfo?.phone}</span>
              <span>Pincode: {order?.addressInfo?.pincode}</span>
            </div>
          </div>
        </div>

        <div>
          <Form
            formControls={[
              {
                name: "orderStatus",
                label: "Status",
                placeholder: "Enter Order Status",
                componentType: "select",
                options: [
                  { id: "Pending", label: "Pending"  },
                  { id: "Shipped", label: "Shipped" },
                  { id: "Rejected", label: "Rejected" },
                  { id: "Delivered", label: "Delivered" },
                ],
              },
            ]}
            formData={formData}
            buttonText={"Update Order Status"}
            onSubmit={(e)=>handleUpdateStatus(e)}
            setFormData={setFormData}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrdersDetails;
