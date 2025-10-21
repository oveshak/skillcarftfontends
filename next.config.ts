// import type { NextConfig } from "next";
// import path from "node:path";


// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: '**',
//       },
//       {
//         protocol: 'http',
//         hostname: '**',
//       },
//        {
//       protocol: 'https',
//       hostname: 'cdn.10minuteschool.com',
//     },
//    { protocol: "https", hostname: "cdn.10minuteschool.com" },
//     { protocol: "https", hostname: "slelguoygbfzlpylpxfs.supabase.co" },
//     ],
//   },
//   outputFileTracingRoot: path.resolve(__dirname, '../../'),
//   turbopack: {
//     rules: {
//       "*.{jsx,tsx}": {
       
//       }
//     }
//   }
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
        {
         protocol: 'https',
         hostname: '**',
       },
       {
         protocol: 'http',
         hostname: '**',
       },
      { protocol: "https", hostname: "cdn.10minuteschool.com" },
      { protocol: "https", hostname: "slelguoygbfzlpylpxfs.supabase.co" },
       { protocol: "https", hostname: "skillscraftacademy.com" },
    ],
    formats: ["image/webp", "image/avif"],
  },
  // ❌ monorepo না হলে এই লাইনটা রাখবে না:
  // outputFileTracingRoot: path.resolve(__dirname, "../../"),
  // ❌ turbopack custom rules/loader দরকার নেই:
  // turbopack: { rules: { ... } }
};

export default nextConfig;