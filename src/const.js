import './env';

export default {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_OAUTH_CALLBACK_URL: process.env.SERVER_HOST_NAME + '/api/auth/oauthcallback',
  LMS_API_KEY: process.env.LMS_API_KEY
};
