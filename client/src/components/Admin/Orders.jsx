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
import AdminOrdersDetails from "./AdminOrdersDetails";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "@/store/admin/order-slice";

function Orders() {
  const dispatch = useDispatch();
  const { allOrderList } = useSelector((state) => state.adminOrder);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedOrder,setSelectedOrder]=useState(null);

  function handleViewDetail(currentOrder){
    setSelectedOrder(currentOrder)
    setOpenDetailsDialog(true)
  }

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return (
    <Card>
      <CardHeader className="text-2xl">All Orders</CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>User Id</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead className="sr-only">Order Details</TableHead>
            </TableRow>
          </TableHeader>
          {allOrderList &&
            allOrderList?.orders&&
            allOrderList?.orders.map((order) => {
              return (
                <TableBody key={order?._id}>
                  <TableRow>
                    <TableCell>{order?._id}</TableCell>
                    <TableCell>{order?.userId}</TableCell>
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
                    <TableCell>
                      <Button
                        className="bg-orange-400"
                        onClick={() => handleViewDetail(order)}
                      >
                        View Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              );
            })}
        </Table>
      </CardContent>
      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
        <DialogTitle></DialogTitle>
        <AdminOrdersDetails order={selectedOrder} setOpenDetailsDialog={setOpenDetailsDialog}/>
      </Dialog>
    </Card>
  );
}

export default Orders;
