"use client";

import React, { useEffect, useRef } from 'react';
import { StaticImageData } from "next/image"; // Import StaticImageData type

// Import images
import img1 from "../../../public/Grameenphone-Logo.jpg";
import img2 from "../../../public/Aggreko_logo.svg.png";
import img3 from "../../../public/1958997 - Copy.jpg";
import img4 from "../../../public/Aggreko_logo.svg - Copy.png";

import img6 from "../../../public/chevron-corporation-logo-png_seeklogo-29525 - Copy.png";
import img7 from "../../../public/CIMMYT_Official_Logo_Green_JPG.jpg";
import img8 from "../../../public/Coats_logo.svg.png";
import img9 from "../../../public/download.png";
import img10 from "../../../public/gildan-logo_brandlogos.net_uaxnh - Copy.png";
import img11 from "../../../public/gildan-logo_brandlogos.net_uaxnh.png";
import img12 from "../../../public/healthcare-pharmaceuticals-ltd-logo-png_seeklogo-631572 - Copy.png";
import img13 from "../../../public/healthcare-pharmaceuticals-ltd-logo-png_seeklogo-631572.png";
import img14 from "../../../public/icddr-b-logo-png_seeklogo-405872 - Copy.png";
import img15 from "../../../public/images (2).png";
import img16 from "../../../public/images.png";
import img17 from "../../../public/JICA_logo.png";
import img18 from "../../../public/logo-sanofi-01.jpg";
import img19 from "../../../public/robi-logo-png_seeklogo-271552.png";
import img20 from "../../../public/pgcb.png";
import img21 from "../../../public/Omera_Logo.jpg";

type Logos = {
  url: string | StaticImageData; // Allow both string and StaticImageData types
};

const LogoSlider = () => {
  const scrollRef = useRef<HTMLDivElement>(null);  // Specify type here

  // Client logos - Replace these URLs with your actual logo images
  const logos = [
    { id: 1, url: img1 },
    { id: 2, url: img2 },
    { id: 3, url: img3 },
    { id: 4, url: img4 },
   
    { id: 6, url: img6 },
    { id: 7, url: img7 },
    { id: 8, url: img8 },
    { id: 9, url: img9 },
    { id: 10, url: img10 },
    { id: 11, url: img11 },
    { id: 12, url: img12 },
    { id: 13, url: img13 },
    { id: 14, url: img14 },
    { id: 15, url: img15 },
    { id: 16, url: img16 },
    { id: 17, url: img17 },
    { id: 18, url: img18 },
    { id: 19, url: img19 },
    { id: 20, url: img20 },
    { id: 21, url: img21 },
  ];

  // Duplicate logos for infinite scroll effect
  const duplicatedLogos = [...logos, ...logos];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollSpeed = 1;

    const scroll = () => {
      scrollAmount += scrollSpeed;

      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0;
      }

      scrollContainer.scrollLeft = scrollAmount;
    };

    const interval = setInterval(scroll, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-8 md:mb-12 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold text-gray-700 mb-2 md:mb-4">Our Clients</h1>
        </div>

        <div className="relative overflow-hidden rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8">
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 z-10"></div>

          {/* Logo container */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10 overflow-hidden"
            style={{ scrollBehavior: 'auto' }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="flex-shrink-0 w-32 h-20 sm:w-40 sm:h-24 md:w-48 md:h-32 flex items-center justify-center"
              >
                <div className="w-full h-full rounded-lg md:rounded-xl flex items-center justify-center transform transition-all duration-300 hover:scale-105  p-4 sm:p-5 md:p-6">
                 <img
  src={typeof logo.url === 'string' ? logo.url : logo.url.src}  // Check if it's a string
  alt={`Client Logo ${logo.id}`}
  className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoSlider;
