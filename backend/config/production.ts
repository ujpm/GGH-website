export const productionConfig = {
  cors: {
    origin: process.env.FRONTEND_URL || 'https://your-frontend-domain.com',
    credentials: true,
  },
  security: {
    rateLimiting: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    },
    helmet: {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          connectSrc: ["'self'", 'https://api.mongodb-analytics.com'],
          imgSrc: ["'self'", 'data:', 'blob:'],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
        },
      },
    },
  },
  mongodb: {
    options: {
      retryWrites: true,
      w: 'majority',
      maxPoolSize: 10,
    },
  },
};
