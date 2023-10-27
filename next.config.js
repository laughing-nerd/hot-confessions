// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   headers: ()=>[
//   {
//   source
//   }
//   ]
// module.exports = nextConfig
//
module.exports = {
  async headers() {
    return [
      {
        source: '/confessions',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      },
    ]
  },
}
