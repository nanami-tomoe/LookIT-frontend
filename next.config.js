module.exports = {
  images: {
    domains: [
      'images.unsplash.com',
      'plus.unsplash.com',
      'lookit-bucket.s3.ap-northeast-2.amazonaws.com',
      's3.ap-northeast-2.amazonaws.com',
      'v3.fal.media',
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:slug*`,
      },
    ];
  },
};
