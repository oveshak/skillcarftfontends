'use client'
import React, { useEffect, useRef } from 'react';

const LogoSlider = () => {
  const scrollRef = useRef<HTMLDivElement>(null);  // Specify type here

  // Client logos - Replace these URLs with your actual logo images
  const logos = [
    { id: 1, name: 'Google', url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
    { id: 2, name: 'Microsoft', url: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
    { id: 3, name: 'Apple', url: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 4, name: 'Amazon', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { id: 5, name: 'Meta', url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
    { id: 6, name: 'Netflix', url: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
    { id: 7, name: 'Tesla', url: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg' },
    { id: 8, name: 'Adobe', url: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Adobe_Corporate_logo.svg' },
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
                    src={logo.url} 
                    alt={logo.name}
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
