import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import CommonForm from '@/components/common/CommonForm'
import { addProductFormElements } from '@/config'
import ImageUpload from '@/components/admin/ImageUpload'
import { useDispatch, useSelector } from 'react-redux'
import {
  addProduct,
  deleteProduct,
  editProduct,
  fetchProducts,
} from '@/redux/admin/product-slice'
import { useToast } from '@/hooks/use-toast'
import AdminProductCard from '@/components/admin/AdminProductCard'

const initialFormData = {
  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: '',
  salePrice: '',
  totalStock: '',
  averageReview: 0,
}

const AdminProducts = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const [currentEditedId, setCurrentEditedId] = useState(null)
  const { productList } = useSelector((state) => state.adminProduct)
  const dispatch = useDispatch()
  const { toast } = useToast()

  const onSubmit = (e) => {
    e.preventDefault()
    currentEditedId !== null
      ? dispatch(editProduct({ id: currentEditedId, formData })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchProducts())
              setFormData(initialFormData)
              setOpenCreateProductDialog(false)
              setCurrentEditedId(null)
              toast({ title: data.payload.message })
            }
          },
        )
      : dispatch(
          addProduct({
            ...formData,
            image: uploadedImageUrl,
          }),
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchProducts())
            setOpenCreateProductDialog(false)
            setImageFile(null)
            setFormData(initialFormData)
            toast({ title: data.payload.message })
          }
        })
  }

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== '')
      .every((item) => item)
  }

  const handleProductDelete = (productId) => {
    dispatch(deleteProduct({id: productId})).then((data) => {
      if(data?.payload?.success){
        dispatch(fetchProducts())
        toast({ title: data.payload.message })
      }
    })
  }


  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem, index) => (
              <AdminProductCard
                key={productItem.id || index}
                product={productItem}
                setCurrentEditedId={setCurrentEditedId}
                setOpenCreateProductDialog={setOpenCreateProductDialog}
                setFormData={setFormData}
                handleProductDelete={handleProductDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => {
          setOpenCreateProductDialog(false)
          setCurrentEditedId(null)
          setFormData(initialFormData)
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? 'Edit Product' : 'Create New Product'}
            </SheetTitle>
          </SheetHeader>
          <ImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? 'Update' : 'Create'}
              formControls={addProductFormElements}
              isButtonDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default AdminProducts
