import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ArrowUpDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Filter from '../../components/shop/Filter'
import { sortOptions } from '@/config'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilteredProducts, fetchProductDetails } from '@/redux/shop/product-slice'
import ProductCard from '@/components/shop/ProductCard'
import ProductDetails from '@/components/shop/ProductDetails'
import { useSearchParams } from 'react-router-dom'
import { addToCart, fetchCartItems } from '@/redux/shop/cart-slice'
import { useToast } from '@/hooks/use-toast'


function createSearchParamsHelper(filterParams){
    const queryParams = [];
    for(const [key, value] of Object.entries(filterParams)){
      if(Array.isArray(value) && value.length > 0){
        const paramValue = value.join(",")
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}` )
       }
    }
    return queryParams.join('&')
}

const Listing = () => {
  const dispatch = useDispatch()
  
  const {cartItems} = useSelector((state) => state.shoppingCart)
  const {user} = useSelector((state) => state.auth)
  const { productList, productDetails } = useSelector((state) => state.shoppingProducts)
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [openDetailDialog, setOpenDetailDialog] = useState(false)
  const {toast} = useToast()
  
  const categorySearchParam = searchParams.get("category");
  
  const handleSort = (value) => {
    setSort(value)
  }
  

  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }
 
 const handleGetProductDetails = (getCurrentProductId) => {
  dispatch(fetchProductDetails(getCurrentProductId))
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
 


  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);



  useEffect(() => {
    if(filters && Object.keys(filters).length > 0){
      const createQueryString = createSearchParamsHelper(filters)
      setSearchParams(new URLSearchParams(createQueryString))
    } 
  }, [filters])
 
  useEffect(() => {
    if(filters !== null && sort !== null){
      dispatch(fetchFilteredProducts({filterParams: filters, sortParams: sort}))
    }
  }, [dispatch, sort, filters])
  
  useEffect(() => {
    if(productDetails !== null) setOpenDetailDialog(true)
  }, [productDetails])
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
        <Filter filters={filters} handleFilter={handleFilter} />
        <div className="bg-background w-full rounded-lg shadow-sm">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-extrabold">All Products</h2>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">{productList.length} Products</span>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex item-center gap-1"
                  >
                    <ArrowUpDownIcon className="h-4 w-4" />
                    <span>Sort by</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                    {sortOptions.map((sortItem) => (
                      <DropdownMenuRadioItem key={sortItem.id} value={sortItem.id}>
                        {sortItem.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {productList && productList?.length > 0
              ? productList.map((productItem) => (
                  <ProductCard key={productItem.id} product={productItem} handleGetProductDetails={(handleGetProductDetails)} handleAddToCart={handleAddToCart}/>
                ))
              : null}
          </div>
        </div>
        <ProductDetails open={openDetailDialog} setOpen={setOpenDetailDialog} productDetails={productDetails}/>
      </div>
    </>
  )
}

export default Listing
