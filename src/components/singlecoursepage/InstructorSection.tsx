"use client";
import React from "react";
import Image from "next/image";

type Instructor = {
  id: number;
  name: string;
  designation?: string;
  profile_image?: string;
  bio?: string;
};

export default function InstructorSection({
  instructors,
}: {
  instructors: Instructor[];
  
}) {
  if (!instructors || instructors.length === 0) return null;

  return (
    <div className="rounded-lg bg-transparent p-0 pt-10">
      <h2 className="mb-4 text-gray-900 text-xl font-bold text-left md:text-2xl">
        কোর্স ইন্সট্রাক্টর
      </h2>

      {instructors.map((ins) => (
        <div
          key={ins.id}
          className="rounded-lg border-gray-300 md:border-[0.5px] p-2 md:p-4 mb-4"
        >
          <div className="flex flex-row items-center gap-4 text-center md:flex-row md:items-start md:text-left lg:gap-8">
            <div className="relative h-[80px] w-[80px] overflow-hidden rounded-full md:h-28 md:w-28 flex-shrink-0">
              <Image
                src={
                  ins.profile_image ||
                  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/97e8b9e9-e848-45c1-950c-5a711b181395-10minuteschool-com/assets/images/2023-09-27T10:33:28.541Z-6.jpg"
                }
                alt={ins.name || "Instructor"}
                width={112}
                height={112}
                className="aspect-square object-cover"
              />
            </div>

            <div className="text-gray-500 my-auto">
              <h3 className="mb-2 text-left text-lg text-gray-700 font-bold md:text-xl md:leading-6">
                {ins.name || "Instructor Name"}
              </h3>

              {ins.designation && (
                <p className="mb-0 text-left text-gray-500 text-sm font-normal">
                  {ins.designation}
                </p>
              )}

              {ins.bio && (
                <p className="mb-0 text-left text-gray-500 text-sm font-normal">
                  {ins.bio}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
