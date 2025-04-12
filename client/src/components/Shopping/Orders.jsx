import React, { useState } from "react";
import { Card, CardContent, CardHeader} from "../ui/card";
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




function Orders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
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
              <TableHead className="sr-only">Order Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>221</TableCell>
              <TableCell>221</TableCell>
              <TableCell>In process</TableCell>
              <TableCell>2500</TableCell>
              <TableCell>
                <Button
                  className="bg-orange-400"
                  onClick={() => setOpenDetailsDialog(true)}
                >
                  View Detail
                </Button>
                <Dialog
                  open={openDetailsDialog}
                  onOpenChange={setOpenDetailsDialog}
                >
                  <DialogTitle></DialogTitle>
                  <ShoppingOrderDetail />
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default Orders;
