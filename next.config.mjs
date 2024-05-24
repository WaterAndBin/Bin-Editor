/** @type {import('next').NextConfig} */
const nextConfig = {
    /* 重定向 */
    async redirects() {
        return [
            {
                source: '/',
                destination: '/main',
                permanent: false, // 设置为 true 表示 301 永久重定向，false 表示 307 临时重定向  
            },
        ];
    },
};

export default nextConfig;
