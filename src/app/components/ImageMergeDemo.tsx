"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';

const ImageMergeDemo = () => {
  const [animationKey, setAnimationKey] = useState(0);

  // Function to trigger the animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey(prevKey => prevKey + 1); // Change the key to reset the animation
    }, 4000); // Every 4 seconds (adjust as needed)

    return () => clearInterval(interval); // Cleanup interval when component unmounts
  }, []);

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Image Merge Demo</h1>
      <p className="mb-6">Watch as the images merge and repeat automatically!</p>

      {/* Image Container */}
      <div className="relative w-[200px] h-[200px] mb-6">
        {/* Input Image 1 */}
        <Image
          key={animationKey + 1} // Change key on every animation loop
          src="/human.png" // Replace with your actual local image path
          alt="Input Image 1"
          width={200}
          height={200}
          className={`absolute top-0 left-0 w-full h-full object-cover rounded-lg transition-all duration-1000 ease-in-out ${
            animationKey % 2 === 0 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
        />
        {/* Input Image 2 */}
        <Image
          key={animationKey} // Change key on every animation loop
          src="/cloth.jpg" // Replace with your actual local image path
          alt="Input Image 2"
          width={200}
          height={200}
          className={`absolute top-0 left-0 w-full h-full object-cover rounded-lg transition-all duration-1000 ease-in-out ${
            animationKey % 2 === 0 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
        />
      </div>

      {/* Output Merged Image */}
      <div className="mt-6">
        <Image
          key={animationKey} // Change key on every animation loop
          src="/output.webp" // Replace with your actual output image
          alt="Output Merged Image"
          width={200}
          height={200}
          className={`w-[200px] h-[200px] object-cover rounded-lg transition-all duration-1000 ease-in-out ${
            animationKey % 2 === 0 ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>
    </div>
  );
};

export default ImageMergeDemo;
