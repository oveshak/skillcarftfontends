"use client";
import DOMPurify from "isomorphic-dompurify";

export default function RichText({
  html,
  className="text-gray-50" ,
}: {
  html?: string | null;
  className?: string;
}) {
  if (!html) return null;

  // চাইলে শুধু YouTube iframe allow করতে পারো:
  const clean = DOMPurify.sanitize(html, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: [
      "allow",
      "allowfullscreen",
      "frameborder",
      "scrolling",
      "src",
      "title",
      "width",
      "height",
    ],
    // iframe src হোয়াইটলিস্ট (যদি দরকার হয়)
    ALLOW_UNKNOWN_PROTOCOLS: false,
  });

  return (
    <div
      className={className}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
