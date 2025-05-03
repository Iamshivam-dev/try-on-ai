"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react"
import ProcessingImage from "./ProcessingImage";
import { Status } from "@/types/enum";
import { API_BASE_URL } from "@/lib/config";

export default function ImageUploader() {
  const [userImage, setUserImage] = useState<File | null>(null);
  const [clothImage, setClothImage] = useState<File | null>(null);
  const [previewUser, setPreviewUser] = useState<string | null>(null);
  const [previewCloth, setPreviewCloth] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>(Status.Processing)
  const [resultId, setResultId] = useState<string | null>(null)
  const userInputRef = useRef<HTMLInputElement>(null)
  const clothInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "user" | "cloth"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    if (type === "user") {
      setUserImage(file);
      setPreviewUser(previewUrl);
    } else {
      setClothImage(file);
      setPreviewCloth(previewUrl);
    }
  };

  const handleUpload = async () => {
    if (!userImage || !clothImage) {
      alert("Please upload both images");
      return;
    }

    setStatus(Status.Uploading);

    const formData = new FormData();
    formData.append("user_image", userImage);
    formData.append("cloth_image", clothImage);

    try {
      const response = await fetch(API_BASE_URL + "/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Upload response:", data);
      setResultId(data.result_id)
      setStatus(Status.Processing)
      

    } catch (error) {
      console.error("Upload failed:", error);
      setStatus(Status.Failed);
    } finally {
    }
  }
  const checkResultStatus = useCallback(async(id:string)=>{
      try {
        const response = await fetch(API_BASE_URL + "/check_status?id=" + id);
        const data = await response.json();
        if(data.status === "succeeded"){
          setStatus(Status.Completed)
          setResultId(null)
          router.push(`/output?img=${encodeURIComponent(data.output)}`);
        }else if(data.status === "failed"){
          alert("Oops! Failed to put cloths on, you can try again")
        }
        console.log(data)
        

      } catch (error) {
        console.error("Upload failed:", error);
        setStatus(Status.Failed);
      }
  }, [router])

  useEffect(()=>{
    let interValId:NodeJS.Timeout|null = null
    if(resultId){
      interValId = setInterval(()=>{
        checkResultStatus(resultId)
      }, 5000)
    }
    return () => {
      if (interValId) {
        clearInterval(interValId);
      }
    }
    
  }, [resultId, checkResultStatus])

  const handleUserClear = () => {
    if(userInputRef.current){
      userInputRef.current.value = ""
    }
    setUserImage(null)
    setPreviewUser(null)
  }
  const handleClothClear = () => {
    if(clothInputRef.current){
      clothInputRef.current.value = ""
    }
    setClothImage(null)
    setPreviewCloth(null)
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <Image src="/logo.png" width={100} height={100} alt="logo" className="m-auto" />
      <h1 className="text-xl font-semibold text-center">
        Virtual Try-On Uploader
      </h1>

      {status === Status.Upload &&
      <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* User Image Upload */}
        <div className="flex flex-col space-y-2">
          <label className="font-medium">Upload Your Image</label>
          <Input
            ref={userInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, "user")}
            className="file-input"
          />
          {previewUser && (
            <div className="h-40 w-auto rounded shadow object-contain relative">
              <Image
                width={160}
                height={160}
                src={previewUser}
                alt="User Preview"
                className=" h-40 m-auto w-auto"
              />
              <Trash color="white" size={30} className="trash-icon" onClick={handleUserClear}/>
            </div>
          )}
        
        </div>

        {/* Cloth Image Upload */}
        <div className="flex flex-col space-y-2">
          <label className="font-medium">Upload Clothing Image</label>
          <Input
            type="file"
            ref={clothInputRef}
            accept="image/*"
            onChange={(e) => handleImageChange(e, "cloth")}
            
            className="file-input"
          />
          {previewCloth && (
            <div className="h-40 w-auto rounded shadow object-contain relative">
            <Image
              width={160}
              height={160}
              src={previewCloth}
              alt="User Preview"
              className=" h-40 m-auto w-auto"
            />
            <Trash color="white" size={30} className="trash-icon" onClick={handleClothClear}/>
          </div>
          )}
         
        </div>
      </div>

      <div className="text-center">
        <Button
          onClick={handleUpload}
          disabled={status !== Status.Upload}
          className="cursor-pointer"
        >{status}</Button>
      </div>
      </>
      }
      {(status === Status.Processing || status === Status.Uploading) && <ProcessingImage status={status}/>}
      {status === Status.Failed && <div className="text-center">Oops Failed to upload or try on your images, this wasn&apos;t expected. <Button className="mt-4" onClick={()=>setStatus(Status.Upload)}>Try Again</Button></div>}
    </div>    
  );
}
