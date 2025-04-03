import ImageUpload from "@/components/Admin/ImageUpload";
import Form from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config/formControls";
import React, { useState } from "react";

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

  function onSubmit() {}

  return (
    <>
      <div className="flex w-full justify-end">
        <Button onClick={() => setOpenCreateProducts(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>

      <Sheet
        open={openCreateProducts}
        onOpenChange={() => {
          setOpenCreateProducts(false);
        }}
      >
        <SheetContent
          side="right"
          className="w-full"
          aria-describedby={undefined}
        >
          <SheetHeader>
            <SheetTitle className="text-2xl">Add New Product</SheetTitle>
          </SheetHeader>
          <div className="py-7 px-2">
            <ImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
            />

            <Form
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText="Add Product"
              onSubmit={onSubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default AdminProduct;
