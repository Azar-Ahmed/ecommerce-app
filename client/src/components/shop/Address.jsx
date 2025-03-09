import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import CommonForm from '../common/CommonForm'
import { addressFormControls } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import {
  addAddress,
  deleteAddress,
  fetchAddress,
  updateAddress,
} from '@/redux/shop/address-slice'
import AddressCard from './AddressCard'
import { useToast } from '@/hooks/use-toast'

const initialFormData = {
  address: '',
  city: '',
  phone: '',
  pincode: '',
  notes: '',
}

const Address = ({setCurrentSelectedAddress, selectedId}) => {
  
  const [formData, setFormData] = useState(initialFormData)
  const [currentEditedId, setCurrentEditedId] = useState(null)
 
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { addressList } = useSelector((state) => state.shoppingAddress)
  const { toast } = useToast();

  const handleManageAddress = (e) => {
    e.preventDefault()

    if(addressList.length >= 3 && currentEditedId === null){
      toast({title: "You cannot add more than three address", variant: 'destructive'})
      setFormData(initialFormData)
      return;
    }

    currentEditedId !== null ? dispatch(updateAddress({userId: user?.id, addressId: currentEditedId, formData})).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAddress(user?.id))
        setFormData(initialFormData)
        setCurrentEditedId(null)
        setFormData(initialFormData)
        toast({title: "Address updated successfully"})
      }
    }) :
    dispatch(
      addAddress({
        ...formData,
        userId: user?.id,
      }),
    ).then((data) => {
      console.log(data)
      if (data?.payload?.success) {
        dispatch(fetchAddress(user?.id))
        setFormData(initialFormData)
        toast({title: "Address added successfully"})
      }
    })
  }

 

  const handleEditAddress = (getCurrentAddress) => {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    });
  }

  const handleDeleteAddress = (getCurrentAddress) => {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if(data?.payload?.success){
        dispatch(fetchAddress(user?.id))
        toast({title: "Address deleted successfully"})
      }
    })
  }

 
  // function isFormValid() {
  //   return Object.keys(formData)
  //     .map((key) => formData[key].trim() !== "")
  //     .every((item) => item);
  // }
 
  useEffect(() => {
    dispatch(fetchAddress(user?.id))
  }, [dispatch])

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard key={singleAddressItem.id}
                addressInfo={singleAddressItem}
                handleEditAddress={handleEditAddress}
                handleDeleteAddress={handleDeleteAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
                selectedId={selectedId}
                />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>{currentEditedId !== null ? 'Edit Address' : 'Add New Address'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? 'Update Address' : 'Add Address'}
          onSubmit={handleManageAddress}
          // isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  )
}

export default Address
