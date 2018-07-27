import './env';

export default {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  DB_INSTANCE_IDENTIFIER: process.env.DB_INSTANCE_IDENTIFIER,
  GOOGLE_OAUTH_CALLBACK_URL: process.env.SERVER_HOST_NAME + '/api/auth/oauthcallback',
  LMS_API_KEY: process.env.LMS_API_KEY,
  CONSTANTS: {
    LINUX: 'linux',
    WINDOWS: 'windows',
    TAG_KEY: 'tag-key',
    PROJECT: 'Project',
    MEDIUM: 'm3.medium',
    OS_PLATFORM: 'OS Platform',
    INSTANCE_TYPE: 'instance-type',
  },
  LMS: {
    PROJECT: 'project',
    PROJECT_LIST: 'projectlist',
    BASE_URL: 'http://lms.lftechnology.com/api/'
  },
  AWS_KEYS: {
    ACCESS_KEY_ID_1: process.env.ACCESS_KEY_ID_1,
    APP_SECRET_KEY_1: process.env.APP_SECRET_KEY_1,
    ACCESS_KEY_ID_2: process.env.ACCESS_KEY_ID_2,
    APP_SECRET_KEY_2: process.env.APP_SECRET_KEY_2
  },
  VAULT: {
    EC2: '/ec2',
    RDS: '/rds',
    BASE_URL: 'https://dev.vault.lftechnology.com/',
    API_URL: 'lftechnology/koothrappali/common/billing/us-east-1/'
  },
  VAULT_TOKEN: process.env.VAULT_TOKEN,
  PROJECTS: {
    FHF: 'FHF',
    CUMMINGS: 'Cummings',
    REMIT: 'Remit',
    LINKWAY: 'Linkway',
    NFPA: 'NFPA',
    KEYOLO: 'Keyolo',
    ECOSWEEP: 'Ecosweep',
    BIIDME: 'Biidme',
    LEAPFROG: 'Leapfrog',
    MUSASHI: 'Musashi',
    LAUDIO: 'Laudio',
    TRAKTIVITY: 'Traktivity',
    SUPPERLOAN:'Supperloan'
  }
};
