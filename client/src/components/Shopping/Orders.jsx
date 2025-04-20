import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog, DialogTitle } from "../ui/dialog";
import ShoppingOrderDetail from "./ShoppingOrderDetail";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrder,
} from "@/store/shop/order-slice";

function Orders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { orderList} = useSelector((state) => state.shopOrder);
  const [selectedOrder,setSelectedOrder]=useState(null);

  function handleDetailDialog(currentOrderId) {
    setSelectedOrder(currentOrderId);
    setOpenDetailsDialog(true);
  }

  useEffect(() => {
    dispatch(fetchOrder(user?.id));
  }, [dispatch]);

  return (
    <Card>
      <CardHeader>Order History</CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead className="sr-only">Order Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList &&
              orderList.length > 0 &&
              orderList.map((order) => {
                return (
                  <TableRow key={order?._id}>
                    <TableCell className="max-w-25 truncate">
                      {order?._id}
                    </TableCell>
                    <TableCell>
                      {order?.orderDate
                        .slice(0, 10)
                        .split("-")
                        .reverse()
                        .join("-")}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`border p-1 px-2 rounded-lg ${{
                          Pending: "bg-yellow-400",
                          Shipped: "bg-blue-400",
                          Delivered: "bg-green-400",
                          Rejected: "bg-red-500",
                        }[order?.orderStatus] || "bg-orange-400"}`}
                      >
                        {order?.orderStatus}
                      </span>
                    </TableCell>
                    <TableCell>₹ {order?.totalAmount}</TableCell>
                    <TableCell>{order?.paymentStatus}</TableCell>
                    <TableCell>
                      <Button
                        className="bg-orange-400"
                        onClick={() => handleDetailDialog(order)}
                      >
                        View Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </CardContent>
      <Dialog
        open={openDetailsDialog}
        onOpenChange={setOpenDetailsDialog}>
        <DialogTitle></DialogTitle>
        <ShoppingOrderDetail order={selectedOrder} />
      </Dialog>
    </Card>
  );
}

export default Orders;
