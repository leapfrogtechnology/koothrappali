const config = {
  app: {
    name: process.env.APP_NAME || 'Koothrapali',
    version: process.env.APP_VERSION || '0.0.1',
    port: process.env.PORT || 8080,
    host: process.env.APP_HOST || '0.0.0.0'
  }
};

export default config;
