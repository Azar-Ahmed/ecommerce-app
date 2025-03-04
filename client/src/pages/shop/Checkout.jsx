import Address from '@/components/shop/Address'
import img from '../../assets/account.jpg'
import { useDispatch, useSelector } from 'react-redux'
import CartItemContent from '@/components/shop/CartItemContent'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { createOrder } from '@/redux/shop/order-slice'
import { useToast } from '@/hooks/use-toast'
const Checkout = () => {
  const { cartItems } = useSelector((state) => state.shoppingCart)
  const { user } = useSelector((state) => state.auth)
 const {approvalUrl} = useSelector((state) => state.shoppingOrder)
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null)
  const [isPaymentStart, setIsPaymentStart] = useState(false)
  const dispatch = useDispatch()
 const {toast} = useToast();
  const totalCartAmt =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0,
        )
      : 0

 const handleInitiatePaypalPayment = () => {
  if(cartItems.length === 0) {
    toast({title: "Your Cart Is Empty, Please add items to proceed", variant: "destructive"})
    return;
  }
  
  if(currentSelectedAddress === null){
    toast({title: "Please select address to proceed", variant: "destructive"})
    return;
  } 
 
 
  const orderData = {
   userId : user?.id,
   cartId: cartItems?._id,
    cartItems : cartItems.items.map((singleCartItem) => ({
      productId: singleCartItem?.productId,
      title: singleCartItem?.title,
      image: singleCartItem?.image,
      price: singleCartItem?.salePrice > 0 ? singleCartItem?.salePrice : singleCartItem?.price,
      quantity: singleCartItem?.quantity
    })),
    addressInfo : {
      addressId: currentSelectedAddress?._id,
      address: currentSelectedAddress?.address,
      city: currentSelectedAddress?.city,
      pincode: currentSelectedAddress?.pincode,
      phone: currentSelectedAddress?.phone,
      notes: currentSelectedAddress?.notes, 
    },
    orderStatus : "pending",
    paymentMethod : "paypal",
    paymentStatus : "pending",
    totalAmount :  totalCartAmt,
    orderDate : new Date(),
    orderUpdateDate : new Date(),
    paymentId : '',
    payerId : '', 
  }

  dispatch(createOrder(orderData)).then((data)=> {
    console.log("order: " + data)
    if(data?.payload?.success) {
      setIsPaymentStart(true)
    }else{
      setIsPaymentStart(false)
    }
  }).catch((err) => {
    console.log("order err " + err)
  })
 }

 if(approvalUrl){
  window,location.href = approvalUrl
 }
  
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => <CartItemContent cartItem={item} key={item.id} />)
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmt}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button  className="w-full" onClick={handleInitiatePaypalPayment}>
            Checkout with Paypal
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
