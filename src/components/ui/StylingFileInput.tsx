import { useRef, useState } from "react";
import { Button } from "@/components/ui/button"; 

export function StylishFileInput() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center border border-gray-50 rounded-lg pt-2 pb-2 shadow-sm transition  cursor-pointer w-full max-w-sm mx-auto">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <Button onClick={handleButtonClick} variant="secondary" className="bg-transparent border border-border text-foreground hover:bg-foreground hover:text-background transition-all px-4 py-2 rounded-md">
        {fileName ? "Change File" : "Upload File"}
      </Button>
      <p className="mt-2 text-sm text-gray-500">
        {fileName ? fileName : "Click to select a file"}
      </p>
    </div>
  );
}
