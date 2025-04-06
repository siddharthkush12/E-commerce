import ImageUpload from "@/components/Admin/ImageUpload";
import ProductCard from "@/components/Admin/ProductCard";
import Form from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config/formControls";
import { addNewProduct, fetchProduct } from "@/store/admin/product-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";



const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  stock: "",
  saleprice: "",
};

function AdminProduct() {

  const [openCreateProducts, setOpenCreateProducts] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [imageLoadingState,setImageLoadingState]=useState(false);
  const [currentEditedId,setCurrentEditedId]=useState(null);

  const dispatch=useDispatch();
  const {productList}=useSelector((state)=>state.adminProduct)


  function onSubmit(e) {
    e.preventDefault();
    dispatch(addNewProduct({
      ...formData,
      image:uploadedImageUrl,
    })).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchProduct());
        setImageFile(null);
        setFormData(initialFormData);
        setOpenCreateProducts(false);
        toast("Product add success fully");
      }
    })
    
  }

  useEffect(()=>{
    dispatch(fetchProduct());
  },[dispatch])
  
  

  return (
    <>
      <div className="flex w-full items-center justify-end">
        <Button className='mb-4' onClick={() => setOpenCreateProducts(true) }>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-2 md:px-0">
          {
            productList&&productList.length>0?
            productList.map((productItem)=>{
              return(
                <ProductCard setFormData={setFormData} setOpenCreateProducts={setOpenCreateProducts} setCurrentEditedId={setCurrentEditedId} key={productItem._id} product={productItem}/>
              )
            }):null
          }

      </div>

      <Sheet
        open={openCreateProducts}
        onOpenChange={() => {
          setOpenCreateProducts(false);
          setCurrentEditedId(null)
          setFormData(initialFormData)
        }}
      >
        <SheetContent
          side="right"
          className="w-full h-full max-h-screen overflow-y-auto"
          aria-describedby={undefined}
        >
          <SheetHeader>
            <SheetTitle className="text-2xl">
              {
                currentEditedId!==null?
                "Edit Product":"Add New Product"
              }
              
              </SheetTitle>
          </SheetHeader>
          <div className="py-7 px-2">
            <ImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              imageLoadingState={imageLoadingState}
              setImageLoadingState={setImageLoadingState}
              isEditMode={currentEditedId!==null}
            />

            <Form
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId!==null? "Edit":"Add Product"}
              onSubmit={onSubmit}
              
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default AdminProduct;
