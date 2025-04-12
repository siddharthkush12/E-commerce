import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import Form from '../common/Form';
import { addressFormControls } from '@/config/formControls';
import { useDispatch, useSelector } from 'react-redux';
import { addNewAddress, deleteAddress, editAddress, fetchAddress } from '@/store/shop/address-slice';
import { toast } from 'sonner';
import { CirclePlus } from 'lucide-react';
import AddressCard from './AddressCard';

const initialFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  addressType: ""
};

function Address({setAddressSelected}) {


  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { addressList } = useSelector(state => state.shopAddress);
  const [showForm, setShowForm] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  function isFormValid() {
    return Object.values(formData).every(value => value !== '');
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(deleteAddress({ userId: user?.id, addressId: getCurrentAddress?._id }))
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAddress(user?.id));
          toast(data?.payload?.message);
        }
      });
  }

  function handleAddingOrUpdateAddress(e) {
    e.preventDefault();

    if (currentEditedId !== null) {
      dispatch(editAddress({
        userId: user?.id,
        addressId: currentEditedId?._id,
        formData
      }))
        .then((data) => {
          if (data?.payload.success) {
            setFormData(initialFormData);
            setCurrentEditedId(null);
            dispatch(fetchAddress(user?.id));
            setShowForm(false);
            toast("Address Updated");
          }
        });
    } else {
      dispatch(addNewAddress({ ...formData, userId: user?.id }))
        .then((data) => {
          if (data?.payload?.success) {
            setShowForm(false);
            dispatch(fetchAddress(user?.id));
            setFormData(initialFormData);
            toast(data?.payload?.message);
          }
        });
    }
  }

  useEffect(() => {
    dispatch(fetchAddress(user?.id));
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {addressList && addressList.length > 0 &&
          addressList.map((item, index) => (
                <AddressCard
                    key={item?._id}
                    item={item}
                    setShowForm={setShowForm}
                    setFormData={setFormData}
                    setCurrentEditedId={setCurrentEditedId}
                    handleDeleteAddress={handleDeleteAddress}
                    setAddressSelected={setAddressSelected}
                    
                />
          ))}

        {!showForm && (
          <Card
            className="cursor-pointer flex flex-col items-center justify-center gap-2 p-6 text-muted-foreground border-dashed border-2 rounded-2xl hover:shadow-md transition-all"
            onClick={() => {
              setShowForm(true);
              setCurrentEditedId(null);
            }}
          >
            <CirclePlus className="w-10 h-10" />
            <CardFooter>Add New Address</CardFooter>
          </Card>
        )}
      </div>

      {showForm && (
        <Card className="w-full max-w-2xl mx-auto p-4 shadow-md border rounded-2xl">
          <CardHeader>
            <CardTitle>
              {currentEditedId !== null ? "Edit Address" : "Add New Address"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form
              formControls={addressFormControls}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit Address" : "Add Address"}
              onSubmit={handleAddingOrUpdateAddress}
              isButtonDisabled={!isFormValid()}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Address;