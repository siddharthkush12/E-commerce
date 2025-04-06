import React, { useEffect, useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CloudUpload, FileImage, X } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";

function ImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
  isEditMode,
}) {
  const inputRef = useRef(null);
  const [imageUploadError, setImageUploadError] = useState(false);

  function handleImageFileChange(e) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    setImageUploadError(false);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    setImageUploadError(false);
    try {
      const data = new FormData();
      data.append("imageFile", imageFile);
      const response = await axios.post(
        "http://localhost:8000/api/admin/products/upload_image",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // console.log(response.data.result.url);

      if (response.data?.success) {
        setUploadedImageUrl(response.data.result.url);
      } else {
        setImageUploadError(true);
      }
    } catch (error) {
      console.log(error);
      setImageUploadError(true);
    } finally {
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) {
      uploadImageToCloudinary();
    }
  }, [imageFile]);
//   console.log(isEditMode);

  return (
    <>
      {!isEditMode && (
        <div className="w-full mx-auto">
          <Label className="text-[14px] mb-2 block">Upload Image</Label>
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-1 rounded-xl border-dashed mb-3 p-2"
          >
            <Input
              id="image_upload"
              type="file"
              className="hidden"
              ref={inputRef}
              onChange={handleImageFileChange}
            />
            {!imageFile ? (
              <Label
                htmlFor="image_upload"
                className="flex flex-col items-center justify-center h-35 cursor-pointer"
              >
                <CloudUpload className="w-10 h-10 text-muted-foreground mb-2" />
                <span>Drag & Drop or Click to Upload</span>
              </Label>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileImage className="w-10 h-10 text-primary m-2" />
                  <p className="text-sm font-medium">{imageFile.name}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={handleRemoveImage}
                  >
                    <X className="w-5 h-5" />
                    <span className="sr-only">Remove File</span>
                  </Button>
                </div>
              </div>
            )}

            {imageLoadingState && (
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary" />
                <span className="ml-2 text-sm text-muted-foreground">
                  Uploading... Please wait
                </span>
              </div>
            )}

            {imageUploadError && (
              <div className="text-red-500 text-center text-sm py-2">
                ❌ Failed to upload image. Please try again...
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ImageUpload;
