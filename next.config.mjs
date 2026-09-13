/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // next/image only optimises remote files from hosts listed here. The
    // placeholder testimonial photos (sections/Testimonials.js) are on
    // Cloudinary; remove this entry once they are replaced with local files.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/harshitproject/**",
      },
    ],
  },
};

export default nextConfig;
