import { useEffect, useState } from "react"
import { Input } from "../../components/ui/input"
import { useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getSearchResults, resetSearchResults } from "@/redux/shop/search-slice"
import ProductCard from "@/components/shop/ProductCard"
import { useToast } from "@/hooks/use-toast"
import { addToCart, fetchCartItems } from "@/redux/shop/cart-slice"
import { fetchProductDetails } from "@/redux/shop/product-slice"
import ProductDetails from "@/components/shop/ProductDetails"

const Search = () => {

    const [keyword, setKeyword] = useState('')
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const {searchResults} = useSelector((state) => state.shoppingSearch)
    const { productDetails } = useSelector((state) => state.shoppingProducts);
    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.shoppingCart);
    const { toast } = useToast();
    const dispatch = useDispatch();
 
   useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword]);

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    console.log(cartItems);
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

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
          toast({
            title: "Product is added to cart",
          });
        }
      });
    }
  
    function handleGetProductDetails(getCurrentProductId) {
      console.log(getCurrentProductId);
      dispatch(fetchProductDetails(getCurrentProductId));
    }
  
    useEffect(() => {
      if (productDetails !== null) setOpenDetailsDialog(true);
    }, [productDetails]);
  
  
  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
    <div className="flex justify-center mb-8">
      <div className="w-full flex items-center">
        <Input
          value={keyword}
          name="keyword"
          onChange={(event) => setKeyword(event.target.value)}
          className="py-6"
          placeholder="Search Products..."
        />
      </div>
    </div>
    {!searchResults.length ? (
      <h1 className="text-5xl font-extrabold">No result found!</h1>
    ) : null}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {searchResults.map((item) => (
        <ProductCard
          handleAddToCart={handleAddToCart}
          product={item}
          handleGetProductDetails={handleGetProductDetails}
        />
      ))}
    </div>
    <ProductDetails
      open={openDetailsDialog}
      setOpen={setOpenDetailsDialog}
      productDetails={productDetails}
    />
  </div>
  )
}

export default Search