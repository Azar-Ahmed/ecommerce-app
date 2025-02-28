import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import CartItemContent from './CartItemContent'
const CartWrapper = ({ cartItems, setOpenCartSheet }) => {

 const totalCartAmt = cartItems && cartItems.length > 0 ? cartItems.reduce((sum, currentItem) => sum + (currentItem?.salePrice > 0 ? currentItem.salePrice : currentItem.price) * currentItem?.quantity, 0) : 0
 
 const navigate = useNavigate()
 return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => <CartItemContent cartItem={item}/>)
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmt}</span>
        </div>
      </div>
      <Button onClick={()=>navigate('/shop/checkout')} className="w-full mt-6">Checkout</Button>
    </SheetContent>
  )
}

export default CartWrapper
