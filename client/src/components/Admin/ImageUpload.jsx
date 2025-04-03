import React, { useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CloudUpload, FileImage, X } from "lucide-react";
import { Button } from "../ui/button";

function ImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
}) {

    const inputRef=useRef(null);

    function handleImageFileChange(e){
        const selectedFile=e.target.files?.[0];
        if(selectedFile) setImageFile(selectedFile);
    }

    function handleDragOver(e){
        e.preventDefault();
    }

    function handleDrop(e){
        e.preventDefault();
        const droppedFile=e.dataTransfer.files?.[0];
        if(droppedFile) setImageFile(droppedFile);
    }

    function handleRemoveImage(){
        setImageFile(null);
        if(inputRef.current){
            inputRef.current.value="";
        }
    }


  return (
    <div className="w-full mx-auto">
      <Label className="text-[14px] mb-2 block">Upload Image</Label>
      <div onDragOver={handleDragOver} onDrop={handleDrop} className="border-1 rounded-xl border-dashed mb-3 p-2">
        <Input id="image_upload" type="file" className="hidden" ref={inputRef} onChange={handleImageFileChange}/>
        {
            !imageFile ?
            <Label htmlFor="image_upload" className="flex flex-col items-center justify-center h-35 cursor-pointer">
                <CloudUpload className="w-10 h-10 text-muted-foreground mb-2"/>
                <span>Drag & Drop or Click to Upload</span>
            </Label> : <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <FileImage className="w-10 h-10 text-primary m-2"/>
                    <p className="text-sm font-medium">{imageFile.name}</p>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={handleRemoveImage}>
                        <X className="w-5 h-5"/>
                        <span className="sr-only">Remove File</span>
                    </Button>
                </div>
            </div>
        }
      </div>
    </div>
  );
}

export default ImageUpload;
