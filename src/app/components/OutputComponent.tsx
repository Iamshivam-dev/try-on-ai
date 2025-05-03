"use client"
import { Button } from "@/components/ui/button";
import { Download, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";

export default function OutputComponent() {
  const params = useSearchParams();
  const img = params.get("img")
  if (!img) redirect("/");
  const handleDownload = async () => {
    const response = await fetch(img);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = 'output.png';
    document.body.appendChild(link);
    link.click();
    link.remove();
  
    URL.revokeObjectURL(url);
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center p-10 justify-items-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center sm:items-center w-full">
        <Image
          src="/logo.png"
          width={100}
          height={100}
          alt="logo"
          className="m-auto"
        />
        <h1 className="text-xl font-semibold text-center mb-3 w-full">
          Virtual Try-On Uploader
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 w-[90%] justify-center">
          <div className="sm:col-span-3 bg-muted p-6 rounded-lg shadow  flex items-center justify-center h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img}
              alt="Output Preview"
              className="w-full max-h-[300px] rounded object-contain mx-auto"
            />
          </div>
          <div className="flex flex-col gap-5 m-auto sm:m-0">
            <Link href={"/try-on"}>
              <Button className="w-40">
                <Pencil /> Try More
              </Button>
            </Link>
            <Button className="w-40" onClick={handleDownload}>
              <Download />
              Download
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
