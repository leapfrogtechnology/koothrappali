import './env';

export default {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  DB_INSTANCE_IDENTIFIER: process.env.DB_INSTANCE_IDENTIFIER,
  GOOGLE_OAUTH_CALLBACK_URL: process.env.SERVER_HOST_NAME + '/api/auth/oauthcallback',
  LMS_API_KEY: process.env.LMS_API_KEY,
  CONSTANTS: {
    TAG_KEY:'tag-key',
    PROJECT: 'Project',
    INSTANCE_TYPE: 'instance-type',
    MEDIUM: 'm3.medium'

  },
  LMS: {
    BASE_URL: 'http://lms.lftechnology.com/api/',
    PROJECT_LIST: 'projectlist',

  }
};
