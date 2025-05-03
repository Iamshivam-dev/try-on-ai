import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-row gap-30">
          <div className="shadow-background">
            <video
              src="/output.mp4"
              className="rounded-2xl"
              autoPlay
              muted
              loop
              playsInline
              width={400}
              height={400}
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <div>
            <Image src="/logo.png" width={100} height={100} alt="logo" />
            <h1 className="text-5xl font-extrabold leading-tight">
              Instantly see how outfits look on you
            </h1>
            <h3 className="text-3xl leading-tight">
              — no fitting room needed.
            </h3>
            <Button asChild className="text-2xl p-6 pl-10 pr-10 mt-5">
              <Link href={"/try-on"}>Try Now</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
