import AdminOrderDetails from '@/components/admin/AdminOrderDetails'
import { Button } from '@/components/ui/button'
import {  Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {   Table,TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog } from '@radix-ui/react-dialog'
import { useState } from 'react'

const AdminOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
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
          <TableRow>
          <TableCell>123</TableCell>
          <TableCell>123</TableCell>
          <TableCell>123</TableCell>
          <TableCell>123</TableCell>
          <TableCell>
              <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
              <Button onClick={()=>setOpenDetailsDialog(true)}>View Details</Button>
              <AdminOrderDetails />
              </Dialog>
            </TableCell>
          </TableRow>
         </TableBody>
          </Table>
      </CardContent>
    </Card>
  )
}

export default AdminOrders