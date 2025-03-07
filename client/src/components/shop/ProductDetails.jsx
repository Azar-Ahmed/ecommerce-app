import { setProductDetails } from '@/redux/shop/product-slice'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from 'react-redux'
import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { Label } from '@radix-ui/react-label';
import { addToCart, fetchCartItems } from '@/redux/shop/cart-slice';

import { useToast } from '@/hooks/use-toast'


const ProductDetails = ({ open, setOpen, productDetails }) => {
  
  const {toast} = useToast()
  const dispatch = useDispatch()
  const {cartItems} = useSelector((state) => state.shoppingCart)
  const {user} = useSelector((state) => state.auth)


  function handleDialogClose() {
    setOpen(false)
    dispatch(setProductDetails())
  }

  const handleAddToCart = (getCurrentProductId, getTotalStock) => {
  
    let getCartItems = cartItems.items || []
    if(getCartItems.length){
      const indexOfCurrentItem = getCartItems.findIndex((item) => item.productId === getCurrentProductId)
     
      if(indexOfCurrentItem > -1){
          const getQuantity = getCartItems[indexOfCurrentItem].quantity;
          if(getQuantity + 1 > getTotalStock){
            toast({title: `Only ${getQuantity} quantity can be added for this item!`, variant: 'destructive'})
            return;
          }  
      }
     
  
    }

        dispatch(
          addToCart({
            userId: user?.id,
            productId: getCurrentProductId,
            quantity: 1,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchCartItems(user?.id));
            toast({title: "Product is added to cart."})
          }
        });
      }
  return (
    <>
      <Dialog open={open} onOpenChange={handleDialogClose}>
        <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              width={600}
              height={600}
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="">
            <div>
              <h1 className="text-3xl font-extrabold">
                {productDetails?.title}
              </h1>
              <p className="text-muted-foreground text-2xl mb-5 mt-4">
                {productDetails?.description}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p
                className={`text-3xl font-bold text-primary ${
                  productDetails?.salePrice > 0 ? 'line-through' : ''
                }`}
              >
                ${productDetails?.price}
              </p>
              {productDetails?.salePrice > 0 ? (
                <p className="text-2xl font-bold text-muted-foreground">
                  ${productDetails?.salePrice}
                </p>
              ) : null}
            </div>
            <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              {/* <StarRatingComponent rating={averageReview} /> */}
            </div>
            <span className="text-muted-foreground">
              {/* ({averageReview.toFixed(2)}) */}
            </span>
          </div>
            <div className="mt-5 mb-5">
              {
                productDetails?.totalStock === 0 ? (<Button className="w-full opacity-60 cursor-not-allowed">Out Of Stock</Button>) : (
                <Button className="w-full" onClick={()=>handleAddToCart(productDetails?._id, productDetails?.totalStock)}>Add To Cart</Button>
                )
              }
            </div>
              <Separator />
              <div className="max-h-[300px] overflow-auto">
                <h2 className="text-xl font-bold mb-4">Reviews</h2>
                <div className="grid gap-6">
                    <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {/* {reviewItem?.userName[0].toUpperCase()} */}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        {/* <h3 className="font-bold">{reviewItem?.userName}</h3> */}
                      </div>
                      <div className="flex items-center gap-0.5">
                        {/* <StarRatingComponent rating={reviewItem?.reviewValue} /> */}
                      </div>
                      <p className="text-muted-foreground">
                        {/* {reviewItem.reviewMessage} */}
                      </p>
                    </div>
                    </div>
                </div>
                <div className="mt-10 flex-col flex gap-2">
                    <Label>Write a review</Label>
                    <div className="flex gap-1">
                {/* <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                /> */}
                 </div>
                    <Input
                name="reviewMsg"
                // value={reviewMsg}
                // onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Write a review..."
              />
              <Button
                // onClick={handleAddReview}
                // disabled={reviewMsg.trim() === ""}
              >
                Submit
              </Button>
              </div>
          </div>
        </div>
        </DialogContent>
     </Dialog>

    </>
  )
}

export default ProductDetails
