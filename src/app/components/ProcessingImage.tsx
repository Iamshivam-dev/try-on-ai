"use client"
import { Status } from "@/types/enum";
import { useEffect, useState } from "react";

const messages = [
    'Processing your image',
    'Analysing image with AI',
    'Making changes',
    'Generating magic ✨',
    'Finalizing results',
  ];
export default function ProcessingImage ({ status }: {status: Status}){
    const [index, setIndex] = useState(0);
    const [animation, setAnimation] = useState('animate-in fade-in zoom-in');
  
    useEffect(() => {
      if(status === Status.Processing){
        const interval = setInterval(() => {
          setAnimation('animate-out fade-out zoom-out'); // fade out
          setTimeout(() => {
            setIndex((prev) => {
              console.log(prev, messages.length)
              if((prev + 1) === messages.length) clearInterval(interval)
              return (prev + 1) % messages.length
            });
            setAnimation('animate-in fade-in zoom-in'); // fade in
          }, 300); // Match this with fadeOut duration
        }, 3000); // Full cycle
    
        return () => clearInterval(interval);
      }
    }, [status]);
  
    return <>
    <h1 className="text-4xl text-center animate-in slide-in-from-bottom duration-600">Processing Your Image</h1>
    <div className="text-center mt-10">
      <p
        className={`text-xl font-medium ${animation} transition-opacity duration-300`}
      >
        {messages[index]}
      </p>
    </div>
    <svg className="pl" viewBox="0 0 48 15" width="48px"  role="img" aria-label="A dot attempts to catch up to one on the right by moving like a Slinky, but it keeps inching away">
	<defs>
		<linearGradient id="pl-grad" x1="0" y1="0" x2="1" y2="1">
			<stop offset="0%" stopColor="#000" />
			<stop offset="100%" stopColor="#fff" />
		</linearGradient>
		<mask id="pl-mask">
			<rect x="-1" y="-1" width="50" height="18" fill="url(#pl-grad)" />
		</mask>
	</defs>
	<g fill="none" stroke="currentcolor" strokeLinecap="round" strokeWidth="2" transform="translate(0,2)">
		<g className="pl__layer">
			<g className="pl__scene">
				<path className="pl__curve" d="M 16 9 C 16 4.582 19.582 1 24 1 C 28.418 1 32 4.582 32 9" strokeDasharray="25.13 25.13" strokeDashoffset="25.12" />
				<polyline className="pl__dot" points="32 9,48 9" strokeDasharray="0.01 16" />
			</g>
		</g>
		<g className="pl__layer" mask="url(#pl-mask)">
			<g className="pl__scene">
				<path className="pl__curve" d="M 16 9 C 16 4.582 19.582 1 24 1 C 28.418 1 32 4.582 32 9" strokeDasharray="25.13 25.13" strokeDashoffset="25.12" />
				<polyline className="pl__dot" points="32 9,48 9" strokeDasharray="0.01 16" />
			</g>
		</g>
	</g>
</svg>
    </>
}