/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: true,
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'res.cloudinary.com',
                port:'',
                pathname:'/**',
                search:''
            }
        ]
    }
};

export default nextConfig;
