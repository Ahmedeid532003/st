<<<<<<< HEAD
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }, { protocol: 'http', hostname: '**' }],
    unoptimized: true,
  },
};

module.exports = nextConfig;
=======
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }, { protocol: 'http', hostname: '**' }],
    unoptimized: true,
  },
};

module.exports = nextConfig;
>>>>>>> 6db3510 (إضافة بيانات افتراضية لظهور الموقع كامل على Netlify)
