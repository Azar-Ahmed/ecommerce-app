import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";

const ProductCard = ({product, handleGetProductDetails, handleAddToCart}) => {

  return (
    <>
        <Card className="w-full max-w-sm mx-auto">
            <div onClick={()=>handleGetProductDetails(product?._id)}>
                <div className="relative">
                    <img src={product?.image} alt={product?.title}  className="w-full h-[300px] object-cover rounded-t-lg" />
                    {product?.salePrice > 0 ? (<Badge className="absolute top-1 left-2 bg-red-500 hover:bg-red-600">Sale</Badge>) : null}
                </div>
                <CardContent className="p-4">
                    <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">{categoryOptionsMap[product?.category]}</span>
                        <span className="text-sm text-muted-foreground">{brandOptionsMap[product?.brand]}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className={`${product?.salePrice > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>${product?.price}</span>
                       {product?.salePrice > 0 ?  <span className='text-lg font-semibold text-primary'>${product?.salePrice}</span> : null}
                    </div>
                </CardContent>
            </div>
                <CardFooter>
                    <Button className="w-full" onClick={()=>handleAddToCart(product?._id)}>Add to Cart</Button>
                </CardFooter>
        </Card>
    </>
  )
}

export default ProductCard