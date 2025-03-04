import { Table,TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Dialog } from '../../components/ui/dialog'
import { Button } from '../ui/button'
import OrderDetails from './OrderDetails'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersByUser, getOrderDetails, resetOrderDetails } from '@/redux/shop/order-slice'
import { Badge } from '../../components/ui/badge'

const Orders = () => {
const [openDetailsDialog, setOpenDetailsDialog]= useState(false)
const {user} = useSelector((state) => state.auth)
const {orderList, orderDetails} = useSelector((state) => state.shoppingOrder)
const dispatch = useDispatch()

console.log(orderDetails)

function handleFetchOrderDetails(getId) {
  dispatch(getOrderDetails(getId))
}

useEffect(()=> {
  dispatch(getAllOrdersByUser(user?.id))
}, [dispatch])

useEffect(()=>{
  if(orderDetails !== null) setOpenDetailsDialog(true)
}, [orderDetails])

return (
  <Card>
  <CardHeader>
    <CardTitle>Order History</CardTitle>
  </CardHeader>
  <CardContent>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Order Date</TableHead>
          <TableHead>Order Status</TableHead>
          <TableHead>Order Price</TableHead>
          <TableHead>
            <span className="sr-only">Details</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderList && orderList.length > 0 ? orderList.map((orderItem) => (
           <TableRow key={orderItem?._id}>
           <TableCell>{orderItem?._id}</TableCell>
           <TableCell>{orderItem?.orderDate.split('T')[0]}</TableCell>
           <TableCell>
           <Badge className={`py-1 px-3 ${orderItem?.orderStatus === "confirmed" ? "bg-green-500" : orderItem?.orderStatus === "rejected" ? "bg-red-600" : "bg-black" } `}>
                {orderItem?.orderStatus}
           </Badge>
                      {/* {orderItem?.orderStatus} */}
           </TableCell>
           <TableCell>{orderItem?.totalAmount}</TableCell>
           <TableCell>
           <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
             <Button onClick={()=> handleFetchOrderDetails(orderItem?._id)}>View Details</Button>
             <OrderDetails orderDetails={orderDetails} />
             </Dialog>
           </TableCell>
         </TableRow>
        )) : null}
       
        </TableBody>
        </Table>
    </CardContent>
  </Card>
  )
}

export default Orders