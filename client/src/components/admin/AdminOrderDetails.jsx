import { DialogContent } from "@radix-ui/react-dialog"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { Label } from "@radix-ui/react-label"
import { Badge } from "lucide-react"
import CommonForm from "../common/CommonForm"
import { useState } from "react"

const initialFormData = {
  status: '',

}

const AdminOrderDetails = () => {

  const [formData, setFormData] = useState(initialFormData)

  const handleUpdateStatus = (e) => {
    e.preventDefault()
    
  }

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            {/* <Label>{orderDetails?._id}</Label> */}
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            {/* <Label>{orderDetails?.orderDate.split("T")[0]}</Label> */}
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            {/* <Label>${orderDetails?.totalAmount}</Label> */}
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment method</p>
            {/* <Label>{orderDetails?.paymentMethod}</Label> */}
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            {/* <Label>{orderDetails?.paymentStatus}</Label> */}
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                // className={`py-1 px-3 ${
                //   orderDetails?.orderStatus === "confirmed"
                //     ? "bg-green-500"
                //     : orderDetails?.orderStatus === "rejected"
                //     ? "bg-red-600"
                //     : "bg-black"
                // }`}
              >
                {/* {orderDetails?.orderStatus} */}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3"></ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
                <span>test</span>
                <span>test</span>
                <span>1234</span>
                <span>123456789</span>
                <span>notes</span>

            </div>
          </div>  
        </div>

        <div>
          <CommonForm  formControls={[
            {
              label: "Order Status",
              name: "status",
              componentType: "select",
              options: [
                { id: "pending", label: "Pending" },
                { id: "inProcess", label: "In Process" },
                { id: "inShipping", label: "In Shipping" },
                { id: "delivered", label: "Delivered" },
                { id: "rejected", label: "Rejected" },
              ],
            },
          ]}
          formData={formData}
          setFormData={setFormData}
          buttonText={"Update Order Status"}
          onSubmit={handleUpdateStatus}
          />

        </div>
      </div>
    </DialogContent>
  )
}

export default AdminOrderDetails